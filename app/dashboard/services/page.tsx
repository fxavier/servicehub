"use client"

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { getCurrentUser, getProviderServices } from '@/lib/data'
import type { ServiceListing } from '@/lib/data'

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const user = getCurrentUser()
        if (!user) return

        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000))

        const servicesData = getProviderServices(user.id)
        setServices(servicesData)
      } catch (error) {
        console.error('Erro ao buscar serviços:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meus Serviços</h1>
        <Link href="/dashboard/services/new">
          <Button>Adicionar Novo Serviço</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {services.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Você ainda não adicionou nenhum serviço
            </p>
            <Link href="/dashboard/services/new">
              <Button>Adicione Seu Primeiro Serviço</Button>
            </Link>
          </Card>
        ) : (
          services.map((service) => (
            <Card key={service.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.category}</p>
                  <p className="mt-2">
                    MT{service.price} / {service.priceType}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/services/${service.id}/edit`}>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}