import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as any;
  return <div>{error?.message || '알 수 없는 오류가 발생했습니다.'}</div>;
}
