"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Store } from "lucide-react"
import Navbar from "@/components/navbar"

// Dynamic import for Map component to avoid SSR issues
const Map = dynamic(() => import("@/components/map"), { ssr: false })

export default function DistribuidoresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedCity, setSelectedCity] = useState("")

  const countries = [
    { value: "all", label: "Todos os países" },
    { value: "br", label: "Brasil" },
    { value: "pt", label: "Portugal" },
    { value: "es", label: "Espanha" },
    { value: "fr", label: "França" },
    { value: "it", label: "Itália" },
    { value: "de", label: "Alemanha" },
    { value: "uk", label: "Reino Unido" },
  ]

  const distributors = [
    {
      id: 1,
      name: "Empório das Cachaças",
      address: "Av. Paulista, 1000, São Paulo, SP",
      country: "Brasil",
      countryCode: "br",
      city: "São Paulo",
      phone: "+55 11 9999-8888",
      coords: { lat: -23.5505, lng: -46.6333 },
    },
    {
      id: 2,
      name: "Premium Spirits",
      address: "Rua Oscar Freire, 500, São Paulo, SP",
      country: "Brasil",
      countryCode: "br",
      city: "São Paulo",
      phone: "+55 11 9876-5432",
      coords: { lat: -23.5616, lng: -46.6601 },
    },
    {
      id: 3,
      name: "Adega Portuguesa",
      address: "Rua do Carmo, 27, Lisboa",
      country: "Portugal",
      countryCode: "pt",
      city: "Lisboa",
      phone: "+351 21 887 7766",
      coords: { lat: 38.7223, lng: -9.1393 },
    },
    {
      id: 4,
      name: "La Casa de Bebidas",
      address: "Calle Gran Vía, 42, Madrid",
      country: "Espanha",
      countryCode: "es",
      city: "Madrid",
      phone: "+34 91 123 4567",
      coords: { lat: 40.4168, lng: -3.7038 },
    },
    {
      id: 5,
      name: "Spirito di Brasile",
      address: "Via Roma, 54, Roma",
      country: "Itália",
      countryCode: "it",
      city: "Roma",
      phone: "+39 06 8765 4321",
      coords: { lat: 41.9028, lng: 12.4964 },
    },
  ]

  const filteredDistributors = distributors.filter((distributor) => {
    const matchesSearch =
      distributor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      distributor.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      distributor.city.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCountry = selectedCountry === "all" || distributor.countryCode === selectedCountry

    const matchesCity = selectedCity === "" || distributor.city.toLowerCase() === selectedCity.toLowerCase()

    return matchesSearch && matchesCountry && matchesCity
  })

  const [selectedDistributor, setSelectedDistributor] = useState<(typeof distributors)[0] | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 })
  const [mapZoom, setMapZoom] = useState(2)

  const handleDistributorSelect = (distributor: (typeof distributors)[0]) => {
    setSelectedDistributor(distributor)
    setMapCenter(distributor.coords)
    setMapZoom(15)
  }

  const handleResetMap = () => {
    setSelectedDistributor(null)
    setMapCenter({ lat: 0, lng: 0 })
    setMapZoom(2)
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
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-amber-300">
              Encontre Distribuidores
            </h1>
            <p className="font-montserrat text-neutral-300 max-w-2xl mx-auto">
              Localize os pontos de venda e distribuidores oficiais da nossa cachaça artesanal premium ao redor do
              mundo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="lg:col-span-1 space-y-4">
              <Card className="border-amber-900/50 bg-neutral-800/50 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-amber-300">Filtrar Distribuidores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
                      <Input
                        type="text"
                        placeholder="Buscar por nome ou endereço"
                        className="pl-9 bg-neutral-900/50 border-amber-900/30 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-400 mb-1 block">País</label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger className="bg-neutral-900/50 border-amber-900/30 text-white">
                          <SelectValue placeholder="Todos os países" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-800 border-amber-900/30">
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 mb-1 block">Cidade</label>
                      <Input
                        type="text"
                        placeholder="Qualquer cidade"
                        className="bg-neutral-900/50 border-amber-900/30 text-white"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-3 text-neutral-300">
                      Resultados ({filteredDistributors.length})
                    </h3>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {filteredDistributors.length > 0 ? (
                        filteredDistributors.map((distributor) => (
                          <div
                            key={distributor.id}
                            className={`p-3 rounded-lg cursor-pointer transition-all ${
                              selectedDistributor?.id === distributor.id
                                ? "bg-amber-900/40 border border-amber-700/50"
                                : "bg-neutral-900/50 border border-transparent hover:border-amber-900/50"
                            }`}
                            onClick={() => handleDistributorSelect(distributor)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="bg-amber-800/30 rounded-full p-2 mt-1">
                                <Store className="h-4 w-4 text-amber-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-amber-300">{distributor.name}</h4>
                                <p className="text-neutral-400 text-sm mt-0.5">{distributor.address}</p>
                                <div className="flex items-center gap-1 mt-1.5">
                                  <div className="text-xs py-0.5 px-1.5 bg-neutral-700/50 rounded text-neutral-300">
                                    {distributor.country}
                                  </div>
                                  <div className="text-xs py-0.5 px-1.5 bg-neutral-700/50 rounded text-neutral-300">
                                    {distributor.phone}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 px-4 bg-neutral-900/30 rounded-lg">
                          <MapPin className="h-10 w-10 text-neutral-600 mx-auto mb-2" />
                          <p className="text-neutral-400">Nenhum distribuidor encontrado com os filtros atuais.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-amber-900/50 bg-neutral-800/50 backdrop-blur-md h-full">
                <div className="p-4 flex justify-between items-center border-b border-amber-900/30">
                  <div>
                    <h3 className="font-medium text-amber-300">Mapa de Distribuidores</h3>
                    <p className="text-xs text-neutral-400">Clique em um marcador para ver detalhes</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-700/50 text-amber-300 hover:bg-amber-900/20"
                    onClick={handleResetMap}
                  >
                    Visualizar Todos
                  </Button>
                </div>
                <div className="h-[500px] rounded-b-lg overflow-hidden">
                  <Map
                    distributors={filteredDistributors}
                    selectedDistributor={selectedDistributor}
                    onDistributorSelect={handleDistributorSelect}
                    center={mapCenter}
                    zoom={mapZoom}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

