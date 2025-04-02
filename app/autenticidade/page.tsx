"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { QrScanner } from "@/components/qr-scanner"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { QrCode, CircleHelp, Blocks } from "lucide-react"
import Navbar from "@/components/navbar"

export default function AutenticidadePage() {
  const [scannedResult, setScannedResult] = useState<string | null>(null)
  const [productData, setProductData] = useState<any | null>(null)

  const handleScanSuccess = (result: string) => {
    setScannedResult(result)
    // Simular dados do produto baseado no QR code escaneado
    setProductData({
      name: "Cachaça Artesanal Premium",
      batch: "LT-2023-045",
      productionDate: "10/05/2023",
      origin: "Fazenda Bela Vista, Minas Gerais",
      distiller: "Mestre José Oliveira",
      verification: "Autenticado via Blockchain",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-amber-300 text-center">
            Verificação de Autenticidade
          </h1>
          <p className="font-montserrat text-center text-neutral-300 mb-12 max-w-2xl mx-auto">
            Garanta a autenticidade do seu produto premium escaneando o QR code presente no selo da garrafa
          </p>

          <Tabs defaultValue="scanner" className="max-w-xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-neutral-800">
              <TabsTrigger value="scanner" className="data-[state=active]:bg-amber-800">
                <QrCode className="mr-2 h-4 w-4" />
                Scanner
              </TabsTrigger>
              <TabsTrigger value="help" className="data-[state=active]:bg-amber-800">
                <CircleHelp className="mr-2 h-4 w-4" />
                Como Verificar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scanner">
              <Card className="border-amber-900/50 bg-neutral-800/50 backdrop-blur-md">
                <CardContent className="p-6">
                  {!scannedResult ? (
                    <div className="flex flex-col items-center">
                      <QrScanner onScanSuccess={handleScanSuccess} />
                      <p className="text-sm text-neutral-400 mt-4 text-center">
                        Posicione o QR code do selo dentro da área de escaneamento
                      </p>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="bg-green-800/20 border border-green-700 rounded-lg p-4 flex items-center gap-3">
                        <div className="bg-green-600 rounded-full p-1.5">
                          <Blocks className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-green-400">Produto Autêntico</h3>
                          <p className="text-sm text-neutral-300">Verificado na Blockchain</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-amber-300">Detalhes do Produto</h3>

                        {productData &&
                          Object.entries(productData).map(([key, value]: [string, any]) => (
                            <div key={key} className="flex justify-between border-b border-neutral-700 pb-2">
                              <span className="text-neutral-400 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                      </div>

                      <Button
                        onClick={() => {
                          setScannedResult(null)
                          setProductData(null)
                        }}
                        className="w-full bg-amber-700 hover:bg-amber-800"
                      >
                        Escanear Outro Produto
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="help">
              <Card className="border-amber-900/50 bg-neutral-800/50 backdrop-blur-md">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-amber-300">Como Verificar a Autenticidade</h3>
                    <p className="text-neutral-300 text-sm">
                      Cada garrafa da nossa cachaça artesanal premium possui um selo único com QR code que garante sua
                      autenticidade e rastreabilidade.
                    </p>
                  </div>

                  <ol className="space-y-4">
                    {[
                      "Localize o selo de autenticidade na parte superior da garrafa",
                      "Escaneie o QR code presente no selo utilizando este scanner",
                      "Os detalhes do lote e produção serão verificados em nossa blockchain",
                      "A confirmação de autenticidade será exibida na tela",
                    ].map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="bg-amber-800 text-white rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-neutral-300">{step}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-4 bg-amber-900/20 border border-amber-800/50 rounded-lg p-4">
                    <p className="text-sm text-amber-200">
                      Caso não consiga verificar a autenticidade ou tenha dúvidas, entre em contato com nosso serviço de
                      atendimento ao cliente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

