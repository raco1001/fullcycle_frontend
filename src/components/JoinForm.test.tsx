//CUT : Code Under Test
import { fireEvent, screen } from '@testing-library/react'
import { renderWithRouter } from '@/utils/test/renderWithRouter'
import { JoinForm } from './JoinForm'
import userEvent from '@testing-library/user-event'

describe('JoinForm', () => {
  test('잘 렌더링된다.', () => {
    renderWithRouter(<JoinForm />, { initialEntries: ['/join'] })
    expect(
      screen.getByRole('heading', { name: /회원가입/i }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^비밀번호$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/비밀번호 확인/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /회원가입/i }),
    ).toBeInTheDocument()
  })
  test('회원정보를 입력하고 회원가입 버튼을 누르면 onSubmit 콜백이 호출된다.', async () => {
    const mockOnSubmit = jest.fn()
    renderWithRouter(<JoinForm onSubmit={mockOnSubmit} />, {
      initialEntries: ['/join'],
    })
    const emailInput = screen.getByLabelText(/이메일/i)
    const passwordInput = screen.getByLabelText(/^비밀번호$/i)
    const passwordConfirmInput = screen.getByLabelText(/비밀번호 확인/i)
    const submitButton = screen.getByRole('button', { name: /회원가입/i })
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.type(passwordConfirmInput, 'password123')
    await userEvent.click(submitButton)
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })
  test('비밀번호와 비밀번호 확인이 일치하지 않으면 경고창이 떠야 한다', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
    renderWithRouter(<JoinForm />, { initialEntries: ['/join'] })
    const passwordInput = screen.getByLabelText(/^비밀번호$/i)
    const passwordConfirmInput = screen.getByLabelText(/비밀번호 확인/i)
    const submitButton = screen.getByRole('button', { name: /회원가입/i })
    await userEvent.type(passwordInput, 'password123')
    await userEvent.type(passwordConfirmInput, 'differentPassword')
    await userEvent.click(submitButton)
    expect(alertSpy).toHaveBeenCalledWith('비밀번호가 일치하지 않습니다.')
    alertSpy.mockRestore()
  })
})
