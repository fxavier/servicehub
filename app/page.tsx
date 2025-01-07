"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Star, Shield, Clock, TrendingUp } from "lucide-react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

export default function Home() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  const categories = [
    { name: "Serviços Domésticos", icon: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Beleza & Bem-estar", icon: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Negócios & Tecnologia", icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Criação & Design", icon: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=200&h=200" },
  ]

  const featuredProviders = [
    {
      name: "João Silva",
      title: "Eletricista Profissional",
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      name: "Sara Santos",
      title: "Designer de Interiores",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      name: "Miguel Costa",
      title: "Desenvolvedor Web",
      rating: 5.0,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Seção Hero */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80"
            alt="Imagem de fundo"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6">Encontre Profissionais Especializados</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Conecte-se com profissionais qualificados para todas as suas necessidades. Serviço de qualidade, satisfação garantida.
          </p>
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Qual serviço você precisa?"
                className="w-full pl-10 pr-4 py-3 rounded-lg text-black"
              />
            </div>
            <Button size="lg" className="bg-[#f18701] hover:bg-[#f18701]/90">
              Buscar
            </Button>
          </div>
        </div>
      </section>

      {/* Seção de Categorias */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Categorias Populares</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent>
              {categories.map((category) => (
                <CarouselItem key={category.name} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={category.icon}
                        alt={category.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold group-hover:text-[#f18701] transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Seção de Profissionais em Destaque */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Profissionais Mais Bem Avaliados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProviders.map((provider) => (
              <Card key={provider.name} className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={provider.image}
                      alt={provider.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{provider.name}</h3>
                      <p className="text-sm text-gray-600">{provider.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{provider.rating}</span>
                    <span className="text-gray-600">({provider.reviews} avaliações)</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Recursos */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Por que Escolher o ServiceHub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f18701]/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#f18701]" />
              </div>
              <h3 className="font-semibold mb-2">Profissionais Verificados</h3>
              <p className="text-gray-600">Todos os prestadores de serviços são cuidadosamente verificados</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f18701]/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-[#f18701]" />
              </div>
              <h3 className="font-semibold mb-2">Serviço de Qualidade</h3>
              <p className="text-gray-600">Serviços consistentemente bem avaliados por profissionais qualificados</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f18701]/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#f18701]" />
              </div>
              <h3 className="font-semibold mb-2">Agendamento Rápido</h3>
              <p className="text-gray-600">Agendamento fácil e confirmação instantânea</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f18701]/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-[#f18701]" />
              </div>
              <h3 className="font-semibold mb-2">Pagamentos Seguros</h3>
              <p className="text-gray-600">Transações protegidas com serviço de garantia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}