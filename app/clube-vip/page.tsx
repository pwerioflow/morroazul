"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, Crown, Gift, Star, User } from "lucide-react"
import Navbar from "@/components/navbar"
import { useLanguage } from "@/i18n/language-context"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

export default function ClubeVipPage() {
  const [email, setEmail] = useState("")
  const { t } = useLanguage()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [addedToCart, setAddedToCart] = useState<string | null>(null)

  const plans = [
    {
      id: "silver",
      name: "Prata",
      price: 49.9,
      period: "mês",
      features: [
        "Descontos exclusivos de 10%",
        "Acesso a lançamentos com 1 semana de antecedência",
        "Newsletter com dicas e receitas",
        "1 garrafa da linha standard por mês",
      ],
      color: "from-neutral-400 to-neutral-300",
      colorDark: "from-neutral-700 to-neutral-600",
    },
    {
      id: "gold",
      name: "Ouro",
      price: 99.9,
      period: "mês",
      popular: true,
      features: [
        "Descontos exclusivos de 15%",
        "Acesso a lançamentos com 2 semanas de antecedência",
        "Newsletter com dicas e receitas",
        "1 garrafa da linha premium por mês",
        "Kit de degustação completo",
        "Convites para eventos exclusivos",
      ],
      color: "from-amber-400 to-amber-300",
      colorDark: "from-amber-700 to-amber-600",
    },
    {
      id: "platinum",
      name: "Platinum",
      price: 199.9,
      period: "mês",
      features: [
        "Descontos exclusivos de 20%",
        "Acesso a lançamentos com 1 mês de antecedência",
        "Newsletter com dicas e receitas",
        "2 garrafas da linha premium por mês",
        "Kit de degustação completo",
        "Convites para eventos exclusivos",
        "Acesso à experiências sensoriais online",
        "Consultoria personalizada com nosso mestre destilador",
      ],
      color: "from-slate-400 to-slate-300",
      colorDark: "from-slate-700 to-slate-600",
    },
  ]

  const benefits = [
    {
      title: "Acesso Antecipado",
      description: "Seja o primeiro a descobrir novos lançamentos e edições limitadas",
      icon: <Crown className="h-5 w-5" />,
    },
    {
      title: "Experiências Exclusivas",
      description: "Participe de degustações, workshops e visitas à destilaria",
      icon: <Star className="h-5 w-5" />,
    },
    {
      title: "Presentes Surpresa",
      description: "Receba itens exclusivos como parte da sua assinatura mensal",
      icon: <Gift className="h-5 w-5" />,
    },
  ]

  const handleSubscribe = (planId: string, planName: string, planPrice: number) => {
    addItem({
      id: 1000 + plans.findIndex((p) => p.id === planId),
      name: `Plano ${planName} - Clube VIP`,
      price: planPrice,
      image: "/placeholder.svg?height=200&width=200",
    })

    setAddedToCart(planId)

    toast({
      title: t("planAddedToCart"),
      description: `Plano ${planName}`,
      action: (
        <Button variant="outline" size="sm" className="border-green-600 text-green-600">
          <Check className="h-4 w-4 mr-1" /> {t("success")}
        </Button>
      ),
    })

    setTimeout(() => {
      setAddedToCart(null)
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
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-amber-300">{t("vipClubTitle")}</h1>
            <p className="font-montserrat text-neutral-300 max-w-2xl mx-auto">{t("vipClubDesc")}</p>
          </motion.div>

          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <Card className="border-amber-900/30 bg-neutral-800/50 backdrop-blur-md h-full">
                    <CardContent className="p-6 text-center">
                      <div className="bg-gradient-to-br from-amber-700 to-amber-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        {benefit.icon}
                      </div>
                      <h3 className="text-lg font-playfair font-bold mb-2 text-amber-300">{benefit.title}</h3>
                      <p className="text-sm text-neutral-300">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-center mb-10 text-amber-300">
              {t("choosePlan")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <div className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {t("mostPopular")}
                      </div>
                    </div>
                  )}

                  <Card
                    className={`border-amber-900/30 ${plan.popular ? "bg-amber-900/30" : "bg-neutral-800/50"} backdrop-blur-md h-full overflow-hidden`}
                  >
                    <div className={`h-2 w-full bg-gradient-to-r ${plan.popular ? plan.color : plan.colorDark}`} />

                    <CardHeader className="text-center pb-2">
                      <CardTitle className={`${plan.popular ? "text-amber-300" : "text-white"} font-playfair`}>
                        {t("plan")} {plan.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="text-center p-6">
                      <div className="mb-4">
                        <span className="text-3xl font-bold">R$ {plan.price.toFixed(2)}</span>
                        <span className="text-neutral-400 text-sm">/{t("month")}</span>
                      </div>

                      <ul className="space-y-3 text-left">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className={`h-4 w-4 mt-0.5 ${plan.popular ? "text-amber-400" : "text-green-500"}`} />
                            <span className="text-neutral-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="pt-0 pb-6 px-6">
                      <Button
                        className={`w-full ${
                          addedToCart === plan.id
                            ? "bg-green-600 hover:bg-green-700"
                            : plan.popular
                              ? "bg-amber-600 hover:bg-amber-700"
                              : "bg-neutral-700 hover:bg-neutral-600"
                        }`}
                        onClick={() => handleSubscribe(plan.id, plan.name, plan.price)}
                      >
                        {addedToCart === plan.id ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            {t("addedToCart")}
                          </>
                        ) : (
                          t("subscribe")
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 max-w-xl mx-auto">
              <Card className="border-amber-900/30 bg-neutral-800/50 backdrop-blur-md overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-amber-700 rounded-full p-3">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-playfair font-bold text-amber-300">{t("getUpdates")}</h3>
                      <p className="text-sm text-neutral-300">{t("signUpVipInfo")}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder={t("yourEmail")}
                      className="bg-neutral-900/50 border-amber-900/30 text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button className="bg-amber-600 hover:bg-amber-700 whitespace-nowrap">{t("wantToJoin")}</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

