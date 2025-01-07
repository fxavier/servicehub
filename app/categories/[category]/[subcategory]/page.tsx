"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Importar as categorias do arquivo principal
import { categories } from "../../data"

export default function SubcategoryPage({
  params
}: {
  params: { category: string, subcategory: string }
}) {
  // Decodificar os parâmetros da URL
  const decodedCategory = decodeURIComponent(params.category)
  const decodedSubcategory = decodeURIComponent(params.subcategory)

  // Encontrar a categoria
  const category = categories.find(
    cat => cat.name.toLowerCase().replace(/ & /g, "-") === decodedCategory
  )

  // Verificar se a categoria e subcategoria existem
  if (!category || !category.subcategories.find(
    sub => sub.toLowerCase() === decodedSubcategory
  )) {
    notFound()
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/categories">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Voltar para Categorias
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">{decodedSubcategory}</h1>
        <p className="text-muted-foreground">
          Encontre os melhores profissionais em {decodedSubcategory} dentro da categoria {category.name}
        </p>
      </div>

      <Card className="p-8 text-center">
        <p className="text-muted-foreground mb-4">
          Em breve você encontrará aqui os melhores prestadores de serviço para {decodedSubcategory}.
        </p>
        <Button>Cadastre-se como Profissional</Button>
      </Card>
    </div>
  )
}