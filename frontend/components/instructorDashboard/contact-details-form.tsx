"use client"
import { Mail, Phone, Globe, Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ContactDetailsFormProps {
  onNext: () => void
  onPrevious: () => void
}

export function ContactDetailsForm({ onNext, onPrevious }: ContactDetailsFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Details</h1>
        <p className="text-muted-foreground">
          Provide your contact information so students can reach you and we can verify your account
        </p>
      </div>

      <Alert>
        <Mail className="h-4 w-4" />
        <AlertDescription>
          Your email will be used for account verification and important notifications. Phone number helps with account
          security and can be used by students to contact you.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Information
            </CardTitle>
            <CardDescription>Primary email for your instructor account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" required />
              <p className="text-xs text-muted-foreground">This will be your primary login email</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-email">Backup Email (Optional)</Label>
              <Input id="backup-email" type="email" placeholder="backup@example.com" />
              <p className="text-xs text-muted-foreground">Used for account recovery</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="email-notifications" defaultChecked />
              <Label htmlFor="email-notifications" className="text-sm">
                Receive email notifications about new students and messages
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Phone Information
            </CardTitle>
            <CardDescription>Phone number for verification and contact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
              <p className="text-xs text-muted-foreground">Include country code for international numbers</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number (Optional)</Label>
              <Input id="whatsapp" type="tel" placeholder="+1 (555) 123-4567" />
              <p className="text-xs text-muted-foreground">If different from your main phone number</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="sms-notifications" />
                <Label htmlFor="sms-notifications" className="text-sm">
                  Receive SMS notifications for urgent messages
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="phone-visible" />
                <Label htmlFor="phone-visible" className="text-sm">
                  Make phone number visible to students
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Social Media & Online Presence
          </CardTitle>
          <CardDescription>
            Add your social media profiles to help students learn more about you (all optional)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Personal Website
              </Label>
              <Input id="website" type="url" placeholder="https://yourwebsite.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn Profile
              </Label>
              <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/yourprofile" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook" className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                Facebook Page
              </Label>
              <Input id="facebook" type="url" placeholder="https://facebook.com/yourpage" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Instagram
              </Label>
              <Input id="instagram" type="url" placeholder="https://instagram.com/yourusername" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter/X
              </Label>
              <Input id="twitter" type="url" placeholder="https://twitter.com/yourusername" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube" className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                YouTube Channel
              </Label>
              <Input id="youtube" type="url" placeholder="https://youtube.com/c/yourchannel" />
            </div>
          </div>

          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="social-media-visible" />
              <Label htmlFor="social-media-visible" className="text-sm font-medium">
                Display social media links on my public profile
              </Label>
            </div>
            <p className="text-xs text-muted-foreground ml-6">
              Students will be able to see and visit your social media profiles to learn more about your background and
              teaching style.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy & Communication Preferences</CardTitle>
          <CardDescription>Control how students can contact you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="direct-contact" defaultChecked />
              <Label htmlFor="direct-contact" className="text-sm">
                Allow students to contact me directly via email
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="platform-messages" defaultChecked />
              <Label htmlFor="platform-messages" className="text-sm">
                Receive messages through the platform messaging system
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="phone-contact" />
              <Label htmlFor="phone-contact" className="text-sm">
                Allow students to contact me via phone/WhatsApp
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="marketing-emails" />
              <Label htmlFor="marketing-emails" className="text-sm">
                Receive marketing emails about platform updates and opportunities
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous Step
        </Button>
        <Button onClick={onNext}>Continue to Location & Preferences</Button>
      </div>
    </div>
  )
}
