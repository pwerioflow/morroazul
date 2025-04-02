"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Navbar from "@/components/navbar"

export default function HistoryPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const timelineEvents = [
    {
      year: "1932",
      title: "Primeiras Plantações",
      description:
        "Início do cultivo de cana-de-açúcar nas terras de Minas Gerais, selecionando as melhores mudas para um produto de qualidade superior.",
      imageSrc: "/placeholder.svg?height=250&width=400",
    },
    {
      year: "1945",
      title: "Primeira Destilação",
      description:
        "Criação do primeiro alambique e início da produção artesanal, seguindo métodos tradicionais passados de geração em geração.",
      imageSrc: "/placeholder.svg?height=250&width=400",
    },
    {
      year: "1970",
      title: "Reconhecimento Regional",
      description:
        "A cachaça da fazenda começa a ganhar reconhecimento regional por sua qualidade excepcional e processo artesanal único.",
      imageSrc: "/placeholder.svg?height=250&width=400",
    },
    {
      year: "1998",
      title: "Modernização do Processo",
      description:
        "Investimento em tecnologia para aprimorar o processo sem perder a essência artesanal, garantindo qualidade consistente.",
      imageSrc: "/placeholder.svg?height=250&width=400",
    },
    {
      year: "2010",
      title: "Expansão Internacional",
      description:
        "Início das exportações para Europa e Ásia, levando a tradição da cachaça artesanal brasileira para o mercado global e conquistando admiradores internacionais.",
      imageSrc: "/placeholder.svg?height=250&width=400",
    },
    {
      year: "2023",
      title: "Premium Reserve",
      description:
        "Lançamento da linha premium, envelhecida em barris especiais, unindo tradição centenária com inovação para paladares exigentes.",
      imageSrc: "/placeholder.svg?height=250&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-amber-300">Nossa História</h1>
            <p className="font-montserrat text-neutral-300 max-w-2xl mx-auto">
              Uma tradição centenária que une técnicas artesanais e paixão pela cachaça de qualidade, transmitida
              através de gerações.
            </p>
          </motion.div>

          <div ref={containerRef} className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-800/60 -translate-x-1/2" />

            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`relative mb-24 flex ${isEven ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className="w-1/2 px-8">
                    <div className={`${isEven ? "text-right" : "text-left"}`}>
                      <div className="inline-block bg-amber-900/40 px-4 py-1 rounded-lg mb-2">
                        <span className="font-playfair text-2xl font-bold text-amber-300">{event.year}</span>
                      </div>
                      <h3 className="font-playfair text-xl md:text-2xl font-bold mb-3">{event.title}</h3>
                      <p className="text-neutral-300 text-sm md:text-base">{event.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-amber-500 z-10">
                    <div className="absolute w-3 h-3 rounded-full bg-amber-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>

                  <div className="w-1/2 px-8">
                    <div
                      className={`overflow-hidden rounded-lg shadow-lg border border-amber-900/40 ${
                        isEven ? "transform translate-x-4" : "transform -translate-x-4"
                      }`}
                    >
                      <Image
                        src={event.imageSrc || "/placeholder.svg"}
                        alt={event.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="max-w-4xl mx-auto mt-24 px-4">
            <div className="bg-neutral-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-amber-900/30">
              <div className="relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=540&width=960"
                    alt="Vídeo da produção artesanal"
                    width={960}
                    height={540}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <Button
                    size="lg"
                    className="absolute rounded-full bg-amber-500 hover:bg-amber-600 w-16 h-16 flex items-center justify-center"
                  >
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4 text-amber-300">
                  Tradição em Movimento
                </h2>
                <p className="text-neutral-300 mb-4">
                  Conheça o processo artesanal que transforma a cana-de-açúcar cultivada em nossas terras na cachaça
                  premium que conquistou paladares pelo mundo.
                </p>
                <p className="text-neutral-300">
                  Nossos mestres destiladores preservam técnicas centenárias, combinando-as com inovações cuidadosamente
                  selecionadas para garantir um produto de qualidade excepcional, respeitando a tradição e o meio
                  ambiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

