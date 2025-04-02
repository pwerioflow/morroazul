"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Play } from "lucide-react"

interface RecipeProps {
  recipe: {
    name: string
    ingredients: string[]
    instructions: string
    image: string
  }
}

export default function RecipeCard({ recipe }: RecipeProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="border-amber-900/50 bg-neutral-800/50 backdrop-blur-md overflow-hidden">
      <div className="relative">
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 right-0 p-2">
          <Button
            size="sm"
            className="rounded-full bg-amber-500 hover:bg-amber-600 w-8 h-8 flex items-center justify-center"
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-amber-300">{recipe.name}</CardTitle>
        <CardDescription>Cocktail premium com nossa cachaça artesanal</CardDescription>
      </CardHeader>

      <CardContent className="pb-0">
        <div className="mb-3">
          <h4 className="text-sm font-semibold mb-2 text-neutral-300">Ingredientes:</h4>
          <ul className="text-sm space-y-1 text-neutral-400">
            {recipe.ingredients.map((ingredient, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="text-amber-400 p-0 -ml-2 h-auto"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" /> Ver menos
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" /> Preparo
            </>
          )}
        </Button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-neutral-300 mt-3"
          >
            <h4 className="text-sm font-semibold mb-2 text-neutral-300">Modo de Preparo:</h4>
            <p>{recipe.instructions}</p>
          </motion.div>
        )}
      </CardFooter>
    </Card>
  )
}

