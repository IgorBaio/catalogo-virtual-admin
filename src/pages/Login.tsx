import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (user === 'admin' && pass === 'admin') {
      localStorage.setItem('logged', 'true')
      navigate('/products')
    } else {
      alert('Credenciais inválidas')
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Separator className="my-4" />
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
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
