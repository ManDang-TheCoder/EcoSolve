"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MapPin, Search } from "lucide-react"
import { motion } from "framer-motion"
import mapboxgl from "mapbox-gl"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface Location {
  address: string
  latitude: number
  longitude: number
}

interface LocationPickerProps {
  value: Location
  onChange: (location: Location) => void
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markerRef = useRef<mapboxgl.Marker | null>(null)
  
  // Initialize Mapbox on component mount
  useEffect(() => {
    if (!mapContainerRef.current) return
    
    // Configure Mapbox
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""
    
    // Create the map instance
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [value.longitude || -74.5, value.latitude || 40],
      zoom: value.latitude ? 12 : 3,
    })
    
    // Handle map load completion
    map.on("load", () => {
      setMapLoaded(true)
      mapRef.current = map
      
      // If we have coordinates, add a marker
      if (value.latitude && value.longitude) {
        const marker = new mapboxgl.Marker({ color: "#10b981" })
          .setLngLat([value.longitude, value.latitude])
          .addTo(map)
        
        markerRef.current = marker
      }
    })
    
    // Handle map click for location selection
    map.on("click", (e) => {
      const { lng, lat } = e.lngLat
      
      // Update the marker
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat])
      } else {
        const marker = new mapboxgl.Marker({ color: "#10b981" })
          .setLngLat([lng, lat])
          .addTo(map)
        
        markerRef.current = marker
      }
      
      // Reverse geocode to get the address
      reverseGeocode(lat, lng)
    })
    
    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])
  
  // Update map when value changes
  useEffect(() => {
    if (!mapRef.current || !value.latitude || !value.longitude) return
    
    mapRef.current.flyTo({
      center: [value.longitude, value.latitude],
      zoom: 12,
    })
    
    if (markerRef.current) {
      markerRef.current.setLngLat([value.longitude, value.latitude])
    } else {
      const marker = new mapboxgl.Marker({ color: "#10b981" })
        .setLngLat([value.longitude, value.latitude])
        .addTo(mapRef.current)
      
      markerRef.current = marker
    }
  }, [value])
  
  // Search for locations using Mapbox Geocoding API
  const searchLocations = async (query: string) => {
    if (!query.trim()) return
    
    setIsSearching(true)
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${mapboxgl.accessToken}&limit=5`
      )
      
      const data = await response.json()
      
      // Transform results to our format
      const results = data.features.map((feature: any) => ({
        address: feature.place_name,
        longitude: feature.center[0],
        latitude: feature.center[1],
      }))
      
      setSearchResults(results)
    } catch (error) {
      console.error("Error searching locations:", error)
    } finally {
      setIsSearching(false)
    }
  }
  
  // Reverse geocode coordinates to get address
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      )
      
      const data = await response.json()
      
      if (data.features && data.features.length > 0) {
        onChange({
          address: data.features[0].place_name,
          latitude: lat,
          longitude: lng,
        })
      } else {
        onChange({
          address: `Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          latitude: lat,
          longitude: lng,
        })
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error)
      onChange({
        address: `Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        latitude: lat,
        longitude: lng,
      })
    }
  }
  
  const handleSearch = () => {
    searchLocations(searchQuery)
  }
  
  const selectLocation = (location: Location) => {
    onChange(location)
    setSearchResults([])
  }
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for an address..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {isSearching && (
            <div className="absolute right-3 top-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"></div>
            </div>
          )}
        </div>
        <Button type="button" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="rounded-md border bg-background"
        >
          <div className="py-1">
            {searchResults.map((result, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                type="button"
                className="flex w-full items-start gap-2 px-3 py-2 text-left hover:bg-muted"
                onClick={() => selectLocation(result)}
              >
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span className="text-sm">{result.address}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <div 
        ref={mapContainerRef} 
        className="relative aspect-video h-[300px] w-full overflow-hidden rounded-md border"
      >
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Skeleton className="h-full w-full" />
          </div>
        )}
        
        {/* Instructions overlay */}
        {mapLoaded && (
          <div className="absolute bottom-3 left-0 right-0 text-center z-10">
            <div className="mx-auto inline-block rounded-full bg-white/90 px-3 py-1 text-xs shadow-md backdrop-blur-sm">
              Click on the map to set a location or search for an address above
            </div>
          </div>
        )}
      </div>

      {value.address && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md border bg-muted/50 p-3"
        >
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
            <div>
              <p className="font-medium">{value.address}</p>
              <p className="text-xs text-muted-foreground">
                Coordinates: {value.latitude.toFixed(6)}, {value.longitude.toFixed(6)}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
