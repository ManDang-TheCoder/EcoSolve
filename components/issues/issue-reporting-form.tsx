"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Check, ChevronRight, FileText, Loader2, MapPin, Trash2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationPicker } from "@/components/issues/location-picker"
import { IssueCategorySelector } from "@/components/issues/issue-category-selector"
import { reportIssue } from "@/app/actions/issue-actions"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  category: z.string({
    required_error: "Please select an issue category.",
  }),
  subcategory: z.string().optional(),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  location: z.object({
    address: z.string().min(1, {
      message: "Please enter a location.",
    }),
    latitude: z.number(),
    longitude: z.number(),
  }),
  impactSeverity: z.number().min(1).max(5),
  impactScope: z.string({
    required_error: "Please select the scope of impact.",
  }),
  urgency: z.string({
    required_error: "Please select the urgency level.",
  }),
  // We'll handle file validation separately since it's more complex with React Hook Form
})

type FormValues = z.infer<typeof formSchema>

// Animation variants for form steps
const formVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
}

export function IssueReportingForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadPreview, setUploadPreview] = useState<string[]>([])
  const [similarIssues, setSimilarIssues] = useState<any[]>([])
  const [showSimilarIssues, setShowSimilarIssues] = useState(false)
  const [formProgress, setFormProgress] = useState(25)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      impactSeverity: 3,
      location: {
        address: "",
        latitude: 0,
        longitude: 0,
      },
    },
  })

  // Update progress bar when step changes
  useEffect(() => {
    setFormProgress(step * 25)
  }, [step])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles: File[] = []
    const newPreviews: string[] = []

    Array.from(files).forEach((file) => {
      // Validate file size and type
      if (file.size > MAX_FILE_SIZE) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        return
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        alert(`File ${file.name} has an unsupported format. Please upload JPEG, PNG, or WebP.`)
        return
      }

      newFiles.push(file)
      newPreviews.push(URL.createObjectURL(file))
    })

    setUploadedFiles([...uploadedFiles, ...newFiles])
    setUploadPreview([...uploadPreview, ...newPreviews])
  }

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles]
    const newPreviews = [...uploadPreview]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index])

    newFiles.splice(index, 1)
    newPreviews.splice(index, 1)

    setUploadedFiles(newFiles)
    setUploadPreview(newPreviews)
  }

  const checkForSimilarIssues = async () => {
    // In a real app, this would make an API call to check for similar issues
    // based on location and category
    const location = form.getValues("location")
    const category = form.getValues("category")

    // Simulate API call with timeout
    setShowSimilarIssues(true)

    // Mock data for similar issues
    setTimeout(() => {
      setSimilarIssues([
        {
          id: "issue-1",
          title: "Water pollution in Riverside Park",
          category: "Water Pollution",
          distance: "0.3 miles away",
          date: "Reported 3 days ago",
          status: "Under Investigation",
        },
        {
          id: "issue-2",
          title: "Trash accumulation near Main Street bridge",
          category: "Waste Management",
          distance: "0.5 miles away",
          date: "Reported 1 week ago",
          status: "Solution Proposed",
        },
      ])
    }, 1000)
  }

  const nextStep = async () => {
    let isValid = false

    if (step === 1) {
      isValid = await form.trigger(["title", "category", "description"])
      if (isValid) setStep(2)
    } else if (step === 2) {
      isValid = await form.trigger(["location"])
      if (isValid) {
        await checkForSimilarIssues()
        setStep(3)
      }
    } else if (step === 3) {
      isValid = await form.trigger(["impactSeverity", "impactScope", "urgency"])
      if (isValid) setStep(4)
    }
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // In a real app, you would upload the files and get their URLs
      const fileUrls = uploadedFiles.map((_, index) => `https://example.com/file-${index}.jpg`)

      // Combine form data with file URLs
      const completeData = {
        ...data,
        evidence: fileUrls,
      }

      // Submit the data
      await reportIssue(completeData)

      // Redirect to success page
      router.push("/report-success")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      {/* Progress Bar */}
      <div className="relative h-2 w-full overflow-hidden rounded-t-xl bg-muted">
        <motion.div
          className="absolute left-0 top-0 h-full bg-emerald-600"
          initial={{ width: "25%" }}
          animate={{ width: `${formProgress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Progress Steps */}
      <div className="flex border-b">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 border-b-2 p-4 text-center text-sm font-medium ${
              step === i
                ? "border-emerald-600 text-emerald-600"
                : step > i
                  ? "border-emerald-200 text-muted-foreground"
                  : "border-transparent text-muted-foreground"
            }`}
          >
            <div className="flex items-center justify-center">
              <motion.div
                className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  step > i
                    ? "bg-emerald-600 text-white"
                    : step === i
                      ? "border-2 border-emerald-600 text-emerald-600"
                      : "border border-muted-foreground text-muted-foreground"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: step === i ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {step > i ? <Check className="h-3 w-3" /> : i}
              </motion.div>
              {i === 1 && "Issue Details"}
              {i === 2 && "Location"}
              {i === 3 && "Impact"}
              {i === 4 && "Review"}
            </div>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Issue Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Title</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Water pollution in Riverside Park" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a clear, concise title that describes the environmental issue.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Category</FormLabel>
                      <FormControl>
                        <IssueCategorySelector value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormDescription>
                        Select the category that best describes the environmental issue.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe the environmental issue in detail. Include when you first noticed it, any changes you've observed, and potential causes if known."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide as much detail as possible to help experts understand and address the issue.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Evidence (Photos/Videos)</FormLabel>
                  <div className="mt-2">
                    <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {uploadPreview.map((preview, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="relative aspect-square overflow-hidden rounded-md border"
                        >
                          <Image
                            src={preview || "/placeholder.svg"}
                            alt="Uploaded evidence"
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-1 top-1 h-6 w-6"
                            onClick={() => removeFile(index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </motion.div>
                      ))}
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground hover:bg-muted/50">
                          <Upload className="mb-2 h-6 w-6" />
                          <span className="text-xs">Upload</span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png,image/webp"
                            multiple
                            onChange={handleFileUpload}
                          />
                        </label>
                      </motion.div>
                    </div>
                    <FormDescription>
                      Upload photos or videos of the environmental issue (max 10MB per file, JPEG, PNG, or WebP format).
                    </FormDescription>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <LocationPicker
                          value={field.value}
                          onChange={(location) => {
                            field.onChange(location)
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Select the location of the environmental issue by searching for an address or dropping a pin on
                        the map.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Step 3: Impact Assessment */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                {showSimilarIssues && similarIssues.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Card className="border-yellow-200 bg-yellow-50">
                      <CardContent className="p-4">
                        <div className="mb-3 flex items-center gap-2 text-yellow-800">
                          <AlertTriangle className="h-5 w-5" />
                          <h3 className="font-medium">Similar Issues Found Nearby</h3>
                        </div>
                        <p className="mb-4 text-sm text-yellow-700">
                          We found similar environmental issues reported in your area. You can continue with your report
                          or check these existing issues.
                        </p>
                        <div className="space-y-3">
                          {similarIssues.map((issue, index) => (
                            <motion.div
                              key={issue.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                              className="rounded-md border bg-white p-3"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium">{issue.title}</h4>
                                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                                    <span>{issue.category}</span>
                                    <span>•</span>
                                    <span>{issue.distance}</span>
                                    <span>•</span>
                                    <span>{issue.date}</span>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" className="text-xs">
                                  View Issue
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <FormField
                  control={form.control}
                  name="impactSeverity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact Severity</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                          <div className="flex justify-between text-xs">
                            <span>Minor</span>
                            <span>Moderate</span>
                            <span>Severe</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Rate the severity of the environmental impact from 1 (minor) to 5 (severe).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="impactScope"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact Scope</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="localized" />
                            </FormControl>
                            <FormLabel className="font-normal">Localized (affects a small, specific area)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="neighborhood" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Neighborhood (affects multiple blocks or a small community)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="community" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Community-wide (affects an entire town or city district)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="regional" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Regional (affects multiple communities or an ecosystem)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>Select the geographical scope of the environmental impact.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low - Can be addressed within months</SelectItem>
                          <SelectItem value="medium">Medium - Should be addressed within weeks</SelectItem>
                          <SelectItem value="high">High - Needs attention within days</SelectItem>
                          <SelectItem value="critical">Critical - Requires immediate attention</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Indicate how quickly this environmental issue needs to be addressed.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Step 4: Review and Submit */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg bg-emerald-50 p-4 text-center"
                >
                  <Check className="mx-auto mb-2 h-8 w-8 text-emerald-600" />
                  <h3 className="text-lg font-medium text-emerald-800">Almost Done!</h3>
                  <p className="text-sm text-emerald-700">
                    Please review your environmental issue report before submitting.
                  </p>
                </motion.div>

                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Issue Details</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                    <TabsTrigger value="impact">Impact</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-medium">Title</h4>
                      <p>{form.getValues("title")}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Category</h4>
                      <p>{form.getValues("category")}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Description</h4>
                      <p className="whitespace-pre-line">{form.getValues("description")}</p>
                    </div>
                    {uploadPreview.length > 0 && (
                      <div>
                        <h4 className="mb-2 font-medium">Evidence</h4>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {uploadPreview.map((preview, index) => (
                            <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                              <Image
                                src={preview || "/placeholder.svg"}
                                alt="Uploaded evidence"
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="location" className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p>{form.getValues("location").address}</p>
                    </div>
                    <div className="aspect-video overflow-hidden rounded-md border bg-muted">
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                          <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Location: {form.getValues("location").latitude.toFixed(6)},{" "}
                            {form.getValues("location").longitude.toFixed(6)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="impact" className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-medium">Impact Severity</h4>
                      <p>
                        {form.getValues("impactSeverity")} out of 5 (
                        {form.getValues("impactSeverity") <= 2
                          ? "Minor"
                          : form.getValues("impactSeverity") === 3
                            ? "Moderate"
                            : "Severe"}
                        )
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Impact Scope</h4>
                      <p>
                        {form.getValues("impactScope") === "localized"
                          ? "Localized (affects a small, specific area)"
                          : form.getValues("impactScope") === "neighborhood"
                            ? "Neighborhood (affects multiple blocks or a small community)"
                            : form.getValues("impactScope") === "community"
                              ? "Community-wide (affects an entire town or city district)"
                              : "Regional (affects multiple communities or an ecosystem)"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Urgency Level</h4>
                      <p>
                        {form.getValues("urgency") === "low"
                          ? "Low - Can be addressed within months"
                          : form.getValues("urgency") === "medium"
                            ? "Medium - Should be addressed within weeks"
                            : form.getValues("urgency") === "high"
                              ? "High - Needs attention within days"
                              : "Critical - Requires immediate attention"}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="rounded-md border bg-muted/50 p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">What happens next?</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Your report will be reviewed by our team and local environmental experts. We'll match your issue
                        with potential solutions and connect you with specialists who can help address the problem.
                        You'll receive updates on your report status via email.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              </motion.div>
            ) : (
              <div></div>
            )}
            {step < 4 ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="button" onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700">
                  Continue
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isSubmitting ? { scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
              >
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
