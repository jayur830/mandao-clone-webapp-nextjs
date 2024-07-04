export default function Page({ params: { base64 } }: { params: { base64: string } }) {
  const value = JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));
  return <code style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(value, null, 2)}</code>;
}
