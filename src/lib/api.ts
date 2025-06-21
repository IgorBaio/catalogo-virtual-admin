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

const API_BASE = 'https://catalogo-virtual-server.onrender.com'
export async function getProducts(query: string): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/api/produto/query/${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

export async function updateProduct(product: Product) {
  const res = await fetch(`${API_BASE}/api/produto/${product.id}`, {
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
