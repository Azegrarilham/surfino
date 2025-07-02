"use client"
import { Shield, Mail, Phone, FileText, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface VerificationFormProps {
  onNext: () => void
  onPrevious: () => void
}

export function VerificationForm({ onNext, onPrevious }: VerificationFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Account Verification</h1>
        <p className="text-muted-foreground">
          Verify your email and identity to build trust with students and access all platform features
        </p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Verification helps ensure the safety and security of our platform for both instructors and students.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Verification
          </CardTitle>
          <CardDescription>Verify your email address to secure your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">john.doe@example.com</p>
                <p className="text-sm text-muted-foreground">Primary email address</p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Resend Verification Email
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Phone Verification
          </CardTitle>
          <CardDescription>Verify your phone number for additional security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">+1 (555) 123-4567</p>
                <p className="text-sm text-muted-foreground">Primary phone number</p>
              </div>
            </div>
            <Badge variant="secondary">Pending</Badge>
          </div>
          <div className="space-y-2">
            <Label htmlFor="verification-code">Verification Code</Label>
            <Input id="verification-code" placeholder="Enter 6-digit code" maxLength={6} />
            <p className="text-xs text-muted-foreground">We've sent a verification code to your phone number</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              Resend Code
            </Button>
            <Button className="flex-1">Verify Phone</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Identity Verification
          </CardTitle>
          <CardDescription>Upload documents to verify your identity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Passport/ID Document</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload a clear photo of your passport or government ID
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Proof of Address</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload a utility bill or bank statement (last 3 months)
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </div>
          </div>
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              Documents are processed within 24-48 hours. All information is kept secure and confidential.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous Step
        </Button>
        <Button onClick={onNext}>Continue to Display Setup</Button>
      </div>
    </div>
  )
}
