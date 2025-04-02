"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Rotate3D, Award, Box, Check } from "lucide-react"
import Navbar from "@/components/navbar"
import Bottle3DViewer from "@/components/bottle-3d-viewer"
import { useLanguage } from "@/i18n/language-context"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

export default function StorePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const { addItem } = useCart()
  const { toast } = useToast()

  const products = [
    {
      id: 1,
      name: "Morro Azul Reserva Especial",
      price: 159.9,
      oldPrice: 189.9,
      description: "Envelhecida 3 anos em barris de carvalho francês, apresenta notas de baunilha e especiarias.",
      image: "/placeholder.svg?height=400&width=200",
      badge: "Mais Vendida",
    },
    {
      id: 2,
      name: "Morro Azul Premium",
      price: 99.9,
      description: "Suave e cristalina, ideal para coquetéis sofisticados com notas cítricas e frescas.",
      image: "/placeholder.svg?height=400&width=200",
    },
    {
      id: 3,
      name: "Morro Azul Extra Premium",
      price: 199.9,
      description: "Envelhecida 5 anos em barris de amburana, com notas de canela e frutas secas.",
      image: "/placeholder.svg?height=400&width=200",
      badge: "Edição Limitada",
    },
    {
      id: 4,
      name: "Kit Degustação Morro Azul",
      price: 349.9,
      description: "Quatro mini garrafas de nossas cachaças premiadas com copos exclusivos.",
      image: "/placeholder.svg?height=400&width=200",
      badge: "Kit Experiência",
    },
  ]

  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [showViewer, setShowViewer] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
    })

    setAddedToCart(true)

    toast({
      title: t("addedToCart"),
      description: selectedProduct.name,
      action: (
        <Button variant="outline" size="sm" className="border-green-600 text-green-600">
          <Check className="h-4 w-4 mr-1" /> {t("success")}
        </Button>
      ),
    })

    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
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
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-amber-300">{t("storeTitle")}</h1>
            <p className="font-montserrat text-neutral-300 max-w-2xl mx-auto">{t("storeDesc")}</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            <div className="w-full lg:w-1/2">
              {showViewer ? (
                <div className="bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-amber-900/30 p-4 h-[500px] relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-neutral-400 z-10"
                    onClick={() => setShowViewer(false)}
                  >
                    {t("back")}
                  </Button>
                  <Bottle3DViewer />
                </div>
              ) : (
                <div
                  ref={containerRef}
                  className="bg-gradient-to-b from-neutral-800/40 to-black/40 backdrop-blur-md rounded-2xl border border-amber-900/30 p-8 flex items-center justify-center h-[500px] relative"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute -inset-10 bg-amber-500/10 rounded-full blur-2xl" />
                    <Image
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      width={200}
                      height={400}
                      className="h-[400px] object-contain drop-shadow-2xl z-10 relative"
                    />
                    {selectedProduct.badge && (
                      <Badge className="absolute top-0 right-0 bg-amber-600 hover:bg-amber-600">
                        {selectedProduct.badge}
                      </Badge>
                    )}
                  </motion.div>

                  <Button
                    className="absolute bottom-4 right-4 bg-amber-700 hover:bg-amber-800"
                    onClick={() => setShowViewer(true)}
                  >
                    <Rotate3D className="mr-2 h-4 w-4" />
                    {t("viewIn3d")}
                  </Button>
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/2">
              <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="font-playfair text-3xl font-bold text-amber-300">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">R$ {selectedProduct.price.toFixed(2)}</span>
                        {selectedProduct.oldPrice && (
                          <span className="text-neutral-400 line-through ml-2">
                            R$ {selectedProduct.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {selectedProduct.badge && (
                        <Badge className="bg-amber-600 hover:bg-amber-600">{selectedProduct.badge}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-amber-500" />
                    <span className="text-xs ml-1 text-amber-400">Premiada</span>
                  </div>
                </div>

                <p className="text-neutral-300 mb-6">{selectedProduct.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-neutral-800/50 rounded-lg p-3 flex items-center gap-3">
                    <div className="rounded-full bg-amber-900/50 p-2">
                      <Box className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{t("freeShipping")}</h4>
                      <p className="text-xs text-neutral-400">Para todo Brasil</p>
                    </div>
                  </div>
                  <div className="bg-neutral-800/50 rounded-lg p-3 flex items-center gap-3">
                    <div className="rounded-full bg-amber-900/50 p-2">
                      <Award className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{t("qualityGuarantee")}</h4>
                      <p className="text-xs text-neutral-400">{t("satisfaction")}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    className={`w-full h-12 text-base ${
                      addedToCart ? "bg-green-600 hover:bg-green-700" : "bg-amber-600 hover:bg-amber-700"
                    }`}
                    onClick={handleAddToCart}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        {t("addedToCart")}
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {t("addToCart")}
                      </>
                    )}
                  </Button>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-amber-900/50 text-amber-300 hover:bg-amber-900/20"
                    >
                      {t("buyWithPix")}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-amber-900/50 text-amber-300 hover:bg-amber-900/20"
                    >
                      {t("buyWithCard")}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`cursor-pointer rounded-lg overflow-hidden border transition-all ${
                      selectedProduct.id === product.id
                        ? "border-amber-500 bg-amber-900/20"
                        : "border-transparent hover:border-amber-700/50 bg-neutral-800/30"
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="p-2 h-24 flex items-center justify-center">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={40}
                        height={80}
                        className="h-20 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

