"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { categories } from "./data"
import { useRouter } from "next/navigation"

const ITEMS_PER_PAGE = 6

export default function CategoriesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE)
  const router = useRouter()
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCategories = categories.slice(startIndex, endIndex)

  const handleViewProviders = (categoryName: string) => {
    router.push(`/providers?category=${encodeURIComponent(categoryName)}`)
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Categorias de Serviços</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentCategories.map((category) => (
          <Card key={category.name} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={category.icon}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <Button 
                className="w-full"
                onClick={() => handleViewProviders(category.name)}
              >
                Ver Profissionais
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              className="w-10 h-10 p-0"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          Próximo
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}