"use client"
import { MapPin, Globe, Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface LocationPreferencesFormProps {
  onNext: () => void
  onPrevious: () => void
}

export function LocationPreferencesForm({ onNext, onPrevious }: LocationPreferencesFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Location & Preferences</h1>
        <p className="text-muted-foreground">Set your teaching location preferences and language capabilities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Search Location
            </CardTitle>
            <CardDescription>Where would you like to teach or offer your services?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
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
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input id="state" placeholder="Enter state or province" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="radius">Search Radius (km)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                  <SelectItem value="25">25 km</SelectItem>
                  <SelectItem value="50">50 km</SelectItem>
                  <SelectItem value="100">100 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Languages
            </CardTitle>
            <CardDescription>What languages can you teach or communicate in?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="english" defaultChecked />
                <Label htmlFor="english">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="spanish" />
                <Label htmlFor="spanish">Spanish</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="french" />
                <Label htmlFor="french">French</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="german" />
                <Label htmlFor="german">German</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mandarin" />
                <Label htmlFor="mandarin">Mandarin</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="other-languages">Other Languages</Label>
              <Input id="other-languages" placeholder="List other languages you speak" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Teaching Preferences
          </CardTitle>
          <CardDescription>Tell us about your teaching style and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="subjects">Subjects You Teach</Label>
              <Textarea
                id="subjects"
                placeholder="List the subjects or skills you can teach..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Teaching Experience</Label>
              <Textarea
                id="experience"
                placeholder="Describe your teaching experience and qualifications..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="teaching-style">Teaching Style & Approach</Label>
            <Textarea
              id="teaching-style"
              placeholder="Describe your teaching methodology and what makes you unique..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous Step
        </Button>
        <Button onClick={onNext}>Continue to Verification</Button>
      </div>
    </div>
  )
}
