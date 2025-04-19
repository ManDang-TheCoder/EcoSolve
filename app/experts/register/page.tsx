"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const expertSpecialties = [
  { value: "air-quality", label: "Air Quality" },
  { value: "water-pollution", label: "Water Pollution" },
  { value: "waste-management", label: "Waste Management" },
  { value: "biodiversity", label: "Biodiversity" },
  { value: "climate-change", label: "Climate Change" },
  { value: "conservation", label: "Conservation" },
  { value: "urban-planning", label: "Urban Planning" },
  { value: "renewable-energy", label: "Renewable Energy" },
  { value: "sustainable-agriculture", label: "Sustainable Agriculture" },
  { value: "environmental-policy", label: "Environmental Policy" },
];

const expertFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  specialties: z.array(z.string()).min(1, { message: "Please select at least one specialty." }),
  credentials: z.array(z.string()).min(1, { message: "Please add at least one credential." }),
  bio: z.string().min(50, { message: "Bio must be at least 50 characters." }),
  consultationFee: z.number().min(0, { message: "Consultation fee must be a positive number." }).optional(),
});

type ExpertFormValues = z.infer<typeof expertFormSchema>;

export default function ExpertRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<string[]>([]);
  const [newCredential, setNewCredential] = useState("");
  
  const form = useForm<ExpertFormValues>({
    resolver: zodResolver(expertFormSchema),
    defaultValues: {
      title: "",
      specialties: [],
      credentials: [],
      bio: "",
      consultationFee: 0,
    },
  });

  const addCredential = () => {
    if (newCredential.trim() === "") return;
    
    setCredentials([...credentials, newCredential]);
    form.setValue("credentials", [...credentials, newCredential]);
    setNewCredential("");
  };

  const removeCredential = (index: number) => {
    const updatedCredentials = credentials.filter((_, i) => i !== index);
    setCredentials(updatedCredentials);
    form.setValue("credentials", updatedCredentials);
  };

  const onSubmit = async (data: ExpertFormValues) => {
    setLoading(true);
    try {
      // Convert specialties and credentials to JSON strings for SQLite compatibility
      const formattedData = {
        ...data,
        specialties: JSON.stringify(data.specialties),
        credentials: JSON.stringify(data.credentials)
      };

      // This would be a fetch call to your API endpoint
      // await fetch("/api/experts/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formattedData),
      // });
      
      // For now, we'll just simulate a successful registration
      console.log("Expert registration data:", formattedData);
      
      toast.success("Expert profile created successfully!");
      setTimeout(() => {
        router.push("/experts");
      }, 1500);
    } catch (error) {
      console.error("Failed to register as expert:", error);
      toast.error("Failed to create expert profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register as an Environmental Expert</CardTitle>
          <CardDescription>
            Share your expertise and help solve local environmental issues. Your knowledge can make a real difference.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Environmental Scientist, Waste Management Specialist" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your professional title that best describes your expertise.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Areas of Expertise</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={(value) => {
                          const currentValues = field.value || [];
                          if (!currentValues.includes(value)) {
                            field.onChange([...currentValues, value]);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your areas of expertise" />
                        </SelectTrigger>
                        <SelectContent>
                          {expertSpecialties.map((specialty) => (
                            <SelectItem key={specialty.value} value={specialty.value}>
                              {specialty.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Your selected specialties: {field.value?.map((v) => 
                        expertSpecialties.find(s => s.value === v)?.label
                      ).join(", ")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Credentials</FormLabel>
                <div className="flex gap-2 mb-2">
                  <Input 
                    placeholder="e.g. PhD in Environmental Science, Certified Waste Manager"
                    value={newCredential}
                    onChange={(e) => setNewCredential(e.target.value)}
                  />
                  <Button type="button" onClick={addCredential} variant="outline">Add</Button>
                </div>
                <FormDescription>
                  Add your qualifications, certifications, and relevant experience.
                </FormDescription>
                
                {credentials.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {credentials.map((credential, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <span>{credential}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeCredential(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {form.formState.errors.credentials && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.credentials.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your professional background, experience, and why you're passionate about solving environmental issues..."
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      A detailed profile helps community members understand your expertise.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consultationFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consultation Fee (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      Hourly rate for consultations. Leave at 0 for volunteer work.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register as Expert"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-muted-foreground">
            By registering, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 