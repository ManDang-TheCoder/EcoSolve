"use client"
import Image from "next/image"
import { motion } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"

interface IssueCategoryProps {
  value: string
  onChange: (value: string) => void
}

export function IssueCategorySelector({ value, onChange }: IssueCategoryProps) {
  const categories = [
    {
      id: "water-pollution",
      name: "Water Pollution",
      icon: "/images/categories/water-pollution.jpg",
      description: "Contamination of water bodies like rivers, lakes, and oceans",
    },
    {
      id: "air-pollution",
      name: "Air Pollution",
      icon: "/images/categories/air-pollution.jpg",
      description: "Harmful substances in the air including smog, smoke, and emissions",
    },
    {
      id: "waste-management",
      name: "Waste Management",
      icon: "/images/categories/waste-management.jpg",
      description: "Improper disposal of trash, illegal dumping, and recycling issues",
    },
    {
      id: "habitat-destruction",
      name: "Habitat Destruction",
      icon: "/images/categories/habitat-destruction.jpg",
      description: "Damage to natural habitats, deforestation, and land degradation",
    },
    {
      id: "invasive-species",
      name: "Invasive Species",
      icon: "/images/categories/invasive-species.jpg",
      description: "Non-native plants or animals causing harm to local ecosystems",
    },
    {
      id: "noise-pollution",
      name: "Noise Pollution",
      icon: "/images/categories/noise-pollution.jpg",
      description: "Excessive noise that disrupts wildlife or community well-being",
    },
    {
      id: "soil-contamination",
      name: "Soil Contamination",
      icon: "/images/categories/soil-contamination.jpg",
      description: "Chemicals or pollutants in soil affecting plant growth or safety",
    },
    {
      id: "other",
      name: "Other",
      icon: "/images/categories/other-issue.jpg",
      description: "Other environmental issues not listed above",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Card
            className={`cursor-pointer transition-all hover:border-emerald-200 hover:shadow-sm ${
              value === category.id ? "border-2 border-emerald-600 bg-emerald-50" : ""
            }`}
            onClick={() => onChange(category.id)}
          >
            <CardContent className="p-0">
              <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={category.icon || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                {value === category.id && (
                  <div className="absolute inset-0 bg-emerald-600/20 backdrop-blur-[1px]"></div>
                )}
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-medium">{category.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{category.description}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
