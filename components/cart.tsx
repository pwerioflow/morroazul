"use client"

import { useState } from "react"
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/i18n/language-context"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export function CartButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const { items, totalItems } = useCart()
  const router = useRouter()

  const handleStartShopping = () => {
    setIsOpen(false)
    router.push("/loja")
  }

  return (
    <>
      <Button variant="ghost" size="icon" className="text-amber-300 relative" onClick={() => setIsOpen(true)}>
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-neutral-900 z-50 shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-amber-900/30">
                  <h2 className="text-xl font-playfair font-bold text-amber-300">{t("yourCart")}</h2>
                  <Button variant="ghost" size="icon" className="text-neutral-400" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <ShoppingCart className="h-16 w-16 text-neutral-700 mb-4" />
                      <p className="text-neutral-400 mb-6">{t("emptyCart")}</p>
                      <Button className="bg-amber-600 hover:bg-amber-700" onClick={handleStartShopping}>
                        {t("startShopping")}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="p-4 border-t border-amber-900/30">
                    <div className="flex justify-between mb-4">
                      <span className="text-neutral-300">{t("subtotal")}</span>
                      <span className="font-bold">
                        R$ {items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                      </span>
                    </div>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 mb-2">{t("checkout")}</Button>
                    <Button
                      variant="outline"
                      className="w-full border-amber-900/50 text-amber-300 hover:bg-amber-900/20"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("continueShopping")}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function CartItem({ item }: { item: any }) {
  const { updateItemQuantity, removeItem } = useCart()
  const { t } = useLanguage()

  return (
    <div className="flex gap-4 border-b border-neutral-800 pb-4">
      <div className="w-20 h-20 bg-neutral-800 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={80}
          height={80}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-amber-300">{item.name}</h4>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-neutral-500 hover:text-red-500"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-neutral-400 mb-2">R$ {item.price.toFixed(2)}</p>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full border-neutral-700"
            onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="mx-3 text-sm">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full border-neutral-700"
            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

