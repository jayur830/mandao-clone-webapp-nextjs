import { Data } from '@/types/block';

function renderItemHtml(item: Data): string {
  switch (item.type) {
    case 'block': {
      const dir = item.style?.flexDirection || 'column';
      const jc = item.style?.justifyContent || 'center';
      const ai = item.style?.alignItems || 'center';
      const gap = item.style?.gap != null ? `${item.style.gap}px` : '0px';
      const bg = item.style?.backgroundColor || 'transparent';
      const pt = `${item.style?.paddingTop || 0}px`;
      const pr = `${item.style?.paddingRight || 0}px`;
      const pb = `${item.style?.paddingBottom || 0}px`;
      const pl = `${item.style?.paddingLeft || 0}px`;

      const childrenHtml = (item.children || []).map(renderItemHtml).join('');
      return `<div style="display:flex;flex-direction:${dir};justify-content:${jc};align-items:${ai};gap:${gap};background-color:${bg};padding:${pt} ${pr} ${pb} ${pl};width:100%;box-sizing:border-box;">${childrenHtml}</div>`;
    }
    case 'image': {
      if (!item.src) return '';
      const width = item.fullWidth ? '100%' : item.style?.width || 'auto';
      return `<div style="width:${width};display:flex;justify-content:center;box-sizing:border-box;"><img src="${item.src}" alt="promotion image" style="width:100%;height:auto;display:block;border-radius:4px;" /></div>`;
    }
    case 'video': {
      if (!item.src) return '';
      const width = item.fullWidth ? '100%' : 'auto';
      return `<div style="width:${width};display:flex;justify-content:center;box-sizing:border-box;"><video src="${item.src}" controls style="width:100%;height:auto;display:block;border-radius:4px;"></video></div>`;
    }
    case 'carousel': {
      const items = item.items || [];
      if (items.length === 0) return '';
      const slidesHtml = items
        .map((slide, idx) => {
          if (slide.type === 'image' && slide.src) {
            return `<div class="slide" style="display:${idx === 0 ? 'block' : 'none'};width:100%;height:320px;background:url('${slide.src}') center/cover no-repeat;"></div>`;
          }
          return `<div class="slide" style="display:${idx === 0 ? 'flex' : 'none'};width:100%;height:320px;background:#EEEEEE;justify-content:center;align-items:center;font-size:18px;color:#666;">슬라이드 ${idx + 1}</div>`;
        })
        .join('');

      return `
        <div class="carousel-container" style="position:relative;width:100%;height:320px;overflow:hidden;background:#fafafa;">
          ${slidesHtml}
          ${
            items.length > 1
              ? `
          <button onclick="prevSlide(this)" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.8);border:none;border-radius:50%;width:36px;height:36px;font-size:18px;cursor:pointer;">&#10094;</button>
          <button onclick="nextSlide(this)" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.8);border:none;border-radius:50%;width:36px;height:36px;font-size:18px;cursor:pointer;">&#10095;</button>
          `
              : ''
          }
        </div>
      `;
    }
    case 'button': {
      const fs = `${item.style?.fontSize || 16}px`;
      const fw = item.style?.fontWeight || 500;
      const color = item.style?.color || '#FFFFFF';
      const bg = item.style?.backgroundColor || '#0B74E2';
      const br = item.style?.borderRadius != null ? `${item.style.borderRadius}px` : '4px';
      const pt = `${item.style?.paddingTop ?? 10}px`;
      const pr = `${item.style?.paddingRight ?? 20}px`;
      const pb = `${item.style?.paddingBottom ?? 10}px`;
      const pl = `${item.style?.paddingLeft ?? 20}px`;
      const width = item.fullWidth ? '100%' : 'auto';

      return `<button style="width:${width};font-size:${fs};font-weight:${fw};color:${color};background-color:${bg};border-radius:${br};padding:${pt} ${pr} ${pb} ${pl};border:none;cursor:pointer;display:inline-block;text-align:center;box-sizing:border-box;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">${item.text}</button>`;
    }
    case 'text': {
      const fs = `${item.style?.fontSize || 16}px`;
      const fw = item.style?.fontWeight || 400;
      const fStyle = item.style?.fontStyle || 'normal';
      const ta = item.style?.textAlign || 'left';
      const lh = item.style?.lineHeight || 1.5;
      const ws = item.style?.whiteSpace || 'pre-line';
      const color = item.style?.color || '#1F1F1F';
      const td = item.style?.textDecoration || 'none';

      return `<div style="font-size:${fs};font-weight:${fw};font-style:${fStyle};text-align:${ta};line-height:${lh};white-space:${ws};color:${color};text-decoration:${td};box-sizing:border-box;">${item.value}</div>`;
    }
    default:
      return '';
  }
}

export function generateStandaloneHtml(data: Data[], title: string = '만다오 프로모션 페이지'): string {
  const content = data.map(renderItemHtml).join('');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
    }
    body {
      background-color: #F8F9FA;
      display: flex;
      justify-content: center;
      min-height: 100vh;
    }
    .page-container {
      width: 100%;
      max-width: 512px;
      background-color: #FFFFFF;
      min-height: 100vh;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      position: relative;
    }
  </style>
</head>
<body>
  <div class="page-container">
    ${content}
  </div>

  <script>
    function prevSlide(btn) {
      const container = btn.closest('.carousel-container');
      const slides = container.querySelectorAll('.slide');
      let activeIdx = 0;
      slides.forEach((s, idx) => {
        if (s.style.display !== 'none') activeIdx = idx;
        s.style.display = 'none';
      });
      const newIdx = (activeIdx - 1 + slides.length) % slides.length;
      slides[newIdx].style.display = slides[newIdx].classList.contains('slide') ? 'block' : 'flex';
    }

    function nextSlide(btn) {
      const container = btn.closest('.carousel-container');
      const slides = container.querySelectorAll('.slide');
      let activeIdx = 0;
      slides.forEach((s, idx) => {
        if (s.style.display !== 'none') activeIdx = idx;
        s.style.display = 'none';
      });
      const newIdx = (activeIdx + 1) % slides.length;
      slides[newIdx].style.display = slides[newIdx].classList.contains('slide') ? 'block' : 'flex';
    }
  </script>
</body>
</html>`;
}
