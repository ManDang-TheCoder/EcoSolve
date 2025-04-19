import Link from "next/link"
import Image from "next/image"
import { Calendar, CheckCircle, MapPin, MessageSquare, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VerificationBadge } from "@/components/experts/verification-badge"

interface ExpertCardProps {
  id: string
  name: string
  title: string
  image: string
  specialties: string[]
  rating: number
  reviewCount: number
  isVerified: boolean
  isAvailable: boolean
  location: string
  responseTime: string
}

export function ExpertCard({
  id,
  name,
  title,
  image,
  specialties,
  rating,
  reviewCount,
  isVerified,
  isAvailable,
  location,
  responseTime,
}: ExpertCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <div className="aspect-[4/3]">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        {isAvailable && (
          <Badge className="absolute right-3 top-3 bg-emerald-500 text-white hover:bg-emerald-600">Available Now</Badge>
        )}
      </div>
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold">{name}</h3>
            {isVerified && <VerificationBadge size="sm" />}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({reviewCount})</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{title}</p>

        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {specialties.map((specialty) => (
            <Badge key={specialty} variant="outline" className="bg-emerald-50">
              {specialty}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
          <CheckCircle className="h-3 w-3 text-emerald-500" />
          <span>{responseTime}</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
            <Link href={`/experts/${id}/schedule`}>
              <Calendar className="h-3.5 w-3.5" />
              <span>Schedule</span>
            </Link>
          </Button>
          <Button size="sm" className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href={`/experts/${id}/contact`}>
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Contact</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
