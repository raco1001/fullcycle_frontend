import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm';
import { useLogin } from '@/hooks/useLogin';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    await login.mutateAsync({ email, password });
    navigate('/notes');
  };

  return <LoginForm onSubmit={handleSubmit} />;
}
