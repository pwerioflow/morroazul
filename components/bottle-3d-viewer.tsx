"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { useLanguage } from "@/i18n/language-context"

export default function Bottle3DViewer() {
  const { t } = useLanguage()
  const [rotation, setRotation] = useState(0)

  const handleRotate = () => {
    setRotation((prev) => prev + 45)
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="relative flex-1 flex items-center justify-center">
        <div className="transition-transform duration-500" style={{ transform: `rotateY(${rotation}deg)` }}>
          <Image
            src="/placeholder.svg?height=500&width=250"
            alt="Garrafa de Morro Azul Premium"
            width={250}
            height={500}
            className="drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          className="border-amber-700/50 text-amber-300 hover:bg-amber-900/20"
          onClick={handleRotate}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          {t("rotateBottle")}
        </Button>
      </div>
    </div>
  )
}

