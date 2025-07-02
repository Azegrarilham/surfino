"use client"
import { MessageSquare, Bell, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MessagingSetupFormProps {
  onNext: () => void
  onPrevious: () => void
}

export function MessagingSetupForm({ onNext, onPrevious }: MessagingSetupFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messaging Setup</h1>
        <p className="text-muted-foreground">Configure your communication preferences and messaging settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Communication Preferences
          </CardTitle>
          <CardDescription>How would you like to communicate with students?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="platform-messaging">Platform messaging</Label>
              <p className="text-sm text-muted-foreground">Use our built-in messaging system</p>
            </div>
            <Switch id="platform-messaging" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-messaging">Email communication</Label>
              <p className="text-sm text-muted-foreground">Allow direct email communication</p>
            </div>
            <Switch id="email-messaging" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="video-calls">Video call scheduling</Label>
              <p className="text-sm text-muted-foreground">Enable video call booking for lessons</p>
            </div>
            <Switch id="video-calls" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Choose when and how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="new-messages" defaultChecked />
              <Label htmlFor="new-messages" className="text-sm">
                New message notifications
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lesson-reminders" defaultChecked />
              <Label htmlFor="lesson-reminders" className="text-sm">
                Lesson reminder notifications
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="booking-requests" defaultChecked />
              <Label htmlFor="booking-requests" className="text-sm">
                New booking request notifications
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="payment-notifications" defaultChecked />
              <Label htmlFor="payment-notifications" className="text-sm">
                Payment received notifications
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="review-notifications" />
              <Label htmlFor="review-notifications" className="text-sm">
                New review notifications
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Response Time Settings
          </CardTitle>
          <CardDescription>Set expectations for your response times</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="response-time">Expected Response Time</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="How quickly do you typically respond?" />
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
            <Label htmlFor="availability-hours">Available Hours</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="When are you typically available?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business hours (9 AM - 5 PM)</SelectItem>
                <SelectItem value="extended">Extended hours (7 AM - 9 PM)</SelectItem>
                <SelectItem value="flexible">Flexible schedule</SelectItem>
                <SelectItem value="evenings">Evenings and weekends</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Auto-Response Messages
          </CardTitle>
          <CardDescription>Set up automatic responses for common situations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="welcome-message">Welcome Message</Label>
            <Textarea
              id="welcome-message"
              placeholder="Thank you for your interest! I'm excited to help you learn..."
              className="min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground">Sent automatically when a new student contacts you</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="away-message">Away Message</Label>
            <Textarea
              id="away-message"
              placeholder="I'm currently away but will respond to your message as soon as possible..."
              className="min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground">Sent when you're not available</p>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="auto-responses" />
            <Label htmlFor="auto-responses" className="text-sm">
              Enable automatic responses
            </Label>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <MessageSquare className="h-4 w-4" />
        <AlertDescription>
          Good communication is key to successful teaching relationships. These settings help you manage student
          expectations and maintain professional communication.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous Step
        </Button>
        <Button onClick={onNext}>Complete Profile Setup</Button>
      </div>
    </div>
  )
}
