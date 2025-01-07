"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterInput } from "@/lib/validations/auth"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { users } from '@/lib/data'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true)
    setError(null)

    try {
      // Verificar se o email já existe
      const existingUser = users.find(u => u.email === data.email)
      if (existingUser) {
        throw new Error("Este email já está em uso")
      }

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Em um caso real, aqui você salvaria o usuário no backend
      
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Criar uma Conta</h1>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Já tem uma conta?{' '}
              <Link href="/auth/login" className="text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}