"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceSchema, type ServiceInput } from "@/lib/validations/provider"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { getCurrentUser } from '@/lib/data'
import { categories } from '@/app/categories/data'

export default function NewServicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: 0,
      priceType: 'fixed',
      location: ''
    }
  })

  const onSubmit = async (data: ServiceInput) => {
    setLoading(true)

    try {
      const user = getCurrentUser()
      if (!user) throw new Error('Usuário não autenticado')

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Em um caso real, aqui você salvaria o serviço no backend
      console.log('Novo serviço:', data)

      router.push('/dashboard/services')
    } catch (error) {
      console.error('Erro ao criar serviço:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Criar Novo Serviço</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Serviço</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ex: Desenvolvimento Web Profissional" />
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Descreva seu serviço em detalhes"
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        onChange={e => field.onChange(Number(e.target.value))}
                        value={field.value}
                        placeholder="0.00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Preço</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fixed">Preço Fixo</SelectItem>
                        <SelectItem value="hourly">Por Hora</SelectItem>
                        <SelectItem value="quote">Sob Consulta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Local do serviço" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Criando..." : "Criar Serviço"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}