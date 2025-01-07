import { v4 as uuidv4 } from 'uuid'

// Types
export interface User {
  id: string
  email: string
}

export interface Provider {
  id: string
  userId: string
  businessName: string
  description: string
  contactEmail: string
  phone: string
  location: string
  categories: string[]
  experienceYears: number
  createdAt: string
}

export interface ServiceListing {
  id: string
  providerId: string
  title: string
  description: string
  category: string
  priceType: 'fixed' | 'hourly' | 'quote'
  price: number
  location: string
  active: boolean
  createdAt: string
}

export interface Booking {
  id: string
  serviceId: string
  clientId: string
  providerId: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  dateTime: string
  price: number
  notes?: string
  createdAt: string
}

export interface Review {
  id: string
  bookingId: string
  clientId: string
  providerId: string
  rating: number
  comment: string
  createdAt: string
}

// Mock Data
export const users: User[] = [
  { id: '1', email: 'provider@example.com' },
  { id: '2', email: 'client@example.com' }
]

export const providers: Provider[] = [
  {
    id: '1',
    userId: '1',
    businessName: 'Serviços Profissionais',
    description: 'Oferecemos serviços de qualidade',
    contactEmail: 'provider@example.com',
    phone: '123456789',
    location: 'Maputo',
    categories: ['Elétrica', 'Manutenção'],
    experienceYears: 5,
    createdAt: new Date().toISOString()
  }
]

export const services: ServiceListing[] = [
  {
    id: '1',
    providerId: '1',
    title: 'Serviço de Eletricista',
    description: 'Serviços elétricos residenciais e comerciais',
    category: 'Elétrica',
    priceType: 'hourly',
    price: 100,
    location: 'Maputo',
    active: true,
    createdAt: new Date().toISOString()
  }
]

export const bookings: Booking[] = [
  {
    id: '1',
    serviceId: '1',
    clientId: '2',
    providerId: '1',
    status: 'completed',
    dateTime: new Date().toISOString(),
    price: 200,
    notes: 'Instalação elétrica completa',
    createdAt: new Date().toISOString()
  }
]

export const reviews: Review[] = [
  {
    id: '1',
    bookingId: '1',
    clientId: '2',
    providerId: '1',
    rating: 5,
    comment: 'Excelente serviço, muito profissional',
    createdAt: new Date().toISOString()
  }
]

// Helper functions
export function getCurrentUser(): User | null {
  // Simula um usuário logado
  return users[0]
}

export function getProviderProfile(userId: string): Provider | null {
  return providers.find(p => p.userId === userId) || null
}

export function getProviderServices(providerId: string): ServiceListing[] {
  return services.filter(s => s.providerId === providerId)
}

export function getProviderBookings(providerId: string): Booking[] {
  return bookings.filter(b => b.providerId === providerId)
}

export function getProviderReviews(providerId: string): Review[] {
  return reviews.filter(r => r.providerId === providerId)
}