"use client"

import { useEffect, useState } from "react"
import { BarChart3, Globe, Leaf, Users } from "lucide-react"

export function ImpactCounter() {
  // In a real implementation, these would be fetched from an API
  const [stats, setStats] = useState({
    issuesResolved: 1247,
    volunteersEngaged: 3582,
    communitiesImpacted: 86,
    treesPlanted: 12450,
  })

  // Simple animation for the counters
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        issuesResolved: prev.issuesResolved + 1,
        volunteersEngaged: prev.volunteersEngaged + 2,
        treesPlanted: prev.treesPlanted + 5,
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <BarChart3 className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="text-2xl font-bold">{stats.issuesResolved.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">Issues Resolved</div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <Users className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="text-2xl font-bold">{stats.volunteersEngaged.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">Volunteers Engaged</div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <Globe className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="text-2xl font-bold">{stats.communitiesImpacted.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">Communities Impacted</div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <Leaf className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="text-2xl font-bold">{stats.treesPlanted.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">Trees Planted</div>
      </div>
    </div>
  )
}
