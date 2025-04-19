import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Download, Globe, MapPin, MessageSquare, Star, ThumbsUp, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VerificationBadge } from "@/components/experts/verification-badge"
import { ExpertReviews } from "@/components/experts/expert-reviews"
import { ExpertAvailability } from "@/components/experts/expert-availability"
import { ExpertCredentials } from "@/components/experts/expert-credentials"

export default function ExpertProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the expert data based on the ID
  const expert = {
    id: params.id,
    name: "Dr. Emily Chen",
    title: "Marine Biologist",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=1200",
    bio: "I'm a marine biologist with over 10 years of experience in water quality assessment, marine conservation, and coastal restoration. I've worked on projects across the West Coast of the United States, helping communities address pollution, habitat degradation, and sustainable fishing practices.",
    specialties: [
      "Water Quality",
      "Marine Conservation",
      "Coastal Restoration",
      "Pollution Assessment",
      "Habitat Rehabilitation",
    ],
    rating: 4.9,
    reviewCount: 87,
    consultationCount: 124,
    projectCount: 38,
    isVerified: true,
    isAvailable: true,
    location: "San Francisco, CA",
    responseTime: "Usually responds within 2 hours",
    languages: ["English", "Mandarin"],
    hourlyRate: "$120",
    education: [
      {
        degree: "Ph.D. in Marine Biology",
        institution: "University of California, San Diego",
        year: "2012",
      },
      {
        degree: "M.S. in Environmental Science",
        institution: "Stanford University",
        year: "2008",
      },
      {
        degree: "B.S. in Biology",
        institution: "University of Washington",
        year: "2006",
      },
    ],
    certifications: [
      {
        name: "Certified Environmental Professional (CEP)",
        issuer: "Academy of Board Certified Environmental Professionals",
        year: "2014",
      },
      {
        name: "Advanced Water Quality Assessment",
        issuer: "Environmental Protection Agency",
        year: "2016",
      },
    ],
    publications: [
      {
        title: "Coastal Ecosystem Restoration Techniques for Urban Environments",
        journal: "Journal of Environmental Management",
        year: "2019",
        url: "#",
      },
      {
        title: "Impact of Microplastics on Marine Food Webs",
        journal: "Marine Pollution Bulletin",
        year: "2017",
        url: "#",
      },
    ],
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/experts" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Experts
        </Link>
      </div>

      <div className="mb-8 overflow-hidden rounded-xl border bg-card">
        <div className="relative h-48 w-full sm:h-64">
          <Image src={expert.coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover" priority />
        </div>

        <div className="relative px-6 pb-6 sm:px-8">
          <div className="flex flex-col items-start sm:flex-row sm:items-end sm:gap-6">
            <div className="relative -mt-16 h-32 w-32 overflow-hidden rounded-xl border-4 border-background bg-background sm:h-40 sm:w-40">
              <Image
                src={expert.image || "/placeholder.svg"}
                alt={expert.name}
                fill
                className="object-cover"
                priority
              />
              {expert.isAvailable && (
                <Badge className="absolute right-2 top-2 bg-emerald-500 text-white hover:bg-emerald-600">
                  Available
                </Badge>
              )}
            </div>

            <div className="mt-4 flex-1 sm:mb-2 sm:mt-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold sm:text-3xl">{expert.name}</h1>
                <VerificationBadge size="lg" />
              </div>
              <p className="text-lg text-muted-foreground">{expert.title}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{expert.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    <strong>{expert.rating}</strong> ({expert.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{expert.responseTime}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex w-full flex-col gap-3 sm:mt-0 sm:w-auto sm:flex-row">
              <Button className="bg-emerald-600 hover:bg-emerald-700" size="lg">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="order-2 lg:order-1 lg:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {expert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">{expert.bio}</p>

                  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                        <MessageSquare className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Consultations</p>
                        <p className="font-medium">{expert.consultationCount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                        <Users className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Projects</p>
                        <p className="font-medium">{expert.projectCount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                        <Globe className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Languages</p>
                        <p className="font-medium">{expert.languages.join(", ")}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-3 text-lg font-medium">Specialties</h3>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {expert.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="bg-emerald-50">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="mb-3 text-lg font-medium">Hourly Rate</h3>
                  <p className="text-xl font-semibold text-emerald-600">{expert.hourlyRate}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expertise" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Areas of Expertise</CardTitle>
                  <CardDescription>Specialized knowledge and experience in environmental fields</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-3 text-lg font-medium">Water Quality</h3>
                      <p className="mb-2 text-muted-foreground">
                        Assessment, monitoring, and remediation of water quality issues in marine and freshwater
                        environments.
                      </p>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm">Helped 47 communities with water quality issues</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-medium">Marine Conservation</h3>
                      <p className="mb-2 text-muted-foreground">
                        Strategies for protecting marine ecosystems, including habitat preservation and species
                        protection.
                      </p>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm">Developed conservation plans for 12 coastal areas</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-medium">Coastal Restoration</h3>
                      <p className="mb-2 text-muted-foreground">
                        Techniques for restoring damaged coastal ecosystems, including wetlands, mangroves, and coral
                        reefs.
                      </p>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm">Led 8 major coastal restoration projects</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-medium">Pollution Assessment</h3>
                      <p className="mb-2 text-muted-foreground">
                        Identification and measurement of pollutants in aquatic environments and their impacts on
                        ecosystems.
                      </p>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm">
                          Conducted 35+ pollution assessments for communities and organizations
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="credentials" className="mt-6">
              <ExpertCredentials expert={expert} />
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <ExpertReviews expertId={expert.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpertAvailability expertId={expert.id} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Publications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expert.publications.map((publication, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Download className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{publication.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {publication.journal}, {publication.year}
                        </p>
                        <Link href={publication.url} className="mt-1 text-xs text-emerald-600 hover:underline">
                          Download PDF
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
