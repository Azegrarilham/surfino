"use client"
import { User, MapPin, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface BasicInfoFormProps {
  onNext: () => void
}

export function BasicInfoForm({ onNext }: BasicInfoFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Your Instructor Profile</h1>
        <p className="text-muted-foreground">
          Let's start with your basic information to create your instructor profile
        </p>
      </div>

      <Alert>
        <User className="h-4 w-4" />
        <AlertDescription>
          This information will be used to create your public instructor profile. Make sure all details are accurate as
          they will be visible to potential students.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>Provide your basic personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name *</Label>
              <Input id="first-name" placeholder="Enter your first name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name *</Label>
              <Input id="last-name" placeholder="Enter your last name" required />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="birth-date">Date of Birth *</Label>
              <Input id="birth-date" type="date" required />
              <p className="text-xs text-muted-foreground">Must be 18 years or older to register</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender (Optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Current Location
          </CardTitle>
          <CardDescription>Where are you currently based?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="es">Spain</SelectItem>
                <SelectItem value="it">Italy</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="mx">Mexico</SelectItem>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="cn">China</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="state">State/Province *</Label>
              <Input id="state" placeholder="Enter state or province" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input id="city" placeholder="Enter city" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="postal-code">Postal/ZIP Code (Optional)</Label>
            <Input id="postal-code" placeholder="Enter postal or ZIP code" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Identity Information
          </CardTitle>
          <CardDescription>Required for verification and security purposes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="passport-number">Passport Number *</Label>
            <Input id="passport-number" placeholder="Enter passport number" required />
            <p className="text-xs text-muted-foreground">
              This information is kept secure and used only for identity verification
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="passport-country">Passport Issuing Country *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="it">Italy</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passport-expiry">Passport Expiry Date *</Label>
              <Input id="passport-expiry" type="date" required />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Introduction</CardTitle>
          <CardDescription>Tell potential students about yourself and what you teach</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio/Introduction *</Label>
            <Textarea
              id="bio"
              placeholder="Write a brief introduction about yourself, your teaching experience, and what subjects you specialize in..."
              className="min-h-[120px]"
              required
            />
            <p className="text-xs text-muted-foreground">
              This will be displayed on your public profile. Minimum 50 characters.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="teaching-subjects">Primary Teaching Subjects *</Label>
            <Input
              id="teaching-subjects"
              placeholder="e.g., Mathematics, English, Piano, Guitar, Programming..."
              required
            />
            <p className="text-xs text-muted-foreground">
              List the main subjects or skills you teach, separated by commas
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" disabled>
          Previous Step
        </Button>
        <Button onClick={onNext}>Continue to Contact Details</Button>
      </div>
    </div>
  )
}
