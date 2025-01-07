"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Shield, Wallet, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { providerSchema, type ProviderInput } from "@/lib/validations/provider"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const benefits = [
  {
    icon: Star,
    title: "Construa Sua Reputação",
    description: "Ganhe avaliações e classificações para mostrar sua experiência e construir confiança com potenciais clientes."
  },
  {
    icon: Shield,
    title: "Pagamentos Seguros",
    description: "Receba pagamentos com segurança através da nossa plataforma com proteção para você e seus clientes."
  },
  {
    icon: Wallet,
    title: "Defina Suas Taxas",
    description: "Você tem o controle. Defina seus próprios preços e disponibilidade que funcionem com sua agenda."
  },
  {
    icon: Users,
    title: "Comunidade Crescente",
    description: "Junte-se a um mercado próspero de prestadores de serviços e conecte-se com novos clientes."
  }
]

export default function BecomeProviderPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProviderInput>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      serviceCategory: "",
      experienceYears: 0,
      description: ""
    }
  })

  const onSubmit = async (data: ProviderInput) => {
    setIsSubmitting(true)
    
    try {
      // Aqui você normalmente enviaria os dados para o backend
      console.log(data)
      
      // Simular chamada API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirecionar para planos de assinatura
      router.push("/subscription-plans")
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Torne-se um Prestador de Serviços</h1>
          <p className="text-xl text-muted-foreground">
            Junte-se à nossa plataforma e expanda seu negócio com acesso a mais clientes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Por que se juntar ao ServiceHub?</h2>
            <div className="grid gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Comece Agora</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Digite seu nome completo" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="Digite seu email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" placeholder="Digite seu telefone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria de Serviço</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Selecione sua categoria de serviço" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experienceYears"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anos de Experiência</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number" 
                            placeholder="Anos de experiência"
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobre Seus Serviços</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            placeholder="Descreva seus serviços, experiência e o que te torna único"
                            className="h-32"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Cadastro"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}