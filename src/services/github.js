const API_ROOT = 'https://api.github.com/repos';
const CACHE_PREFIX = 'portfolio:github-repository:v1:';
const CACHE_TTL = 15 * 60 * 1000;
const REQUEST_TIMEOUT = 5000;
const pendingRequests = new Map();

const readCache = (repository) => {
  try {
    const cached = JSON.parse(localStorage.getItem(`${CACHE_PREFIX}${repository}`));
    if (cached && Date.now() - cached.savedAt < CACHE_TTL) return cached.data;
  } catch {
    return null;
  }

  return null;
};

const writeCache = (repository, data) => {
  try {
    localStorage.setItem(`${CACHE_PREFIX}${repository}`, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // Local content remains available when storage is disabled or full.
  }
};

const requestRepository = async (repository) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_ROOT}/${repository}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal
    });

    if (!response.ok) {
      const isRateLimited = response.status === 403 || response.status === 429;
      throw new Error(isRateLimited ? 'GITHUB_RATE_LIMIT' : 'GITHUB_REQUEST_FAILED');
    }

    const repositoryData = await response.json();
    return {
      language: repositoryData.language || null,
      stars: Number.isInteger(repositoryData.stargazers_count) ? repositoryData.stargazers_count : null,
      forks: Number.isInteger(repositoryData.forks_count) ? repositoryData.forks_count : null,
      updatedAt: repositoryData.updated_at || null
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const getRepositoryMetadata = (repository) => {
  const cached = readCache(repository);
  if (cached) return Promise.resolve(cached);
  if (pendingRequests.has(repository)) return pendingRequests.get(repository);

  const request = requestRepository(repository)
    .then((data) => {
      writeCache(repository, data);
      return data;
    })
    .finally(() => pendingRequests.delete(repository));

  pendingRequests.set(repository, request);
  return request;
};
