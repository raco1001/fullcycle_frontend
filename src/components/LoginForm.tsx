import React, { useState } from 'react';

export interface LoginFormProps {
  onSubmit?(values: { email: string; password: string }): void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ email, password });
      }}
    >
      <div>
        <label>
          이메일
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          비밀번호
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};
