import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

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
    <Card className="w-full max-w-sm space-y-4 p-6">
      <h1 className="text-center text-2xl font-semibold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
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
        <Button type="submit" className="w-full">Entrar</Button>
      </form>
    </Card>
  )
}
