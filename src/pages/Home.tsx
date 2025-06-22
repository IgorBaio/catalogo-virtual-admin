import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <div className="products-container">
      <h1>Menu</h1>
      <Separator className="my-4" />
      <nav className="flex flex-col gap-4 items-start">
        <Link to="/products">Cadastro de Produtos</Link>
        <Link to="/list">Lista de Produtos</Link>
      </nav>
    </div>
  )
}
