import { useNavigate } from 'react-router-dom';
import { useJoin } from '@/hooks/useJoin';
import { JoinForm } from '@/components/JoinForm';

export default function JoinPage() {
  const navigate = useNavigate();
  const join = useJoin();

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    const { result } = await join.mutateAsync({ email, password });
    if (result === 'conflict') {
      alert('이미 가입된 이메일입니다.');
      return;
    }
    alert('회원가입이 완료되었습니다.');
    navigate('/login');
  };

  return <JoinForm onSubmit={handleSubmit} />;
}
