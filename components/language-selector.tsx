"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/i18n/language-context"

export function LanguageSelector() {
  const { locale, setLocale, t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-amber-300">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-neutral-800 border-amber-900/50">
        <DropdownMenuItem
          className={`${locale === "pt" ? "bg-amber-900/50 text-amber-300" : "text-white"} cursor-pointer`}
          onClick={() => {
            setLocale("pt")
            setOpen(false)
          }}
        >
          {t("portuguese")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${locale === "en" ? "bg-amber-900/50 text-amber-300" : "text-white"} cursor-pointer`}
          onClick={() => {
            setLocale("en")
            setOpen(false)
          }}
        >
          {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${locale === "es" ? "bg-amber-900/50 text-amber-300" : "text-white"} cursor-pointer`}
          onClick={() => {
            setLocale("es")
            setOpen(false)
          }}
        >
          {t("spanish")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

