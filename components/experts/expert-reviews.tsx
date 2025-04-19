"use client"

import { useState } from "react"
import { Star, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ExpertReviewsProps {
  expertId: string
}

export function ExpertReviews({ expertId }: ExpertReviewsProps) {
  const [showAll, setShowAll] = useState(false)

  // In a real app, you would fetch reviews based on the expert ID
  const reviews = [
    {
      id: "1",
      author: "Michael Johnson",
      date: "2 months ago",
      rating: 5,
      content:
        "Dr. Chen provided exceptional guidance for our community's coastal cleanup project. Her expertise in marine ecosystems helped us prioritize the most impactful areas and implement sustainable practices. The water quality in our bay has noticeably improved since following her recommendations.",
      helpful: 12,
      project: "Coastal Cleanup Initiative",
    },
    {
      id: "2",
      author: "Sarah Williams",
      date: "3 months ago",
      rating: 5,
      content:
        "We consulted with Dr. Chen about water pollution in our local river. She conducted a thorough assessment and provided practical, science-based solutions that were feasible for our community to implement. Highly recommend her services!",
      helpful: 8,
      project: "River Pollution Assessment",
    },
    {
      id: "3",
      author: "David Rodriguez",
      date: "4 months ago",
      rating: 4,
      content:
        "Dr. Chen helped our environmental nonprofit develop a marine conservation plan. Her knowledge of coastal ecosystems is impressive, and she was able to translate complex scientific concepts into actionable steps for our volunteers.",
      helpful: 5,
      project: "Marine Conservation Planning",
    },
    {
      id: "4",
      author: "Jennifer Lee",
      date: "5 months ago",
      rating: 5,
      content:
        "Excellent consultation on our wetland restoration project. Dr. Chen's recommendations were practical and effective, and she followed up multiple times to ensure we were on the right track.",
      helpful: 7,
      project: "Wetland Restoration",
    },
    {
      id: "5",
      author: "Robert Thompson",
      date: "6 months ago",
      rating: 5,
      content:
        "Dr. Chen conducted a comprehensive water quality assessment for our community lake. Her report was detailed yet accessible, and her recommendations have made a significant difference in our water clarity and ecosystem health.",
      helpful: 10,
      project: "Lake Water Quality Assessment",
    },
  ]

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="ml-2 font-medium">4.9 out of 5</span>
          </div>
          <p className="text-sm text-muted-foreground">Based on 87 reviews</p>
        </div>
      </div>

      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="font-medium">{review.author}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="mb-2 text-sm">{review.content}</p>

              <div className="mb-2 rounded-md bg-muted/50 px-3 py-1 text-xs">Project: {review.project}</div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ThumbsUp className="h-3 w-3" />
                <span>{review.helpful} people found this helpful</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "Show All Reviews"}
          </Button>
        </div>
      )}
    </div>
  )
}
