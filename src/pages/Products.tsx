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
  const company = JSON.parse(localStorage.getItem('userData') || '{}').company

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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_DIMENSION = 400
        let { width, height } = img
        if (width > height && width > MAX_DIMENSION) {
          height = (height * MAX_DIMENSION) / width
          width = MAX_DIMENSION
        } else if (height > MAX_DIMENSION) {
          width = (width * MAX_DIMENSION) / height
          height = MAX_DIMENSION
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.drawImage(img, 0, 0, width, height)
        const compressed = canvas.toDataURL('image/jpeg', 0.7)
        setForm((prev) => ({ ...prev, image: compressed }))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
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

  return (
    <div className="products-container">
      <DrawerMenu />
      <h1>Produtos</h1>
      {errorMsg && (
        <>
          <Separator className="my-4" />
          <Alert className="my-4">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{errorMsg}</AlertDescription>
          </Alert>
        </>
      )}
      <Separator className="my-4" />
      <form onSubmit={addProduct} className="product-form">
        <Input name="ownerId" placeholder="Owner" value={company} disabled style={{ border: 'none' }} />
        <Input name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
        <Input type="file" name="image" onChange={handleImageChange} />
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        )}
        <Input name="price" placeholder="Preço" value={form.price} onChange={handleChange} />
        <Textarea name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
        <Input name="whatsappMessage" placeholder="Mensagem WhatsApp" value={form.whatsappMessage} onChange={handleChange} />
        <Separator className="my-4" />
        <Button type="submit" variant={"destructive"} >Adicionar</Button>
      </form>

    </div>
  )
}
