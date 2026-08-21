import PreviewRenderer from '@/components/PreviewRenderer';
import { Data } from '@/types/block';

export default async function Page(props: { params: Promise<{ base64: string }> }) {
  const params = await props.params;
  const { base64 } = params;

  let data: Data[] = [];
  try {
    const str = Buffer.from(base64, 'base64').toString('utf8');
    const cleanStr = str.endsWith('7') ? str.substring(0, str.length - 1) : str;
    data = JSON.parse(cleanStr);
  } catch (e) {
    console.error('Failed to parse preview data:', e);
  }

  return <PreviewRenderer data={data} />;
}
