import { useRouteError } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import oc from 'open-color'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px); // Adjust if you have fixed header/footer
  padding: 20px;
  text-align: center;
`

const WarningIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 70px solid ${oc.yellow[6]};
  position: relative;
  margin-bottom: 40px;

  &::after {
    content: '!';
    position: absolute;
    top: 25px; // Adjust to center the exclamation mark
    left: 50%;
    transform: translateX(-50%);
    font-size: 30px;
    font-weight: bold;
    color: white;
  }
`

const ErrorTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: ${oc.gray[9]};
  margin-bottom: 16px;
`

const ErrorMessage = styled.p`
  font-size: 18px;
  color: ${oc.gray[7]};
  margin-bottom: 40px;
`

const RefreshButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: ${oc.gray[7]};
  background-color: ${oc.gray[0]};
  border: 1px solid ${oc.gray[4]};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${oc.gray[1]};
  }

  &:active {
    background-color: ${oc.gray[2]};
  }
`

export const RouteErrorBoundary: React.FC = () => {
  // const error = useRouteError() as any; // You can use this if you need error details
  // For now, displaying generic messages as per the image.

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <Container>
      <WarningIcon />
      <ErrorTitle>오류가 발생했습니다.</ErrorTitle>
      <ErrorMessage>잠시 후 다시 시도해주세요.</ErrorMessage>
      <RefreshButton onClick={handleRefresh}>새로고침</RefreshButton>
    </Container>
  )
}
