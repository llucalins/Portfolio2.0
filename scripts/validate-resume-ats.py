"""Compare both PDF text engines with the resume's authored HTML content."""

from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import sys
import unicodedata

import fitz
from pdfminer.high_level import extract_text
from pdfminer.layout import LAParams


ROOT = Path(__file__).resolve().parents[1]
KEYWORDS = ("TypeScript", "React", "Next.js", "PostgreSQL", "Spring Boot", "GitHub")
FORBIDDEN = re.compile(r"[\ue000-\uf8ff\ufb00-\ufb06\ufffd\ufffe\uffff]")


class ResumeHTML(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            self.links.extend(value for name, value in attrs if name == "href")

    def handle_data(self, data):
        self.parts.append(data)


def authored_resume(language):
    script = (
        "import { resumeMarkup } from './src/data/resumeDocument.js'; "
        "process.stdout.write(resumeMarkup(process.argv[1]));"
    )
    markup = subprocess.check_output(
        ["node", "--input-type=module", "-e", script, language], cwd=ROOT, text=True
    )
    parser = ResumeHTML()
    parser.feed(markup)
    return " ".join(parser.parts), parser.links


def words(text):
    return re.findall(r"\w+", unicodedata.normalize("NFC", text).casefold())


def compact(text):
    # Printed list bullets and CSS heading capitalization are presentation only.
    return re.sub(r"\s+", " ", unicodedata.normalize("NFC", text.replace("●", " ")).casefold()).strip()


def validate_text(label, extracted, authored):
    invalid = [(f"U+{ord(char):04X}", extracted[max(0, i - 20):i + 20])
               for i, char in enumerate(extracted)
               if FORBIDDEN.fullmatch(char) or (unicodedata.category(char) == "Cc" and char not in "\n\r\t\f")]
    if invalid:
        raise AssertionError(f"{label}: caracteres inválidos: {invalid[:5]}")

    for keyword in KEYWORDS:
        if keyword not in extracted:
            raise AssertionError(f"{label}: palavra-chave ausente ou corrompida: {keyword}")

    expected, actual = words(authored), words(extracted)
    if expected != actual:
        first = next((i for i, pair in enumerate(zip(expected, actual)) if pair[0] != pair[1]),
                     min(len(expected), len(actual)))
        raise AssertionError(
            f"{label}: diferença na palavra {first + 1}; "
            f"origem={expected[max(0, first - 4):first + 5]!r}; "
            f"PDF={actual[max(0, first - 4):first + 5]!r}; "
            f"total={len(expected)}/{len(actual)}"
        )
    source, pdf = compact(authored), compact(extracted)
    if source != pdf:
        first = next((i for i, pair in enumerate(zip(source, pdf)) if pair[0] != pair[1]),
                     min(len(source), len(pdf)))
        raise AssertionError(f"{label}: diferença de texto/pontuação no caractere {first + 1}; "
                             f"origem={source[max(0, first - 20):first + 30]!r}; "
                             f"PDF={pdf[max(0, first - 20):first + 30]!r}")
    return len(actual)


def validate_pdf(language):
    suffix = "en" if language == "en" else "pt-br"
    pdf = ROOT / "public" / "resumes" / f"lucas-virginio-{suffix}.pdf"
    authored, expected_links = authored_resume(language)
    with fitz.open(pdf) as document:
        for page in document:
            for xref, *_ in page.get_fonts():
                if document.xref_get_key(xref, "ToUnicode")[0] != "xref":
                    raise AssertionError(f"{pdf.name}: fonte sem mapa ToUnicode (objeto {xref})")
                if not document.extract_font(xref)[3]:
                    raise AssertionError(f"{pdf.name}: fonte não incorporada (objeto {xref})")
        pymupdf_text = "\n".join(page.get_text(sort=True) for page in document)
        links = [link.get("uri") for page in document for link in page.get_links()]
        if not all(page.get_text().strip() for page in document):
            raise AssertionError(f"{pdf.name}: página sem texto selecionável")
    # Chromium canonicalizes a bare HTTP origin to a URL ending in '/'.
    canonical = lambda url: url.rstrip("/") if url.startswith(("https://", "http://")) else url
    missing_links = sorted(set(map(canonical, expected_links)) - set(map(canonical, filter(None, links))))
    if missing_links:
        raise AssertionError(f"{pdf.name}: URLs ausentes: {missing_links}")
    results = {
        "PyMuPDF": validate_text(f"{pdf.name}/PyMuPDF", pymupdf_text, authored),
        "pdfminer.six": validate_text(
            f"{pdf.name}/pdfminer.six",
            extract_text(str(pdf), laparams=LAParams(boxes_flow=None)), authored
        ),
    }
    print(f"{pdf.name}: texto integral e em ordem, {len(expected_links)} URLs; "
          + ", ".join(f"{engine} {count} palavras" for engine, count in results.items()))


if __name__ == "__main__":
    try:
        for locale in ("pt", "en"):
            validate_pdf(locale)
    except (AssertionError, OSError, subprocess.CalledProcessError) as error:
        print(f"Validação ATS falhou: {error}", file=sys.stderr)
        sys.exit(1)
