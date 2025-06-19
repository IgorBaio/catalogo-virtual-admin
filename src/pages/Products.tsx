import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'

interface Product {
  OwnerId: string
  ProductName: string
  Image: string
  Price: string
  Description: string
  id: string
  WhatsappMessage: string
  Active: string
}

function createId() {
  return Math.random().toString(36).substring(2, 10)
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem('products')
    return stored ? JSON.parse(stored) : []
  })

  const [form, setForm] = useState<Omit<Product, 'id'>>({
    OwnerId: '',
    ProductName: '',
    Image: '',
    Price: '',
    Description: '',
    WhatsappMessage: '',
    Active: 'true',
  })

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function addProduct(e: React.FormEvent) {
    e.preventDefault()
    const newProduct: Product = { ...form, id: createId() }
    setProducts([...products, newProduct])
    setForm({
      OwnerId: '',
      ProductName: '',
      Image: '',
      Price: '',
      Description: '',
      WhatsappMessage: '',
      Active: 'true',
    })
  }

  function remove(id: string) {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="products-container">
      <h1>Produtos</h1>
      <form onSubmit={addProduct} className="product-form">
        <Input name="OwnerId" placeholder="Owner" value={form.OwnerId} onChange={handleChange} />
        <Input name="ProductName" placeholder="Nome" value={form.ProductName} onChange={handleChange} />
        <Input name="Image" placeholder="Imagem" value={form.Image} onChange={handleChange} />
        <Input name="Price" placeholder="Preço" value={form.Price} onChange={handleChange} />
        <textarea name="Description" placeholder="Descrição" value={form.Description} onChange={handleChange} />
        <Input name="WhatsappMessage" placeholder="Mensagem WhatsApp" value={form.WhatsappMessage} onChange={handleChange} />
        <button type="submit">Adicionar</button>
      </form>
      <ul className="product-list">
        {products.map((p) => (
          <li key={p.id} className="product-item">
            <img src={p.Image} alt={p.ProductName} />
            <div>
              <strong>{p.ProductName}</strong>
              <p>{p.Description}</p>
              <span>R$ {p.Price}</span>
            </div>
            <button onClick={() => remove(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
