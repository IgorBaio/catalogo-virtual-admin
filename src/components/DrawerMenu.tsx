import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export default function DrawerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="mb-4 mr-auto">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <nav className="mt-8 flex flex-col gap-4">
          <Link to="/products">Cadastro de Produtos</Link>
          <Link to="/list">Lista de Produtos</Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
