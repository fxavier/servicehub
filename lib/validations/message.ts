import * as z from "zod"

export const messageSchema = z.object({
  conversationId: z.string().uuid("ID da conversa inválido"),
  content: z.string().min(1, "Mensagem não pode estar vazia").max(1000, "Mensagem muito longa")
})

export type MessageInput = z.infer<typeof messageSchema>