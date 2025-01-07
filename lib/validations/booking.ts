import * as z from "zod"

export const bookingSchema = z.object({
  serviceId: z.string().uuid("ID do serviço inválido"),
  date: z.date({
    required_error: "Selecione uma data"
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Horário inválido"),
  notes: z.string().optional()
})

export const reviewSchema = z.object({
  bookingId: z.string().uuid("ID da reserva inválido"),
  rating: z.number().min(1).max(5, "Avaliação deve ser entre 1 e 5"),
  comment: z.string().min(10, "Comentário deve ter pelo menos 10 caracteres")
})

export type BookingInput = z.infer<typeof bookingSchema>
export type ReviewInput = z.infer<typeof reviewSchema>