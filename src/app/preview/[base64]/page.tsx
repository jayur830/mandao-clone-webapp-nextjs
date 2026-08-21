import PreviewRenderer from '@/components/PreviewRenderer';
import { Data } from '@/types/block';
import { decodePreviewData } from '@/utils/previewUrl';

export default async function Page(props: { params: Promise<{ base64: string }> }) {
  const params = await props.params;
  const { base64 } = params;

  const data = decodePreviewData<Data[]>(base64) || [];

  return <PreviewRenderer data={data} />;
}
