import * as z from "zod"

export const providerSchema = z.object({
  fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Telefone inválido"),
  serviceCategory: z.string().min(1, "Selecione uma categoria"),
  experienceYears: z.number().min(0, "Anos de experiência inválidos"),
  description: z.string().min(50, "Descreva seus serviços em pelo menos 50 caracteres")
})

export const serviceSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  description: z.string().min(50, "Descreva o serviço em pelo menos 50 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  price: z.number().positive("Preço deve ser maior que zero"),
  priceType: z.enum(["fixed", "hourly", "quote"], {
    required_error: "Selecione um tipo de preço"
  }),
  location: z.string().min(3, "Localização é obrigatória")
})

export type ProviderInput = z.infer<typeof providerSchema>
export type ServiceInput = z.infer<typeof serviceSchema>