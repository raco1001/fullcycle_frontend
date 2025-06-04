import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';

export const AppErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback={<div>앱 오류가 발생했습니다.</div>}>{children}</ErrorBoundary>
);
