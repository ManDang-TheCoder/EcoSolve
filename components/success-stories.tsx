"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function SuccessStories() {
  // In a real implementation, this would use a proper carousel library
  // and fetch real success stories from an API

  const stories = [
    {
      id: 1,
      title: "River Cleanup Project",
      location: "Greenfield Community",
      description:
        "Local volunteers removed over 500 pounds of plastic waste from the river, restoring habitat for native species.",
      beforeImage: "/placeholder.svg?height=300&width=400",
      afterImage: "/placeholder.svg?height=300&width=400",
      impact: "Water quality improved by 40%",
      participants: 32,
    },
    {
      id: 2,
      title: "Urban Garden Initiative",
      location: "Downtown District",
      description:
        "Transformed an abandoned lot into a thriving community garden providing fresh produce and green space.",
      beforeImage: "/placeholder.svg?height=300&width=400",
      afterImage: "/placeholder.svg?height=300&width=400",
      impact: "Created 2,000 sq ft of green space",
      participants: 45,
    },
    {
      id: 3,
      title: "Invasive Species Removal",
      location: "Oakwood Park",
      description: "Community effort to remove invasive plants and restore native vegetation to improve biodiversity.",
      beforeImage: "/placeholder.svg?height=300&width=400",
      afterImage: "/placeholder.svg?height=300&width=400",
      impact: "Native plant species increased by 60%",
      participants: 28,
    },
  ]

  return (
    <div className="relative">
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
        {stories.map((story) => (
          <Card key={story.id} className="min-w-[300px] flex-1 snap-center md:min-w-[400px]">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">{story.title}</h3>
              <p className="text-sm text-muted-foreground">{story.location}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image src={story.beforeImage || "/placeholder.svg"} alt="Before" fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 bg-black/70 px-2 py-1 text-xs text-white">Before</div>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image src={story.afterImage || "/placeholder.svg"} alt="After" fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 bg-emerald-600/70 px-2 py-1 text-xs text-white">After</div>
                </div>
              </div>

              <p className="mt-4 text-sm">{story.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm font-medium text-emerald-600">{story.impact}</div>
                <div className="text-sm text-muted-foreground">{story.participants} participants</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        size="icon"
        variant="outline"
        className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full md:flex"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        size="icon"
        variant="outline"
        className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full md:flex"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  )
}
