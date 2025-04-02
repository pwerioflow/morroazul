"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface BottleParallaxProps {
  scrollY: number
}

export default function BottleParallax({ scrollY }: BottleParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const yPos = useTransform(scrollYProgress, [0, 1], [0, 200])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Light effect that follows the bottle
  const lightPosY = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const lightOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.9, 0.3])

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div className="absolute w-full h-full" style={{ opacity: lightOpacity }}>
        <motion.div
          className="absolute rounded-full bg-amber-500/20 blur-3xl w-[600px] h-[600px]"
          style={{ y: lightPosY, x: "-50%", left: "50%" }}
        />
      </motion.div>

      <motion.div className="relative z-0" style={{ y: yPos, scale, opacity }}>
        <Image
          src="/placeholder.svg?height=700&width=350"
          alt="Garrafa de Morro Azul Premium"
          width={350}
          height={700}
          className="drop-shadow-2xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 to-transparent opacity-60 mix-blend-overlay" />
      </motion.div>
    </div>
  )
}

