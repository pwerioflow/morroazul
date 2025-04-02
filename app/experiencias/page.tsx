"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronRight, GlassWater, Sparkles, Utensils, Volume2, VolumeX } from "lucide-react"
import Navbar from "@/components/navbar"
import RecipeCard from "@/components/recipe-card"

export default function ExperienciasPage() {
  const [playingSound, setPlayingSound] = useState(false)

  const toggleSound = () => {
    setPlayingSound(!playingSound)
  }

  const recipes = [
    {
      name: "Caipirinha",
      ingredients: ["2 doses de cachaça", "1 limão de casca fina", "2 colheres (chá) de açúcar", "Gelo picado"],
      instructions:
        "Retire as pontas e corte o limão em rodelas finas. Coloque o limão e o açúcar em um copo pequeno e com um socador de madeira, pressione apenas o centro da fruta, sem forçar a casca. Isso evita que o drink fique amargo. Acrescente a cachaça, misture e complete com gelo picado. Sirva em copo decorado com uma fatia de limão.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Garota de Ipanema",
      ingredients: ["2 doses de cachaça", "1 dose de licor de cacau", "1 colher de creme de amendoim", "Gelo picado"],
      instructions: "Bater os ingredientes numa coqueteleira e enfeitar com amendoim picado.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Banana Brasil",
      ingredients: [
        "2 doses de cachaça",
        "1 dose de licor de banana",
        "1 rodela de banana",
        "1 colher (chá) de açúcar",
        "Gelo picado",
      ],
      instructions: "Misturar todos os ingredientes numa coqueteleira e enfeitar o copo com rodelas de banana.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Copacabana",
      ingredients: ["1 1/2 dose de cachaça", "1 dose de Cherry", "2 1/2 doses de club soda"],
      instructions:
        "Coloque todos os ingredientes numa coqueteleira e misture bem. Encha o restante do copo com cubos de gelo.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const tastingQuestions = [
    {
      question: "Quais aromas você prefere?",
      options: ["Frutado", "Floral", "Amadeirado", "Herbáceo"],
    },
    {
      question: "Qual intensidade você gosta?",
      options: ["Suave", "Médio", "Intenso", "Muito Intenso"],
    },
    {
      question: "Como prefere apreciar bebidas destiladas?",
      options: ["Pura", "Com gelo", "Em coquetéis", "Com alimentos"],
    },
  ]

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [recommendation, setRecommendation] = useState<string | null>(null)

  const handleAnswerSelection = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answer
    setAnswers(newAnswers)

    if (currentQuestionIndex < tastingQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Generate recommendation based on answers
      const recommendations = [
        "Nossa cachaça Reserva Especial 5 anos, com notas de baunilha e carvalho.",
        "Nossa cachaça Premium, leve e com aroma frutado, perfeita para coquetéis.",
        "Nossa cachaça Extra Premium, encorpada com notas de especiarias.",
        "Nossa cachaça Única, envelhecida em barris de amburana com notas complexas.",
      ]
      const randomIndex = Math.floor(Math.random() * recommendations.length)
      setRecommendation(recommendations[randomIndex])
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    setRecommendation(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-amber-300">
              Experiências Sensoriais
            </h1>
            <p className="font-montserrat text-neutral-300 max-w-2xl mx-auto">
              Descubra novos sabores e aromas, aprenda sobre a degustação e aprofunde sua conexão com a cachaça
              artesanal.
            </p>
          </motion.div>

          <Tabs defaultValue="degustation" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-neutral-800">
              <TabsTrigger value="degustation" className="data-[state=active]:bg-amber-800">
                <GlassWater className="mr-2 h-4 w-4" />
                Degustação Guiada
              </TabsTrigger>
              <TabsTrigger value="recipes" className="data-[state=active]:bg-amber-800">
                <Utensils className="mr-2 h-4 w-4" />
                Receitas & Mixologia
              </TabsTrigger>
              <TabsTrigger value="sensorial" className="data-[state=active]:bg-amber-800">
                <Sparkles className="mr-2 h-4 w-4" />
                Modo Experiência
              </TabsTrigger>
            </TabsList>

            <TabsContent value="degustation" className="mt-6">
              <Card className="border-amber-900/50 bg-neutral-800/50 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-amber-300">Degustação Guiada por IA</CardTitle>
                  <CardDescription>
                    Responda algumas perguntas para descobrir qual cachaça combina com seu perfil de gosto.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recommendation ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                      <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GlassWater className="h-10 w-10 text-amber-400" />
                      </div>
                      <h3 className="text-2xl font-playfair font-bold mb-3">Sua Recomendação Personalizada</h3>
                      <p className="text-lg text-neutral-200 mb-6">{recommendation}</p>
                      <Button onClick={resetQuiz} className="bg-amber-700 hover:bg-amber-800">
                        Recomeçar
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="py-4">
                      <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6"
                      >
                        <h3 className="text-xl font-playfair font-semibold mb-4">
                          {tastingQuestions[currentQuestionIndex].question}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {tastingQuestions[currentQuestionIndex].options.map((option, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              className={`border-amber-700/50 hover:bg-amber-900/30 h-auto py-3 ${
                                answers[currentQuestionIndex] === option ? "bg-amber-900/50 border-amber-500" : ""
                              }`}
                              onClick={() => handleAnswerSelection(option)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-neutral-400">
                          Pergunta {currentQuestionIndex + 1} de {tastingQuestions.length}
                        </div>
                        <div className="flex gap-1">
                          {tastingQuestions.map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-1.5 w-5 rounded-full ${
                                idx === currentQuestionIndex
                                  ? "bg-amber-500"
                                  : idx < currentQuestionIndex
                                    ? "bg-amber-800"
                                    : "bg-neutral-700"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recipes" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recipes.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sensorial" className="mt-6">
              <Card className="border-amber-900/50 bg-neutral-800/50 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-amber-300">Experiência Sensorial</CardTitle>
                  <CardDescription>
                    Crie um ambiente perfeito para apreciar sua cachaça premium com sons e sugestões visuais.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="bg-black/50 rounded-lg p-4 mb-4">
                        <h3 className="font-medium text-lg mb-2 text-amber-300">Ambiente Sonoro</h3>
                        <p className="text-sm text-neutral-300 mb-4">
                          Os sons naturais ajudam a destacar as notas sensoriais da cachaça.
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4">
                            <Button variant="outline" size="sm" className="border-amber-700/50 hover:bg-amber-900/30">
                              Fazenda
                            </Button>
                            <Button variant="outline" size="sm" className="border-amber-700/50 hover:bg-amber-900/30">
                              Destilaria
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon" className="text-amber-300" onClick={toggleSound}>
                            {playingSound ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                          </Button>
                        </div>
                      </div>

                      <div className="bg-black/50 rounded-lg p-4">
                        <h3 className="font-medium text-lg mb-2 text-amber-300">Guia de Degustação</h3>
                        <ol className="space-y-3 text-sm text-neutral-300 ml-5 list-decimal">
                          <li>Observe a coloração e transparência da cachaça em um copo tulipa.</li>
                          <li>Aproxime o nariz do copo e inspire lentamente para captar os aromas.</li>
                          <li>Tome um pequeno gole e deixe o líquido percorrer toda a sua boca.</li>
                          <li>Perceba os sabores que surgem ao longo da degustação.</li>
                          <li>Aprecie o final longo e as sensações persistentes.</li>
                        </ol>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="bg-black/50 rounded-lg overflow-hidden">
                        <div className="relative aspect-video">
                          <Image
                            src="/placeholder.svg?height=240&width=400"
                            alt="Degustação de Cachaça"
                            width={400}
                            height={240}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                            <div className="p-4">
                              <h3 className="font-medium text-amber-300 mb-1">Masterclass Premium</h3>
                              <p className="text-sm text-neutral-300">
                                Aprenda técnicas avançadas de degustação com nosso mestre destilador.
                              </p>
                              <Button variant="link" className="text-amber-400 p-0 h-auto mt-2 flex items-center">
                                Assista agora <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

