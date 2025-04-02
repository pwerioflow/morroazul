"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Scan } from "lucide-react"
import { useLanguage } from "@/i18n/language-context"
import { useRouter } from "next/navigation"

interface QrScannerProps {
  onScanSuccess: (result: string) => void
}

export function QrScanner({ onScanSuccess }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasCamera, setHasCamera] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    // Check if browser supports getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setHasCamera(true)
    } else {
      setError("Seu navegador não suporta acesso à câmera")
    }

    // Clean up function to stop camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  const startScanner = () => {
    // Simulate a successful scan immediately
    setIsScanning(true)

    // Simulate a delay for scanning
    setTimeout(() => {
      // Simulate a successful scan
      const mockQrCodeData = "CACHACA-PREMIUM-2023-BATCH-045-AUTHENTIC"
      onScanSuccess(mockQrCodeData)

      setIsScanning(false)

      // Navigate to success page
      router.push("/autenticidade/sucesso")
    }, 2000)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden bg-black mb-4">
        {isScanning ? (
          <>
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 border-2 border-amber-500 rounded-lg relative">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-amber-500" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-amber-500" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-amber-500" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-amber-500" />
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-amber-500 animate-pulse w-6 h-6 rounded-full flex items-center justify-center">
                <Scan className="h-4 w-4 text-white" />
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center p-6 text-center">
            <Camera className="h-12 w-12 text-amber-500 mb-4" />
            <p className="text-neutral-300 mb-3">{error || t("positionQrCode")}</p>
            {error ? (
              <Button onClick={() => setError(null)} variant="outline" className="text-amber-300 border-amber-700">
                {t("tryAgain")}
              </Button>
            ) : null}
          </div>
        )}
      </div>

      {!isScanning && !error && (
        <Button onClick={startScanner} className="bg-amber-700 hover:bg-amber-800">
          <Camera className="mr-2 h-4 w-4" />
          {t("startScanner")}
        </Button>
      )}
    </div>
  )
}

