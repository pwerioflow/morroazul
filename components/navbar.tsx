"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { CartButton } from "@/components/cart"
import { useLanguage } from "@/i18n/language-context"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const { theme } = useTheme()

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("history"), href: "/historia" },
    { label: t("store"), href: "/loja" },
    { label: t("experiences"), href: "/experiencias" },
    { label: t("vipClub"), href: "/clube-vip" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? theme === "dark"
              ? "bg-black/80 backdrop-blur-md py-2"
              : "bg-white/80 backdrop-blur-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="font-playfair text-2xl text-amber-300 font-bold">
            MORRO AZUL
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`relative font-montserrat text-sm hover:text-amber-300 transition-colors duration-300 ${
                  pathname === item.href ? "text-amber-300" : "text-foreground"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-amber-500"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ModeToggle />
            <CartButton />
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-40 md:hidden ${theme === "dark" ? "bg-black" : "bg-white"}`}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4">
                <Link href="/" className="font-playfair text-2xl text-amber-300 font-bold">
                  MORRO AZUL
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-foreground">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={item.href}
                      className={`font-montserrat text-xl ${
                        pathname === item.href ? "text-amber-300" : "text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

