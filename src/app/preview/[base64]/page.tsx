export default function Page({ params: { base64 } }: { params: { base64: string } }) {
  const str = Buffer.from(base64, 'base64').toString('utf8');
  const value = JSON.parse(str.endsWith('7') ? str.substring(0, str.length - 1) : str);
  return <code style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(value, null, 2)}</code>;
}
