"use client"

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { getCurrentUser, getProviderProfile, getProviderBookings, getProviderServices } from '@/lib/data'

interface DashboardStats {
  totalBookings: number
  activeListings: number
  averageRating: number
  totalEarnings: number
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    activeListings: 0,
    averageRating: 0,
    totalEarnings: 0
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = getCurrentUser()
        if (!user) return

        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000))

        const profile = getProviderProfile(user.id)
        if (profile) {
          const bookings = getProviderBookings(profile.id)
          const services = getProviderServices(profile.id)

          setStats({
            totalBookings: bookings.length,
            activeListings: services.filter(s => s.active).length,
            averageRating: 4.5, // Valor mockado
            totalEarnings: bookings.reduce((sum, b) => sum + b.price, 0)
          })
        }
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/dashboard/services/new">
          <Button>Adicionar Novo Serviço</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Total de Reservas
          </h3>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Serviços Ativos
          </h3>
          <p className="text-2xl font-bold">{stats.activeListings}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Avaliação Média
          </h3>
          <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Ganhos Totais
          </h3>
          <p className="text-2xl font-bold">MT{stats.totalEarnings.toFixed(2)}</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Reservas Recentes</h2>
          <div className="text-muted-foreground text-center py-8">
            Nenhuma reserva recente
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Avaliações Recentes</h2>
          <div className="text-muted-foreground text-center py-8">
            Nenhuma avaliação recente
          </div>
        </Card>
      </div>
    </div>
  )
}