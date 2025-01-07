"use client"

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getCurrentUser, getProviderBookings } from '@/lib/data'
import type { Booking } from '@/lib/data'

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = getCurrentUser()
        if (!user) return

        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000))

        const bookingsData = getProviderBookings(user.id)
        setBookings(bookingsData)
      } catch (error) {
        console.error('Erro ao buscar reservas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Reservas</h1>

      <div className="grid gap-6">
        {bookings.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Nenhuma reserva encontrada</p>
          </Card>
        ) : (
          bookings.map((booking) => (
            <Card key={booking.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Serviço #{booking.serviceId}</h3>
                  <p className="text-muted-foreground">Cliente #{booking.clientId}</p>
                  <p className="text-muted-foreground">
                    Data: {format(new Date(booking.dateTime), 'PPP p', { locale: ptBR })}
                  </p>
                  <p className="mt-2">Preço: MT{booking.price}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}