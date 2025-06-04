import React, { useState } from 'react'
import { Form } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
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
      <Form
        method="post"
        onSubmit={(e) => {
          e.preventDefault()
          if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.')
            return
          }
          props.onSubmit?.({ email, password })
        }}
      >
        <InputContainer>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </InputContainer>
        <Button type="submit">회원가입</Button>
      </Form>
    </Container>
  )
}
