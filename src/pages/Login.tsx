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
      <form onSubmit={handleSubmit} className="login-form">
        <input
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
