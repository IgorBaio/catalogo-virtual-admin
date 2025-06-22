export interface Product {
  ownerId?: string
  name: string
  image: string
  price: string
  description: string
  id: string
  whatsappMessage: string
  isActive?: string
}

export interface ProductResponse {
  data: Product[]
}

export interface ProductRequest {
  OwnerId: string
  Name: string
  Image: string
  Price: number
  Description: string
  id: string
  WhatsappMessage: string
  Active: string
}

const API_BASE = 'https://catalogo-virtual-server.onrender.com'
export async function getProducts(query: string): Promise<ProductResponse> {
  const res = await fetch(`${API_BASE}/api/produto/query/${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

export async function updateProduct(product: Product) {

  const productRequest: ProductRequest = {
    OwnerId: product.ownerId || '',
    Name: product.name,
    Image: product.image,
    Price: Number(product.price),
    Description: product.description,
    id: product.id,
    WhatsappMessage: product.whatsappMessage,
    Active: product.isActive?.toString() || 'true',
  }

  console.log('productRequest', productRequest)
  const res = await fetch(`${API_BASE}/api/produto/${product.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productRequest),
  })
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${API_BASE}/api/produto/delete/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

export interface LoginResponse {
  token: string
  [key: string]: unknown
}

export async function login(user: string, email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, email, password }),
  })

  if (!res.ok) {
    const message = await res.text()
    throw new Error(message || res.statusText)
  }
  return res.json()
}
