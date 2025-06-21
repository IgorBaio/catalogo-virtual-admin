export interface Product {
  OwnerId: string
  ProductName: string
  Image: string
  Price: string
  Description: string
  id: string
  WhatsappMessage: string
  Active: string
}

const API_BASE = 'https://webhook-workflows.baiosystems.com.br/webhook'

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/produtos`)
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

export async function updateProduct(product: Product) {
  const res = await fetch(`${API_BASE}/produtos/${product.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${API_BASE}/produtos/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}
