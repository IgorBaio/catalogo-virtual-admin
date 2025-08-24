import { Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export default function DrawerMenu() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('logged')
    localStorage.removeItem('userData')
    navigate('/login')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mb-4 mr-auto fixed left-4 top-4 z-50"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <nav className="mt-8 flex flex-col gap-4">
          <Link to="/products">Cadastro de Produtos</Link>
          <Link to="/list">Lista de Produtos</Link>
          <Button variant="destructive" onClick={handleLogout}>Sair</Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
