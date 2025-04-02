"use client"

import { useEffect, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

// Fix Leaflet marker icon issue
const defaultIcon = L.icon({
  iconUrl: "/placeholder.svg?height=32&width=32",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const selectedIcon = L.icon({
  iconUrl: "/placeholder.svg?height=40&width=40",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

// Component to update map view when props change
function ChangeView({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) {
  const map = useMap()

  useEffect(() => {
    if (center.lat !== 0 || center.lng !== 0) {
      map.setView(center, zoom)
    }
  }, [center, zoom, map])

  return null
}

interface MapProps {
  distributors: Array<{
    id: number
    name: string
    address: string
    country: string
    city: string
    phone: string
    coords: { lat: number; lng: number }
  }>
  selectedDistributor: any
  onDistributorSelect: (distributor: any) => void
  center: { lat: number; lng: number }
  zoom: number
}

export default function Map({ distributors, selectedDistributor, onDistributorSelect, center, zoom }: MapProps) {
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    setMapReady(true)
  }, [])

  return (
    <div className="h-full w-full">
      {mapReady && (
        <MapContainer
          center={center.lat !== 0 ? [center.lat, center.lng] : [0, 0]}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ChangeView center={center} zoom={zoom} />

          {distributors.map((distributor) => (
            <Marker
              key={distributor.id}
              position={[distributor.coords.lat, distributor.coords.lng]}
              icon={selectedDistributor?.id === distributor.id ? selectedIcon : defaultIcon}
              eventHandlers={{
                click: () => onDistributorSelect(distributor),
              }}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-sm">{distributor.name}</h3>
                  <p className="text-xs mt-1">{distributor.address}</p>
                  <p className="text-xs mt-1">{distributor.phone}</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-xs text-amber-800" asChild>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${distributor.coords.lat},${distributor.coords.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver no Google Maps <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  )
}

