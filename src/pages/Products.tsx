import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useState } from 'react'
import DrawerMenu from "@/components/DrawerMenu"
import type { Product } from '@/lib/api'
import { createProduct } from '@/lib/api'


export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [form, setForm] = useState<Omit<Product, 'id'>>({
    ownerId: '',
    name: '',
    image: '',
    price: '',
    description: '',
    whatsappMessage: '',
    isActive: 'true',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault()
    try {
      const result = await createProduct(form)
      const created = result.data
      setProducts([...products, created])
      setForm({
        ownerId: '',
        name: '',
        image: '',
        price: '',
        description: '',
        whatsappMessage: '',
        isActive: 'true',
      })
      setErrorMsg(null)
    } catch (err) {
      console.error(err)
      setErrorMsg('Erro ao criar produto')
    }
  }

  function remove(id: string) {
    setProducts(products.filter((p) => p.id !== id))
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
        <form onSubmit={addProduct} className="product-form">
        <Input name="ownerId" placeholder="Owner" value={form.ownerId} onChange={handleChange} />
        <Input name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
        <Input name="image" placeholder="Imagem" value={form.image} onChange={handleChange} />
        <Input name="price" placeholder="Preço" value={form.price} onChange={handleChange} />
        <Textarea name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
        <Input name="whatsappMessage" placeholder="Mensagem WhatsApp" value={form.whatsappMessage} onChange={handleChange} />
      <Separator className="my-4" />
        <Button type="submit" variant={"destructive"} >Adicionar</Button>
      </form>
      <ul className="product-list">
        {products.map((p) => (
          <li key={p.id} className="product-item">
            <img src={p.image} alt={p.name} />
            <div>
              <strong>{p.name}</strong>
              <p>{p.description}</p>
              <span>R$ {p.price}</span>
            </div>
            <button onClick={() => remove(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
