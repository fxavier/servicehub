"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Básico",
    price: 1000,
    period: "mês",
    popular: true,
    features: [
      "Até 10 listagens de serviços",
      "Personalização básica de perfil",
      "Suporte por email",
      "Visibilidade padrão nas buscas",
      "Mensagens com clientes"
    ]
  },
  {
    name: "Profissional",
    price: 2000,
    period: "mês",
    recommended: true,
    features: [
      "Até 50 listagens de serviços",
      "Personalização avançada de perfil",
      "Suporte prioritário",
      "Visibilidade aumentada nas buscas",
      "Mensagens com clientes",
      "Painel de análises",
      "Calendário personalizado"
    ]
  },
  {
    name: "Empresarial",
    price: 5000,
    period: "mês",
    features: [
      "Listagens ilimitadas de serviços",
      "Personalização completa de perfil",
      "Suporte 24/7 prioritário",
      "Máxima visibilidade nas buscas",
      "Mensagens com clientes",
      "Análises avançadas",
      "Marca personalizada",
      "Acesso à API",
      "Múltiplos membros da equipe"
    ]
  }
]

export default function SubscriptionPlansPage() {
  return (
    <div className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Escolha Seu Plano</h1>
        <p className="text-xl text-muted-foreground">
          Selecione o plano perfeito para expandir seu negócio de serviços
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`p-8 relative ${plan.recommended ? 'border-primary border-2 shadow-lg scale-105' : ''}`}
          >
            {plan.recommended && (
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium absolute -top-3 left-1/2 -translate-x-1/2">
                Recomendado
              </span>
            )}
            {plan.popular && (
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium absolute -top-3 left-1/2 -translate-x-1/2">
                Mais Popular
              </span>
            )}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <div className="mb-4">
                <span className="text-4xl font-bold">MT{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className={`w-full ${plan.recommended ? 'bg-primary hover:bg-primary/90' : ''}`}
            >
              Selecionar Plano {plan.name}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}