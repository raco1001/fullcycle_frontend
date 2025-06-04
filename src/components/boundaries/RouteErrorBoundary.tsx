import { useRouteError } from 'react-router-dom';
import React from 'react';

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError() as any;
  return <div>{error?.message || '라우팅 오류가 발생했습니다.'}</div>;
};
