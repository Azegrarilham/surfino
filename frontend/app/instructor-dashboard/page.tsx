"use client"

import { useState } from "react"
import { ProfileSidebar } from "@/components/instructorDashboard/profile-sidebar"
import { BasicInfoForm } from "@/components/instructorDashboard/basic-info-form"
import { ContactDetailsForm } from "@/components/instructorDashboard/contact-details-form"
import { LocationPreferencesForm } from "@/components/instructorDashboard/location-preferences-form"
import { VerificationForm } from "@/components/instructorDashboard/verification-form"
import { DisplaySetupForm } from "@/components/instructorDashboard/display-setup-form"
import { PaymentInfoForm } from "@/components/instructorDashboard/payment-info-form"
import { MessagingSetupForm } from "@/components/instructorDashboard/messaging-setup-form"
import { LessonCalendar } from "@/components/instructorDashboard/lesson-calendar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

const stepTitles = {
  "basic-info": "Basic Information",
  "contact-details": "Contact Details",
  "location-preferences": "Location & Preferences",
  verification: "Verification",
  "display-setup": "Display Setup",
  "payment-info": "Payment Information",
  messaging: "Messaging Setup",
  completed: "Profile Complete",
  calendar: "Lesson Calendar",
}

export default function ProfileSetupPage() {
  const [currentStep, setCurrentStep] = useState("basic-info")

  const handleComplete = () => {
    setCurrentStep("completed")
  }

  const renderCurrentForm = () => {
    switch (currentStep) {
      case "basic-info":
        return <BasicInfoForm onNext={() => setCurrentStep("contact-details")} />
      case "contact-details":
        return (
          <ContactDetailsForm
            onNext={() => setCurrentStep("location-preferences")}
            onPrevious={() => setCurrentStep("basic-info")}
          />
        )
      case "location-preferences":
        return (
          <LocationPreferencesForm
            onNext={() => setCurrentStep("verification")}
            onPrevious={() => setCurrentStep("contact-details")}
          />
        )
      case "verification":
        return (
          <VerificationForm
            onNext={() => setCurrentStep("display-setup")}
            onPrevious={() => setCurrentStep("location-preferences")}
          />
        )
      case "display-setup":
        return (
          <DisplaySetupForm
            onNext={() => setCurrentStep("payment-info")}
            onPrevious={() => setCurrentStep("verification")}
          />
        )
      case "payment-info":
        return (
          <PaymentInfoForm
            onNext={() => setCurrentStep("messaging")}
            onPrevious={() => setCurrentStep("display-setup")}
          />
        )
      case "messaging":
        return <MessagingSetupForm onNext={handleComplete} onPrevious={() => setCurrentStep("payment-info")} />
      case "completed":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold">Profile Setup Complete!</h1>
              <p className="text-muted-foreground">
                Congratulations! Your instructor profile has been successfully created.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
                <CardDescription>Here are some things you can do now</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={() => setCurrentStep("calendar")} className="w-full">
                  View Your Lesson Calendar
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Preview Your Public Profile
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Start Finding Students
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      case "calendar":
        return <LessonCalendar />
      default:
        return <BasicInfoForm onNext={() => setCurrentStep("contact-details")} />
    }
  }

  return (
    <SidebarProvider>
      <ProfileSidebar currentStep={currentStep} onStepChange={setCurrentStep} />
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Profile Setup</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{stepTitles[currentStep as keyof typeof stepTitles]}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 overflow-auto p-4">{renderCurrentForm()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
