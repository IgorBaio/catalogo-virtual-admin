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
import type { Product, ProductResponse } from '@/lib/api'
import { getProducts, updateProduct, deleteProduct } from '@/lib/api'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import DrawerMenu from "@/components/DrawerMenu"

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const company = JSON.parse(localStorage.getItem('userData') || '{}').company
        const query = company || 'all'
        const productsResult: ProductResponse  = await getProducts(query)
        const {data} = productsResult || []

        if(data && data.length > 0) {
          setProducts(data)
        }
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
      setOpen(false)
      setErrorMsg('Erro ao atualizar produto')
    }
  }

  async function remove(id: string) {
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error(err)
      setErrorMsg('Erro ao remover produto')
    }
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="products-container">
        <DrawerMenu />
      <h1>Produtos</h1>
      {errorMsg && (
        <Alert className="my-4">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
      <Separator className="my-4" />
      <ul className="product-list" key={products.length}>
        {products?.map((p: Product) => (
          <li key={p.id} className="product-item">
            <img src={p.image} alt={p.name} />
            <div className="flex-1">
              <strong>{p.name}</strong>
              <p>{p.description}</p>
              <span>R$ {p.price}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleEdit(p)}>
                Editar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Excluir</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remover produto</AlertDialogTitle>
                    <AlertDialogDescription>
                      Deseja remover {p.name}?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove(p.id)}>
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
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
                name="ownerId"
                placeholder="Owner"
                value={editing.ownerId}
                onChange={handleChange}
              />
              <Input
                name="name"
                placeholder="Nome"
                value={editing.name}
                onChange={handleChange}
              />
              <Input
                name="image"
                placeholder="Imagem"
                value={editing.image}
                onChange={handleChange}
              />
              <Input
                name="price"
                placeholder="Preço"
                value={editing.price}
                onChange={handleChange}
              />
              <Textarea
                name="description"
                placeholder="Descrição"
                value={editing.description}
                onChange={handleChange}
              />
              <Input
                name="whatsappMessage"
                placeholder="Mensagem WhatsApp"
                value={editing.whatsappMessage}
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
