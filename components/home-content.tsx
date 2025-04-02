"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { QrCode, Store, BookOpen, MapPin } from "lucide-react"
import Navbar from "@/components/navbar"
import BottleParallax from "@/components/bottle-parallax"
import { useLanguage } from "@/i18n/language-context"

export default function HomeContent() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white overflow-hidden">
      <Navbar />

      <section className="relative h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4 text-amber-300">
            Morro Azul <span className="text-white">Premium</span>
          </h1>
          <p className="font-montserrat text-lg md:text-xl mb-8 max-w-2xl mx-auto text-neutral-300">{t("tagline")}</p>
        </motion.div>

        <BottleParallax scrollY={scrollY} />

        <div className="absolute bottom-10 w-full max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <BookOpen className="h-6 w-6" />, label: t("history"), href: "/historia" },
              { icon: <QrCode className="h-6 w-6" />, label: t("authenticity"), href: "/autenticidade" },
              { icon: <Store className="h-6 w-6" />, label: t("store"), href: "/loja" },
              { icon: <MapPin className="h-6 w-6" />, label: t("distributors"), href: "/distribuidores" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <div className="bg-neutral-800/70 backdrop-blur-md rounded-xl p-4 hover:bg-neutral-700/70 transition-all duration-300 text-center">
                  <div className="text-amber-500 mb-2 flex justify-center">{item.icon}</div>
                  <p className="font-montserrat text-sm">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

