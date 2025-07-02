"use client"
import { Settings, Eye, Users, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DisplaySetupFormProps {
  onNext: () => void
  onPrevious: () => void
}

export function DisplaySetupForm({ onNext, onPrevious }: DisplaySetupFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Display Setup</h1>
        <p className="text-muted-foreground">
          Configure how your profile appears to students and manage your visibility settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Profile Visibility
          </CardTitle>
          <CardDescription>Control who can see your profile and contact you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="profile-public">Make profile public</Label>
              <p className="text-sm text-muted-foreground">Allow anyone to find and view your instructor profile</p>
            </div>
            <Switch id="profile-public" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="anonymous-browsing">Allow anonymous browsing</Label>
              <p className="text-sm text-muted-foreground">
                Let students view your profile without creating an account
              </p>
            </div>
            <Switch id="anonymous-browsing" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-contact">Show contact information</Label>
              <p className="text-sm text-muted-foreground">
                Display your email and phone number on your public profile
              </p>
            </div>
            <Switch id="show-contact" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Student Interaction Settings
          </CardTitle>
          <CardDescription>Configure how students can interact with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="booking-approval">Lesson Booking Approval</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select approval method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automatic">Automatic approval</SelectItem>
                <SelectItem value="manual">Manual approval required</SelectItem>
                <SelectItem value="instant-payment">Instant with payment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="instant-messaging">Enable instant messaging</Label>
              <p className="text-sm text-muted-foreground">Allow students to send you messages directly</p>
            </div>
            <Switch id="instant-messaging" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="group-lessons">Accept group lesson requests</Label>
              <p className="text-sm text-muted-foreground">Allow students to book group sessions</p>
            </div>
            <Switch id="group-lessons" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Profile Enhancement
          </CardTitle>
          <CardDescription>Additional settings to make your profile stand out</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="availability-status">Availability Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your current status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available for new students</SelectItem>
                <SelectItem value="limited">Limited availability</SelectItem>
                <SelectItem value="busy">Currently busy</SelectItem>
                <SelectItem value="vacation">On vacation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="response-time">Expected Response Time</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="How quickly do you respond?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Within 1 hour</SelectItem>
                <SelectItem value="same-day">Same day</SelectItem>
                <SelectItem value="24-hours">Within 24 hours</SelectItem>
                <SelectItem value="48-hours">Within 48 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="special-message">Special Message for Students</Label>
            <Textarea
              id="special-message"
              placeholder="Add a special welcome message or current announcement for potential students..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Settings className="h-4 w-4" />
        <AlertDescription>
          You can change these settings anytime from your profile dashboard after completing the setup.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous Step
        </Button>
        <Button onClick={onNext}>Continue to Payment Info</Button>
      </div>
    </div>
  )
}
