import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import oc from 'open-color'

export interface LoginFormProps {
  onSubmit?(values: { email: string; password: string }): void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <Container>
      <Title>로그인</Title>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit?.({ email, password })
        }}
      >
        <InputGroup>
          <Label>이메일</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>비밀번호</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
        <SubmitButton type="submit">로그인</SubmitButton>
      </StyledForm>
      <SignupText>
        계정이 없으신가요? <StyledLink to="/join">가입하기</StyledLink>
      </SignupText>
    </Container>
  )
}

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
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 40px;
  color: ${oc.gray[9]};
`

const StyledForm = styled.form`
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

const SignupText = styled.p`
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
