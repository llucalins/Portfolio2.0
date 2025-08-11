export const generatePreviewImage = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Configurar dimensões
  canvas.width = 1200;
  canvas.height = 630;
  
  // Fundo preto
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1200, 630);
  
  // Gradiente de fundo
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, 'rgba(102, 126, 234, 0.1)');
  gradient.addColorStop(1, 'rgba(118, 75, 162, 0.1)');
  
  // Card principal
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(60, 60, 1080, 510, 20);
  ctx.fill();
  
  // Borda do card
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Configurar fonte
  ctx.font = 'bold 72px Inter, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  
  // Nome
  ctx.shadowColor = 'rgba(102, 126, 234, 0.5)';
  ctx.shadowBlur = 20;
  ctx.fillText('Lucas Virginio', 120, 200);
  ctx.shadowBlur = 0;
  
  // Título
  ctx.font = '400 36px Inter, sans-serif';
  ctx.fillStyle = '#667eea';
  ctx.fillText('Full Stack Developer', 120, 260);
  
  // Descrição
  ctx.font = '400 24px Inter, sans-serif';
  ctx.fillStyle = '#cccccc';
  ctx.fillText('Desenvolvedor apaixonado por criar soluções inovadoras', 120, 320);
  ctx.fillText('e experiências digitais excepcionais', 120, 355);
  
  // Tags de tecnologia
  const technologies = ['React', 'Node.js', 'TypeScript', 'Python', 'Java'];
  let xOffset = 120;
  
  ctx.font = '400 18px Inter, sans-serif';
  technologies.forEach(tech => {
    const textWidth = ctx.measureText(tech).width;
    const tagWidth = textWidth + 32;
    const tagHeight = 40;
    
    // Fundo da tag
    ctx.fillStyle = 'rgba(102, 126, 234, 0.2)';
    ctx.beginPath();
    ctx.roundRect(xOffset, 400, tagWidth, tagHeight, 20);
    ctx.fill();
    
    // Borda da tag
    ctx.strokeStyle = 'rgba(102, 126, 234, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Texto da tag
    ctx.fillStyle = '#667eea';
    ctx.textAlign = 'center';
    ctx.fillText(tech, xOffset + tagWidth / 2, 425);
    
    xOffset += tagWidth + 20;
  });
  
  // Avatar principal (lado direito)
  const avatarX = 720;
  const avatarY = 115;
  const avatarRadius = 200;
  
  // Borda do avatar
  ctx.fillStyle = '#667eea';
  ctx.beginPath();
  ctx.arc(avatarX + avatarRadius, avatarY + avatarRadius, avatarRadius, 0, 2 * Math.PI);
  ctx.fill();
  
  // Fundo do avatar
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(avatarX + avatarRadius, avatarY + avatarRadius, avatarRadius - 4, 0, 2 * Math.PI);
  ctx.fill();
  
  // Gradiente interno do avatar
  const avatarGradient = ctx.createRadialGradient(
    avatarX + avatarRadius, avatarY + avatarRadius, 0,
    avatarX + avatarRadius, avatarY + avatarRadius, avatarRadius - 4
  );
  avatarGradient.addColorStop(0, 'rgba(102, 126, 234, 0.1)');
  avatarGradient.addColorStop(1, 'rgba(118, 75, 162, 0.1)');
  ctx.fillStyle = avatarGradient;
  ctx.fill();
  
  // Placeholder do avatar
  ctx.fillStyle = '#667eea';
  ctx.font = '400 24px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Avatar', avatarX + avatarRadius, avatarY + avatarRadius + 10);
  
  // Pequeno avatar no canto
  const smallAvatarX = 100;
  const smallAvatarY = 470;
  const smallAvatarRadius = 40;
  
  // Borda do pequeno avatar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.arc(smallAvatarX + smallAvatarRadius, smallAvatarY + smallAvatarRadius, smallAvatarRadius, 0, 2 * Math.PI);
  ctx.fill();
  
  // Fundo do pequeno avatar
  ctx.fillStyle = '#667eea';
  ctx.beginPath();
  ctx.arc(smallAvatarX + smallAvatarRadius, smallAvatarY + smallAvatarRadius, smallAvatarRadius - 4, 0, 2 * Math.PI);
  ctx.fill();
  
  // Texto do pequeno avatar
  ctx.fillStyle = '#ffffff';
  ctx.font = '400 12px Inter, sans-serif';
  ctx.fillText('LV', smallAvatarX + smallAvatarRadius, smallAvatarY + smallAvatarRadius + 5);
  
  // Partículas decorativas
  ctx.fillStyle = '#667eea';
  ctx.globalAlpha = 0.3;
  const particles = [
    { x: 100, y: 150, r: 3 },
    { x: 150, y: 200, r: 2 },
    { x: 200, y: 100, r: 2.5 },
    { x: 250, y: 250, r: 1.5 },
    { x: 300, y: 120, r: 2 }
  ];
  
  particles.forEach(particle => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, 2 * Math.PI);
    ctx.fill();
  });
  
  ctx.globalAlpha = 1;
  
  // Adicionar roundRect se não existir
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
      this.beginPath();
      this.moveTo(x + radius, y);
      this.lineTo(x + width - radius, y);
      this.quadraticCurveTo(x + width, y, x + width, y + radius);
      this.lineTo(x + width, y + height - radius);
      this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      this.lineTo(x + radius, y + height);
      this.quadraticCurveTo(x, y + height, x, y + height - radius);
      this.lineTo(x, y + radius);
      this.quadraticCurveTo(x, y, x + radius, y);
      this.closePath();
    };
  }
  
  return canvas.toDataURL('image/png');
};
