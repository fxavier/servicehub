"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ServiceHub</h3>
            <p className="text-muted-foreground mb-4">
              Conectando profissionais qualificados com clientes que precisam de seus serviços.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Para Profissionais</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Cadastre-se como Profissional
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Histórias de Sucesso
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Recursos para Profissionais
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Diretrizes para Profissionais
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Para Clientes</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Segurança & Confiança
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Suporte ao Cliente
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-[#f18701]">
                  Resolução de Disputas
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ServiceHub. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}