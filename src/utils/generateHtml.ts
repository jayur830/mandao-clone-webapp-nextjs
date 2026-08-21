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
      const br = item.style?.borderRadius != null ? `border-radius:${item.style.borderRadius}px;` : '';
      const bw = item.style?.borderWidth ? `border:${item.style.borderWidth}px solid ${item.style.borderColor || '#E0E0E0'};` : '';
      const shadow = item.style?.boxShadow && item.style.boxShadow !== 'none' ? `box-shadow:${item.style.boxShadow};` : '';
      const animClass = item.style?.animation && item.style.animation !== 'none' ? `anim-${item.style.animation}` : '';

      const childrenHtml = (item.children || []).map(renderItemHtml).join('');
      return `<div class="${animClass}" style="display:flex;flex-direction:${dir};justify-content:${jc};align-items:${ai};gap:${gap};background-color:${bg};padding:${pt} ${pr} ${pb} ${pl};width:100%;box-sizing:border-box;${br}${bw}${shadow}">${childrenHtml}</div>`;
    }
    case 'image': {
      if (!item.src) return '';
      const width = item.fullWidth ? '100%' : item.style?.width || 'auto';
      let onclickAttr = '';
      if (item.action?.type === 'link' && item.action.url) {
        onclickAttr = `onclick="window.open('${item.action.url}', '${item.action.target || '_blank'}')" style="cursor:pointer;"`;
      } else if (item.action?.type === 'alert' && item.action.alertMessage) {
        onclickAttr = `onclick="alert('${item.action.alertMessage.replace(/'/g, "\\'")}')" style="cursor:pointer;"`;
      }
      return `<div ${onclickAttr} style="width:${width};display:flex;justify-content:center;box-sizing:border-box;"><img src="${item.src}" alt="promotion image" style="width:100%;height:auto;display:block;border-radius:4px;" /></div>`;
    }
    case 'video': {
      if (!item.src) return '';
      const width = item.fullWidth ? '100%' : 'auto';
      return `<div style="width:${width};display:flex;justify-content:center;box-sizing:border-box;"><video src="${item.src}" controls style="width:100%;height:auto;display:block;border-radius:4px;"></video></div>`;
    }
    case 'timer': {
      const color = item.style?.color || '#FFFFFF';
      const bg = item.style?.backgroundColor || '#1F1F1F';
      const br = item.style?.borderRadius != null ? `${item.style.borderRadius}px` : '8px';
      const fs = item.style?.fontSize ? `${item.style.fontSize}px` : '18px';
      const shadow = item.style?.boxShadow && item.style.boxShadow !== 'none' ? `box-shadow:${item.style.boxShadow};` : '';
      const labelHtml = item.label ? `<div style="color:${color};font-weight:700;font-size:0.9em;margin-bottom:8px;text-align:center;">${item.label}</div>` : '';

      return `
        <div class="timer-widget" data-target="${item.targetDate || ''}" style="width:100%;background-color:${bg};border-radius:${br};padding:18px;font-size:${fs};box-sizing:border-box;display:flex;flex-direction:column;align-items:center;${shadow}">
          ${labelHtml}
          <div class="timer-countdown" style="display:flex;align-items:center;gap:6px;">
            <div style="display:flex;flex-direction:column;align-items:center;"><span class="time-d" style="background:rgba(255,255,255,0.15);color:${color};border-radius:6px;min-width:40px;padding:6px 8px;text-align:center;font-weight:800;font-size:1.1em;">00</span><span style="color:${color};opacity:0.8;font-size:11px;margin-top:2px;">일</span></div>
            <span style="color:${color};font-weight:800;margin-bottom:14px;">:</span>
            <div style="display:flex;flex-direction:column;align-items:center;"><span class="time-h" style="background:rgba(255,255,255,0.15);color:${color};border-radius:6px;min-width:40px;padding:6px 8px;text-align:center;font-weight:800;font-size:1.1em;">00</span><span style="color:${color};opacity:0.8;font-size:11px;margin-top:2px;">시</span></div>
            <span style="color:${color};font-weight:800;margin-bottom:14px;">:</span>
            <div style="display:flex;flex-direction:column;align-items:center;"><span class="time-m" style="background:rgba(255,255,255,0.15);color:${color};border-radius:6px;min-width:40px;padding:6px 8px;text-align:center;font-weight:800;font-size:1.1em;">00</span><span style="color:${color};opacity:0.8;font-size:11px;margin-top:2px;">분</span></div>
            <span style="color:${color};font-weight:800;margin-bottom:14px;">:</span>
            <div style="display:flex;flex-direction:column;align-items:center;"><span class="time-s" style="background:rgba(255,255,255,0.15);color:${color};border-radius:6px;min-width:40px;padding:6px 8px;text-align:center;font-weight:800;font-size:1.1em;">00</span><span style="color:${color};opacity:0.8;font-size:11px;margin-top:2px;">초</span></div>
          </div>
        </div>
      `;
    }
    case 'form': {
      const bg = item.style?.backgroundColor || '#FFFFFF';
      const br = item.style?.borderRadius != null ? `${item.style.borderRadius}px` : '8px';
      const shadow = item.style?.boxShadow && item.style.boxShadow !== 'none' ? `box-shadow:${item.style.boxShadow};` : 'box-shadow:0 4px 16px rgba(0,0,0,0.08);';
      const titleHtml = item.title ? `<div style="font-weight:700;font-size:18px;text-align:center;margin-bottom:16px;">${item.title}</div>` : '';
      const successMsg = (item.successMessage || '신청이 완료되었습니다!').replace(/'/g, "\\'");

      const fieldsHtml = (item.fields || [])
        .map((field) => {
          if (field.type === 'checkbox') {
            return `
              <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:#555;cursor:pointer;margin-bottom:12px;">
                <input type="checkbox" data-label="${field.label}" ${field.required ? 'data-required="true"' : ''} style="width:16px;height:16px;" />
                <span>${field.label} ${field.required ? '<span style="color:#EF4444;">*</span>' : ''}</span>
              </label>
            `;
          }
          return `
            <div style="margin-bottom:12px;">
              <label style="display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px;">${field.label} ${field.required ? '<span style="color:#EF4444;">*</span>' : ''}</label>
              <input type="${field.type}" placeholder="${field.placeholder || ''}" data-label="${field.label}" ${field.required ? 'data-required="true"' : ''} style="width:100%;padding:10px 12px;border:1px solid #DDD;border-radius:4px;font-size:14px;box-sizing:border-box;outline:none;" />
            </div>
          `;
        })
        .join('');

      return `
        <div class="form-widget" data-success="${successMsg}" style="width:100%;background-color:${bg};border-radius:${br};padding:24px;box-sizing:border-box;${shadow}">
          ${titleHtml}
          <form onsubmit="handleFormSubmit(event, this)">
            ${fieldsHtml}
            <button type="submit" style="width:100%;background-color:#0B74E2;color:#FFF;border:none;border-radius:4px;padding:12px;font-size:16px;font-weight:700;cursor:pointer;margin-top:8px;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">${item.buttonText || '신청하기'}</button>
          </form>
        </div>
      `;
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

      let onclickAttr = '';
      if (item.action?.type === 'link' && item.action.url) {
        onclickAttr = `onclick="window.open('${item.action.url}', '${item.action.target || '_blank'}')"`;
      } else if (item.action?.type === 'alert' && item.action.alertMessage) {
        onclickAttr = `onclick="alert('${item.action.alertMessage.replace(/'/g, "\\'")}')"`;
      }

      return `<button ${onclickAttr} style="width:${width};font-size:${fs};font-weight:${fw};color:${color};background-color:${bg};border-radius:${br};padding:${pt} ${pr} ${pb} ${pl};border:none;cursor:pointer;display:inline-block;text-align:center;box-sizing:border-box;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">${item.text}</button>`;
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
    .anim-fadeIn {
      animation: fadeIn 0.8s ease-in-out;
    }
    .anim-slideUp {
      animation: slideUp 0.6s ease-out;
    }
    .anim-bounce {
      animation: bounce 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97);
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
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

    function updateTimers() {
      document.querySelectorAll('.timer-widget').forEach(function(widget) {
        var targetStr = widget.getAttribute('data-target');
        if (!targetStr) return;
        var diff = new Date(targetStr).getTime() - new Date().getTime();
        if (diff <= 0) {
          widget.innerHTML = '<div style="font-weight:700;font-size:1.1em;text-align:center;padding:8px 0;">프로모션이 마감되었습니다.</div>';
          return;
        }
        var d = Math.floor(diff / (1000 * 60 * 60 * 24));
        var h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        var m = Math.floor((diff / 1000 / 60) % 60);
        var s = Math.floor((diff / 1000) % 60);
        var pad = function(n) { return n < 10 ? '0' + n : n; };
        
        var dEl = widget.querySelector('.time-d');
        var hEl = widget.querySelector('.time-h');
        var mEl = widget.querySelector('.time-m');
        var sEl = widget.querySelector('.time-s');
        if (dEl) dEl.innerText = pad(d);
        if (hEl) hEl.innerText = pad(h);
        if (mEl) mEl.innerText = pad(m);
        if (sEl) sEl.innerText = pad(s);
      });
    }
    function handleFormSubmit(e, formEl) {
      e.preventDefault();
      var widget = formEl.closest('.form-widget');
      var successMsg = widget ? widget.getAttribute('data-success') : '신청이 완료되었습니다!';
      var inputs = formEl.querySelectorAll('input');
      
      for (var i = 0; i < inputs.length; i++) {
        var inp = inputs[i];
        var isReq = inp.getAttribute('data-required') === 'true';
        var label = inp.getAttribute('data-label') || '필드';
        
        if (isReq) {
          if (inp.type === 'checkbox' && !inp.checked) {
            alert('[필수 동의] "' + label + '" 항목에 동의해 주세요.');
            return;
          }
          if (inp.type !== 'checkbox' && (!inp.value || inp.value.trim() === '')) {
            alert('[필수 입력] "' + label + '" 항목을 입력해 주세요.');
            inp.focus();
            return;
          }
        }
      }
      
      alert(successMsg);
      formEl.reset();
    }
    updateTimers();
    setInterval(updateTimers, 1000);
  </script>
</body>
</html>`;
}
