import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'

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

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          'https://webhook-workflows.baiosystems.com.br/webhook/produtos'
        )
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const data = (await res.json()) as Product[]
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

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
            <div>
              <strong>{p.ProductName}</strong>
              <p>{p.Description}</p>
              <span>R$ {p.Price}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
