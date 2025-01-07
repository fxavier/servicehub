"use client"

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Send } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Mock data for messages
const mockConversations = [
  {
    id: '1',
    client: { email: 'client@example.com' },
    messages: [
      {
        id: '1',
        content: 'Olá, gostaria de saber mais sobre seus serviços',
        sender_id: 'client',
        created_at: new Date().toISOString()
      }
    ]
  }
]

export default function MessagesPage() {
  const [conversations, setConversations] = useState(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular delay de rede
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedConversation || !newMessage.trim()) return

    const newMsg = {
      id: Date.now().toString(),
      content: newMessage,
      sender_id: 'provider',
      created_at: new Date().toISOString()
    }

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          messages: [...conv.messages, newMsg]
        }
      }
      return conv
    }))

    setNewMessage('')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <Card className="p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Conversas</h2>
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-3 text-left rounded-lg hover:bg-secondary
                  ${selectedConversation === conversation.id ? 'bg-secondary' : ''}`}
              >
                <p className="font-medium">{conversation.client.email}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.messages[0]?.content || 'Sem mensagens'}
                </p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="md:col-span-2 p-4 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="flex-1 overflow-y-auto mb-4">
                {conversations
                  .find(c => c.id === selectedConversation)
                  ?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 ${
                        message.sender_id === 'provider' ? 'text-right' : ''
                      }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg
                          ${message.sender_id === 'provider'
                            ? 'bg-primary text-white'
                            : 'bg-secondary'
                          }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs opacity-70">
                          {format(new Date(message.created_at), 'p', { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Selecione uma conversa para começar a mensagem
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}