"use client"
import { CreditCard, DollarSign, BanknoteIcon as Bank, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

interface PaymentInfoFormProps {
  onNext: () => void
  onPrevious: () => void
}

export function PaymentInfoForm({ onNext, onPrevious }: PaymentInfoFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Information</h1>
        <p className="text-muted-foreground">Set up your payment details to receive payments from students</p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          All payment information is encrypted and securely stored. We use industry-standard security measures to
          protect your financial data.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pricing & Rates
          </CardTitle>
          <CardDescription>Set your hourly rates and pricing structure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hourly-rate">Hourly Rate (USD) *</Label>
              <Input id="hourly-rate" type="number" placeholder="25.00" min="0" step="0.01" required />
              <p className="text-xs text-muted-foreground">Your standard rate per hour</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-rate">Group Lesson Rate (USD)</Label>
              <Input id="group-rate" type="number" placeholder="15.00" min="0" step="0.01" />
              <p className="text-xs text-muted-foreground">Rate per student for group lessons</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Preferred Currency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD - US Dollar</SelectItem>
                <SelectItem value="eur">EUR - Euro</SelectItem>
                <SelectItem value="gbp">GBP - British Pound</SelectItem>
                <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                <SelectItem value="aud">AUD - Australian Dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="flexible-pricing" />
            <Label htmlFor="flexible-pricing" className="text-sm">
              Allow students to negotiate pricing for long-term commitments
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bank className="h-5 w-5" />
            Bank Account Information
          </CardTitle>
          <CardDescription>Where you'd like to receive your payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-holder">Account Holder Name *</Label>
            <Input id="account-holder" placeholder="Full name as it appears on your bank account" required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank Name *</Label>
              <Input id="bank-name" placeholder="Name of your bank" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number *</Label>
              <Input id="account-number" placeholder="Your account number" required />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="routing-number">Routing Number *</Label>
              <Input id="routing-number" placeholder="Bank routing number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="swift-code">SWIFT/BIC Code</Label>
              <Input id="swift-code" placeholder="For international transfers" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
          <CardDescription>Choose how you want to accept payments from students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="platform-payment" defaultChecked />
              <Label htmlFor="platform-payment" className="text-sm">
                Platform payment system (Recommended)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="paypal" />
              <Label htmlFor="paypal" className="text-sm">
                PayPal
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="stripe" />
              <Label htmlFor="stripe" className="text-sm">
                Stripe
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="bank-transfer" />
              <Label htmlFor="bank-transfer" className="text-sm">
                Direct bank transfer
              </Label>
            </div>
          </div>
          <Alert>
            <CreditCard className="h-4 w-4" />
            <AlertDescription>
              Using our platform payment system provides the best protection for both you and your students, with
              automatic dispute resolution and secure transactions.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
          <CardDescription>When and how you'd like to receive payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment-schedule">Payment Frequency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="How often do you want to be paid?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">After each lesson</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="advance-payment" />
            <Label htmlFor="advance-payment" className="text-sm">
              Require payment in advance for all lessons
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous Step
        </Button>
        <Button onClick={onNext}>Continue to Messaging Setup</Button>
      </div>
    </div>
  )
}
