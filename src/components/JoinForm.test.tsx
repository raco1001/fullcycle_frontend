//CUT : Code Under Test
import { fireEvent, screen } from '@testing-library/react'
import { renderWithRouter } from '@/utils/test/renderWithRouter'
import { JoinForm } from './JoinForm'

describe('JoinForm', () => {
  test('잘 렌더링된다.', () => {
    renderWithRouter(<JoinForm />, { initialEntries: ['/join'] })
    expect(
      screen.getByLabelText('이메일', { selector: 'input' }),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('비밀번호', { selector: 'input' }),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('비밀번호 확인', { selector: 'input' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('회원가입', { selector: 'button' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('로그인하기', { selector: 'a' }),
    ).toBeInTheDocument()
  })

  test('회원정보를 입력하고 회원가입 버튼을 누르면 onSubmit 콜백이 호출된다.', () => {
    const onSubmit = jest.fn()
    renderWithRouter(<JoinForm onSubmit={onSubmit} />, {
      initialEntries: ['/join'],
    })

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'foo@example.com' },
    })
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: '1234' },
    })
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
      target: { value: '1234' },
    })
    screen.getByText('회원가입', { selector: 'button' }).click()

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'foo@example.com',
      password: '1234',
    })
  })

  test('로그인하기 링크를 누르면 로그인 URL로 이동한다.', () => {
    const { router } = renderWithRouter(<JoinForm />, {
      initialEntries: ['/join'],
    })
    fireEvent.click(screen.getByText('로그인하기'))
    expect(router.state.location.pathname).toBe('/login')
  })

  test('비밀번호 확인을 다르게 입력하면 alert 창이 뜨고 onSubmit 콜백이 호출되지 않는다.', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
    const onSubmit = jest.fn()
    renderWithRouter(<JoinForm onSubmit={onSubmit} />, {
      initialEntries: ['/join'],
    })

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'foo@example.com' },
    })
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: '1234' },
    })
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
      target: { value: '123456' },
    })
    screen.getByText('회원가입', { selector: 'button' }).click()

    expect(alertSpy).toHaveBeenCalledWith('비밀번호가 일치하지 않습니다.')
    expect(onSubmit).not.toHaveBeenCalled()
    alertSpy.mockRestore()
  })
})
