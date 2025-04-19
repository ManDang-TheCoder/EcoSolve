import { Award, GraduationCap } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Education {
  degree: string
  institution: string
  year: string
}

interface Certification {
  name: string
  issuer: string
  year: string
}

interface Publication {
  title: string
  journal: string
  year: string
  url: string
}

interface ExpertCredentialsProps {
  expert: {
    education: Education[]
    certifications: Certification[]
    publications: Publication[]
  }
}

export function ExpertCredentials({ expert }: ExpertCredentialsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-emerald-600" />
            <CardTitle>Education</CardTitle>
          </div>
          <CardDescription>Academic qualifications and training</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expert.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-emerald-200 pl-4">
                <h4 className="font-medium">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                <p className="text-xs text-muted-foreground">{edu.year}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-600" />
            <CardTitle>Certifications</CardTitle>
          </div>
          <CardDescription>Professional certifications and credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expert.certifications.map((cert, index) => (
              <div key={index} className="border-l-2 border-emerald-200 pl-4">
                <h4 className="font-medium">{cert.name}</h4>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground">{cert.year}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
