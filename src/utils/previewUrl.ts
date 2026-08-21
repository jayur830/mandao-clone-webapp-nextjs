export function encodePreviewData(data: unknown): string {
  try {
    const jsonStr = JSON.stringify(data);
    if (typeof window !== 'undefined') {
      // 브라우저 환경: UTF-8 safe base64url 인코딩
      const binary = encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16)));
      const base64 = btoa(binary);
      // URL-safe base64 (+ -> -, / -> _, = 제거)
      return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } else {
      // Node.js 환경
      return Buffer.from(jsonStr, 'utf8').toString('base64url');
    }
  } catch (e) {
    console.error('Failed to encode preview data:', e);
    return '';
  }
}

export function decodePreviewData<T>(encoded: string): T | null {
  if (!encoded) return null;
  try {
    // base64url -> standard base64 복원
    let base64 = decodeURIComponent(encoded).replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }

    if (typeof window !== 'undefined') {
      const binary = atob(base64);
      const jsonStr = decodeURIComponent(
        Array.from(binary)
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonStr) as T;
    } else {
      const jsonStr = Buffer.from(base64, 'base64').toString('utf8');
      return JSON.parse(jsonStr) as T;
    }
  } catch (e) {
    console.error('Failed to decode preview data:', e);
    return null;
  }
}
