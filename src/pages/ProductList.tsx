import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import type { Product } from '@/lib/api'
import { getProducts, updateProduct } from '@/lib/api'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  function handleEdit(p: Product) {
    setEditing(p)
    setOpen(true)
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (!editing) return
    setEditing({ ...editing, [e.target.name]: e.target.value })
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editing) return
    try {
      await updateProduct(editing)
      setProducts((prev) =>
        prev.map((item) => (item.id === editing.id ? editing : item))
      )
      setOpen(false)
    } catch (err) {
      console.error(err)
      alert('Erro ao atualizar produto')
    }
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="products-container">
      <h1>Produtos</h1>
      <Separator className="my-4" />
      <ul className="product-list">
        {products.map((p) => (
          <li key={p.id} className="product-item">
            <img src={p.Image} alt={p.ProductName} />
            <div className="flex-1">
              <strong>{p.ProductName}</strong>
              <p>{p.Description}</p>
              <span>R$ {p.Price}</span>
            </div>
            <Button variant="outline" onClick={() => handleEdit(p)}>
              Editar
            </Button>
          </li>
        ))}
      </ul>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Editar produto</SheetTitle>
          </SheetHeader>
          {editing && (
            <form onSubmit={saveEdit} className="product-form mt-4">
              <Input
                name="OwnerId"
                placeholder="Owner"
                value={editing.OwnerId}
                onChange={handleChange}
              />
              <Input
                name="ProductName"
                placeholder="Nome"
                value={editing.ProductName}
                onChange={handleChange}
              />
              <Input
                name="Image"
                placeholder="Imagem"
                value={editing.Image}
                onChange={handleChange}
              />
              <Input
                name="Price"
                placeholder="Preço"
                value={editing.Price}
                onChange={handleChange}
              />
              <Textarea
                name="Description"
                placeholder="Descrição"
                value={editing.Description}
                onChange={handleChange}
              />
              <Input
                name="WhatsappMessage"
                placeholder="Mensagem WhatsApp"
                value={editing.WhatsappMessage}
                onChange={handleChange}
              />
              <SheetFooter className="mt-4">
                <SheetClose asChild>
                  <Button type="button" variant="destructive" style={{
                    backgroundColor: 'oklch(0.552 0.016 285.938)'
                  }} >
                    Cancelar
                  </Button>
                </SheetClose>
                <Button type="submit" variant="secondary">
                  Salvar
                </Button>
              </SheetFooter>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
