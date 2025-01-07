"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "@/lib/validations/auth"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { users } from '@/lib/data'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data: LoginInput) => {
    setLoading(true)
    setError(null)

    try {
      // Simular autenticação
      const user = users.find(u => u.email === data.email)
      if (!user) throw new Error("Credenciais inválidas")

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000))

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
          <h1 className="text-2xl font-bold mb-6">Login no ServiceHub</h1>
          
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

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Não tem uma conta?{' '}
              <Link href="/auth/register" className="text-primary hover:underline">
                Registre-se
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}