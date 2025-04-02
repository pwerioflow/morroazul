"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { useLanguage } from "@/i18n/language-context"

export default function SuccessPage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-neutral-800/50 backdrop-blur-md rounded-xl border border-amber-900/30 p-8 text-center"
        >
          <div className="bg-green-600/20 rounded-full p-4 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <h1 className="text-2xl font-playfair font-bold mb-4 text-amber-300">{t("authenticProduct")}</h1>

          <p className="text-neutral-300 mb-6">{t("congratsOriginal")}</p>

          <div className="space-y-4">
            <div className="bg-neutral-700/50 rounded-lg p-4">
              <h3 className="font-medium text-amber-300 mb-2">Morro Azul Premium</h3>
              <div className="flex justify-between border-b border-neutral-700 pb-2 mb-2">
                <span className="text-neutral-400">Lote</span>
                <span className="font-medium">LT-2023-045</span>
              </div>
              <div className="flex justify-between border-b border-neutral-700 pb-2 mb-2">
                <span className="text-neutral-400">Data de Produção</span>
                <span className="font-medium">10/05/2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Origem</span>
                <span className="font-medium">Minas Gerais</span>
              </div>
            </div>

            <Button onClick={() => router.push("/loja")} className="w-full bg-amber-700 hover:bg-amber-800">
              {t("buyNow")}
            </Button>

            <Button
              variant="outline"
              className="w-full border-amber-900/50 text-amber-300 hover:bg-amber-900/20"
              onClick={() => router.push("/autenticidade")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("scanAnotherProduct")}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

