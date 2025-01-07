"use client"

import { Button } from "@/components/ui/button"
import { Menu, Bell, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#f18701]">ServiceHub</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/categories" className="text-sm font-medium hover:text-[#f18701] transition-colors">
              Categorias
            </Link>
            <Link href="/providers" className="text-sm font-medium hover:text-[#f18701] transition-colors">
              Encontrar Profissionais
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:text-[#f18701] transition-colors">
              Como Funciona
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#f18701]" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/become-provider">
            <Button className="hidden md:flex bg-[#f18701] hover:bg-[#f18701]/90">
              Seja um Profissional
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.push('/auth/login')}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
          <nav className="flex flex-col gap-4">
            <Link href="/categories" className="text-sm font-medium">Categorias</Link>
            <Link href="/providers" className="text-sm font-medium">Encontrar Profissionais</Link>
            <Link href="/how-it-works" className="text-sm font-medium">Como Funciona</Link>
            <Link href="/become-provider">
              <Button className="w-full bg-[#f18701] hover:bg-[#f18701]/90">
                Seja um Profissional
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}