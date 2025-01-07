import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Calendar, MessageSquare, CreditCard } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "1. Encontre o Profissional Ideal",
    description: "Navegue por nossa extensa lista de prestadores de serviços verificados. Use filtros para refinar sua busca por localização, categoria, faixa de preço e avaliações."
  },
  {
    icon: Calendar,
    title: "2. Agende um Serviço",
    description: "Selecione um horário conveniente na agenda do prestador. Especifique seus requisitos e localização para o serviço."
  },
  {
    icon: MessageSquare,
    title: "3. Comunique os Detalhes",
    description: "Converse diretamente com o prestador através do nosso sistema seguro de mensagens. Discuta requisitos específicos, compartilhe fotos ou tire dúvidas."
  },
  {
    icon: CreditCard,
    title: "4. Pagamento Seguro",
    description: "Pague com segurança através da nossa plataforma. Os valores são mantidos em garantia até que o serviço seja concluído à sua satisfação."
  }
]

export default function HowItWorksPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Como o ServiceHub Funciona</h1>
        <p className="text-xl text-muted-foreground">
          Comece a usar o ServiceHub em apenas alguns passos simples
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        {steps.map((step, index) => (
          <Card key={index} className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-semibold mb-2">{step.title}</h2>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Pronto para Começar?</h2>
        <p className="text-muted-foreground mb-6">
          Junte-se a milhares de clientes satisfeitos que encontraram seu prestador de serviços ideal
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Encontrar um Profissional</Button>
          <Button size="lg" variant="outline">Tornar-se um Profissional</Button>
        </div>
      </div>
    </div>
  )
}