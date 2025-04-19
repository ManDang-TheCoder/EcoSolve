"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function IssueMap() {
  const [view, setView] = useState("map")

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-medium">Environmental Issues</h3>
        <Tabs value={view} onValueChange={setView} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            Report New
          </Button>
        </div>
      </div>

      <TabsContent value="map" className="m-0">
        <div className="relative h-[500px] w-full bg-emerald-50/50">
          {/* This would be replaced with an actual map component */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-emerald-600/30" />
              <p className="mt-2 text-muted-foreground">Interactive map would be displayed here</p>
              <p className="text-sm text-muted-foreground">Showing 124 environmental issues in your area</p>
            </div>
          </div>

          {/* Sample issue markers */}
          <div className="absolute left-[20%] top-[30%] cursor-pointer">
            <MapPin className="h-6 w-6 text-red-500" />
          </div>
          <div className="absolute left-[40%] top-[50%] cursor-pointer">
            <MapPin className="h-6 w-6 text-orange-500" />
          </div>
          <div className="absolute left-[70%] top-[40%] cursor-pointer">
            <MapPin className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="absolute left-[60%] top-[20%] cursor-pointer">
            <MapPin className="h-6 w-6 text-red-500" />
          </div>
          <div className="absolute left-[30%] top-[60%] cursor-pointer">
            <MapPin className="h-6 w-6 text-emerald-500" />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="list" className="m-0">
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-start gap-4 p-4 hover:bg-muted/50">
              <div
                className={`mt-1 h-3 w-3 rounded-full ${
                  item % 3 === 0 ? "bg-red-500" : item % 3 === 1 ? "bg-orange-500" : "bg-yellow-500"
                }`}
              />
              <div className="flex-1">
                <h4 className="font-medium">
                  {item % 3 === 0
                    ? "Water Pollution in Riverside Park"
                    : item % 3 === 1
                      ? "Illegal Waste Dumping"
                      : "Invasive Species Sighting"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Reported {item * 2} days ago · {item * 3} people involved
                </p>
              </div>
              <div className="text-right text-sm">
                <div className="font-medium">2.{item} miles away</div>
                <div className="text-muted-foreground">{item % 2 === 0 ? "In Progress" : "Needs Attention"}</div>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </div>
  )
}
