"use client"

import Image from "next/image"
import { MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function FeaturedExperts() {
  // In a real implementation, these would be fetched from an API
  const experts = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      title: "Marine Biologist",
      image: "/placeholder.svg?height=200&width=200",
      specialties: ["Water Quality", "Marine Conservation", "Coastal Restoration"],
      rating: 4.9,
      consultations: 87,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "Urban Ecologist",
      image: "/placeholder.svg?height=200&width=200",
      specialties: ["Urban Planning", "Green Infrastructure", "Biodiversity"],
      rating: 4.8,
      consultations: 64,
    },
    {
      id: 3,
      name: "Dr. Sarah Williams",
      title: "Environmental Engineer",
      image: "/placeholder.svg?height=200&width=200",
      specialties: ["Waste Management", "Pollution Control", "Sustainable Design"],
      rating: 4.7,
      consultations: 92,
    },
    {
      id: 4,
      name: "James Rodriguez",
      title: "Forestry Specialist",
      image: "/placeholder.svg?height=200&width=200",
      specialties: ["Reforestation", "Invasive Species", "Habitat Restoration"],
      rating: 4.9,
      consultations: 78,
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {experts.map((expert) => (
        <Card key={expert.id}>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
                <Image src={expert.image || "/placeholder.svg"} alt={expert.name} fill className="object-cover" />
              </div>

              <h3 className="text-lg font-bold">{expert.name}</h3>
              <p className="text-sm text-muted-foreground">{expert.title}</p>

              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {expert.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline" className="bg-emerald-50">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex w-full items-center justify-between text-sm">
                <div>
                  <span className="font-medium">{expert.rating}</span>
                  <span className="text-muted-foreground"> rating</span>
                </div>
                <div>
                  <span className="font-medium">{expert.consultations}</span>
                  <span className="text-muted-foreground"> consultations</span>
                </div>
              </div>

              <Button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
