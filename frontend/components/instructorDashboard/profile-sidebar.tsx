"use client"

import type * as React from "react"
import { User, MapPin, Mail, CreditCard, Shield, MessageSquare, CheckCircle, Circle, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const profileSteps = [
  {
    id: "basic-info",
    title: "Basic Information",
    icon: User,
    description: "Name, birth date, location",
    completed: false,
  },
  {
    id: "contact-details",
    title: "Contact Details",
    icon: Mail,
    description: "Email, phone, social media",
    completed: false,
  },
  {
    id: "location-preferences",
    title: "Location & Preferences",
    icon: MapPin,
    description: "Search location, languages",
    completed: false,
  },
  {
    id: "verification",
    title: "Verification",
    icon: Shield,
    description: "Email & identity verification",
    completed: false,
  },
  {
    id: "display-setup",
    title: "Display Setup",
    icon: Settings,
    description: "Profile visibility settings",
    completed: false,
  },
  {
    id: "payment-info",
    title: "Payment Information",
    icon: CreditCard,
    description: "Billing and payment setup",
    completed: false,
  },
  {
    id: "messaging",
    title: "Messaging Setup",
    icon: MessageSquare,
    description: "Communication preferences",
    completed: false,
  },
]

interface ProfileSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentStep: string
  onStepChange: (stepId: string) => void
}

export function ProfileSidebar({ currentStep, onStepChange, ...props }: ProfileSidebarProps) {
  const completedSteps = profileSteps.filter((step) => step.completed).length
  const currentStepIndex = profileSteps.findIndex((step) => step.id === currentStep)
  const progressPercentage = (completedSteps / profileSteps.length) * 100

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Instructor Profile</span>
            <span className="truncate text-xs text-muted-foreground">Setup Process</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Profile Creation Steps</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileSteps.map((step, index) => {
                const isCurrent = step.id === currentStep
                const isAccessible = index <= currentStepIndex || step.completed

                return (
                  <SidebarMenuItem key={step.id}>
                    <SidebarMenuButton
                      asChild={isAccessible}
                      className={isCurrent ? "bg-accent text-accent-foreground" : ""}
                      disabled={!isAccessible}
                    >
                      {isAccessible ? (
                        <button
                          onClick={() => onStepChange(step.id)}
                          className="flex items-center gap-3 w-full text-left"
                        >
                          <div className="flex items-center justify-center">
                            {step.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : isCurrent ? (
                              <Circle className="h-4 w-4 text-blue-600 fill-blue-600" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <step.icon className="h-4 w-4" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{step.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{step.description}</div>
                          </div>
                          {isCurrent && (
                            <Badge variant="secondary" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </button>
                      ) : (
                        <div className="flex items-center gap-3 w-full opacity-50 cursor-not-allowed">
                          <div className="flex items-center justify-center">
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <step.icon className="h-4 w-4" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{step.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{step.description}</div>
                          </div>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-center">
          <div className="text-sm font-medium">Progress</div>
          <div className="text-xs text-muted-foreground">
            {completedSteps} of {profileSteps.length} steps completed
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full">
            <div
              className="h-2 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
