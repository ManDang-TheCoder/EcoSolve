"use client"

import { useState } from "react"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

export function ExpertFilters() {
  const [distance, setDistance] = useState([50])

  const specialties = [
    { id: "water-quality", label: "Water Quality" },
    { id: "waste-management", label: "Waste Management" },
    { id: "conservation", label: "Conservation" },
    { id: "renewable-energy", label: "Renewable Energy" },
    { id: "sustainable-agriculture", label: "Sustainable Agriculture" },
    { id: "urban-planning", label: "Urban Planning" },
    { id: "climate-adaptation", label: "Climate Adaptation" },
    { id: "biodiversity", label: "Biodiversity" },
    { id: "pollution-control", label: "Pollution Control" },
  ]

  const credentials = [
    { id: "phd", label: "PhD" },
    { id: "masters", label: "Master's Degree" },
    { id: "certification", label: "Professional Certification" },
    { id: "government", label: "Government Experience" },
    { id: "research", label: "Research Publication" },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            <Filter className="mr-1 h-3 w-3" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium">Availability</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="available-now" />
                <label
                  htmlFor="available-now"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Available now
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="available-this-week" />
                <label
                  htmlFor="available-this-week"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Available this week
                </label>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 text-sm font-medium">Distance</h3>
            <Slider value={distance} min={5} max={100} step={5} onValueChange={setDistance} className="mb-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Within {distance} miles</span>
              <span>{distance[0]} mi</span>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 text-sm font-medium">Specialties</h3>
            <div className="space-y-2">
              {specialties.map((specialty) => (
                <div key={specialty.id} className="flex items-center space-x-2">
                  <Checkbox id={specialty.id} />
                  <label
                    htmlFor={specialty.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {specialty.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 text-sm font-medium">Credentials</h3>
            <div className="space-y-2">
              {credentials.map((credential) => (
                <div key={credential.id} className="flex items-center space-x-2">
                  <Checkbox id={credential.id} />
                  <label
                    htmlFor={credential.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {credential.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 text-sm font-medium">Rating</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-4plus" />
                <label
                  htmlFor="rating-4plus"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  4.0+ stars
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-45plus" />
                <label
                  htmlFor="rating-45plus"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  4.5+ stars
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-5" />
                <label
                  htmlFor="rating-5"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  5.0 stars
                </label>
              </div>
            </div>
          </div>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  )
}
