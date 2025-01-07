"use client"

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Star } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getCurrentUser, getProviderReviews } from '@/lib/data'
import type { Review } from '@/lib/data'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const user = getCurrentUser()
        if (!user) return

        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000))

        const reviewsData = getProviderReviews(user.id)
        setReviews(reviewsData)
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ))
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Avaliações</h1>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Reserva #{review.bookingId}
                </h3>
                <p className="text-muted-foreground">
                  por Cliente #{review.clientId}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(review.rating)}
              </div>
            </div>
            <p className="mb-2">{review.comment}</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(review.createdAt), 'PPP', { locale: ptBR })}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}