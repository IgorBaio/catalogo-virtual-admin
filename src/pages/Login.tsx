import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '@/lib/api'

export default function Login() {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const data = await login(user, email, pass)
      localStorage.setItem('logged', 'true')
      localStorage.setItem('userData', JSON.stringify(data))
      navigate('/products')
    } catch (err) {
      setError((err as Error).message || 'Credenciais inválidas')
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Separator className="my-4" />
      {error && (
        <Alert className="mb-4">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          placeholder="Usuário (CPF/CNPJ)"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      <Separator className="my-4" />
        <Button type="submit" variant={'secondary'}>Entrar</Button>
      </form>
    </div>
  )
}
