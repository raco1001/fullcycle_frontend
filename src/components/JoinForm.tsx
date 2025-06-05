import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom'
import styled from 'styled-components'
import oc from 'open-color'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(
    100vh - 160px
  ); // Assuming header and footer height or some padding
  padding: 20px;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  color: ${oc.gray[9]};
`

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 14px;
  color: ${oc.gray[7]};
  margin-bottom: 8px;
`

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid ${oc.gray[4]};
  border-radius: 4px;
  &:focus {
    border-color: ${oc.blue[5]};
    outline: none;
    box-shadow: 0 0 0 2px ${oc.blue[1]};
  }
`

const SubmitButton = styled.button`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: bold;
  color: ${oc.gray[7]};
  background-color: ${oc.blue[1]}; // Light blue background
  border: 1px solid ${oc.blue[2]};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${oc.blue[2]};
  }
  &:active {
    background-color: ${oc.blue[3]};
  }
`

const LoginText = styled.p`
  margin-top: 30px;
  font-size: 14px;
  color: ${oc.gray[7]};
`

const StyledLink = styled(Link)`
  color: ${oc.blue[6]};
  text-decoration: underline;
  font-weight: bold;

  &:hover {
    color: ${oc.blue[7]};
  }
`

export interface JoinFormProps {
  onSubmit?(e: { email: string; password: string }): void
}

export const JoinForm: React.FC<JoinFormProps> = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  return (
    <Container>
      <Title>회원가입</Title>
      <StyledForm
        method="post"
        onSubmit={(e) => {
          // Prevent default if client-side validation fails or if onSubmit is provided
          // React Router's Form will handle its own submission otherwise.
          if (password !== passwordConfirm) {
            e.preventDefault()
            alert('비밀번호가 일치하지 않습니다.')
            return
          }
          if (props.onSubmit) {
            e.preventDefault()
            props.onSubmit({ email, password })
          }
        }}
      >
        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            name="email" // Required for react-router-dom Form data
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            name="password" // Required for react-router-dom Form data
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
          <Input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm" // Required for react-router-dom Form data
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </InputGroup>
        <SubmitButton type="submit">회원가입</SubmitButton>
      </StyledForm>
      <LoginText>
        계정이 이미 있으신가요? <StyledLink to="/login">로그인하기</StyledLink>
      </LoginText>
    </Container>
  )
}
