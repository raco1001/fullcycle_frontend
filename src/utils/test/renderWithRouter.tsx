// src/utils/test/renderWithRouter.tsx (확장자도 .tsx로 변경)
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

// 'wrapper'도 Omit에 추가하여 우리가 직접 wrapper를 제공하지 않음을 명시합니다.
interface CustomRenderOptions extends Omit<RenderOptions, 'queries' | 'wrapper'> {
  initialEntries?: string[];
}

export function renderWithRouter(
  ui: React.ReactElement,
  options: CustomRenderOptions = {} // 옵션 전체를 하나의 객체로 받음
) {
  // 함수 내부에서 initialEntries와 나머지 renderOptions를 디스트럭처링합니다.
  const { initialEntries = ['/'], ...restOptions } = options;

  // Data Router를 생성합니다.
  // 테스트 대상 ui를 모든 경로('*')에 대한 element로 설정합니다.
  // ui 자체가 <Routes>를 포함할 수 있습니다.
  const router = createMemoryRouter(
    [
      {
        path: '*', // 모든 경로에 대해
        element: ui, // 테스트할 컴포넌트 ui를 직접 렌더링
      },
    ],
    {
      initialEntries, // 디스트럭처링된 initialEntries 사용
    }
  );

  // RouterProvider를 사용하여 router 컨텍스트를 제공합니다.
  // RouterProvider는 router 설정에 따라 내부적으로 ui를 렌더링합니다.
  return render(<RouterProvider router={router} />, restOptions);
}