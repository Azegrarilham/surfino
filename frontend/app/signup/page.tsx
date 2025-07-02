"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { Home, Eye, EyeOff, CheckCircle, X, Users, BookOpen, Star, Shield } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { Logo } from "@/components/navbar/logo"

const formSchema = z
    .object({
        email: z.string().email("Please enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
        confirmPassword: z.string(),
        firstName: z.string().min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
        subscribeNewsletter: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [accountType, setAccountType] = useState<"student" | "instructor" | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            agreeToTerms: false,
            subscribeNewsletter: false,
        },
        resolver: zodResolver(formSchema),
    })

    const password = form.watch("password")

    const passwordRequirements = [
        { label: "At least 8 characters", met: password.length >= 8 },
        { label: "One uppercase letter", met: /[A-Z]/.test(password) },
        { label: "One lowercase letter", met: /[a-z]/.test(password) },
        { label: "One number", met: /[0-9]/.test(password) },
        { label: "One special character", met: /[^A-Za-z0-9]/.test(password) },
    ]

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log({ ...data, accountType })
        // Handle form submission based on account type
        if (accountType === "instructor") {
            // Redirect to instructor profile setup
            window.location.href = "/profile-setup"
        } else {
            // Handle regular student signup
            console.log("Student signup completed")
        }
    }

    const handleGoogleSignUp = () => {
        console.log("Google signup initiated")
        // Handle Google OAuth
    }

    if (!accountType) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="w-full max-w-4xl">
                    <div className="text-center mb-8">
                        <Logo className="ml-100"/>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Join Surfino Community</h1>
                        <p className="text-lg text-gray-600">Choose how you'd like to get started</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card
                            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
                            onClick={() => setAccountType("student")}
                        >
                            <CardHeader className="text-center">
                                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-blue-600" />
                                </div>
                                <CardTitle className="text-2xl">I'm a Student</CardTitle>
                                <CardDescription className="text-base">Learn to surf with professional instructors</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>Find certified surf instructors</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>Book lessons at your convenience</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>Track your progress</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>Join a community of surfers</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card
                            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-500"
                            onClick={() => setAccountType("instructor")}
                        >
                            <CardHeader className="text-center">
                                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="h-8 w-8 text-green-600" />
                                </div>
                                <CardTitle className="text-2xl">I'm an Instructor</CardTitle>
                                <CardDescription className="text-base">Share your expertise and earn money teaching</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>Create your instructor profile</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>Set your own rates and schedule</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>Manage bookings and payments</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>Build your teaching business</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600 hover:underline font-medium">
                                Log in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-5 bg-white">
                <div className="w-full max-w-md">
                    <div className="text-center">
                        <Button
                            variant="ghost"
                            onClick={() => setAccountType(null)}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← Back to account type selection
                        </Button>
                        <Logo className="ml-45" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Sign up as {accountType === "instructor" ? "an Instructor" : "a Student"}
                        </h1>
                        <Badge variant={accountType === "instructor" ? "default" : "secondary"} className="mb-4">
                            {accountType === "instructor" ? (
                                <>
                                    <BookOpen className="h-3 w-3 mr-1" />
                                    Instructor Account
                                </>
                            ) : (
                                <>
                                    <Users className="h-3 w-3 mr-1" />
                                    Student Account
                                </>
                            )}
                        </Badge>
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600 hover:underline font-medium">
                                Log in
                            </Link>
                        </p>
                    </div>

                    <Button onClick={handleGoogleSignUp} variant="outline" className="w-full mb-6 h-12 bg-transparent">
                        <GoogleLogo />
                        Continue with Google
                    </Button>

                    <div className="relative mb-6">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                            OR
                        </span>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Create a strong password"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        {password && (
                                            <div className="mt-2 space-y-1">
                                                {passwordRequirements.map((req, index) => (
                                                    <div key={index} className="flex items-center gap-2 text-xs">
                                                        {req.met ? (
                                                            <CheckCircle className="h-3 w-3 text-green-500" />
                                                        ) : (
                                                            <X className="h-3 w-3 text-red-500" />
                                                        )}
                                                        <span className={req.met ? "text-green-600" : "text-red-600"}>{req.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirm your password"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="agreeToTerms"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm">
                                                I agree to the{" "}
                                                <Link href="/terms" className="text-blue-600 hover:underline">
                                                    Terms of Service
                                                </Link>{" "}
                                                and{" "}
                                                <Link href="/privacy" className="text-blue-600 hover:underline">
                                                    Privacy Policy
                                                </Link>
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="subscribeNewsletter"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm">Subscribe to our newsletter for surf tips and updates</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full h-12 text-base font-medium">
                                {accountType === "instructor" ? "Create Instructor Account" : "Create Student Account"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="hidden lg:flex lg:flex-1 relative">
                <div
                    className="w-full bg-cover bg-center relative"
                    style={{
                        backgroundImage: "url('https://images.pexels.com/photos/4603876/pexels-photo-4603876.jpeg')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-12">
                        <div className="text-center max-w-lg">
                            <h2 className="text-5xl font-bold mb-6" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                                {accountType === "instructor" ? "Teach & Inspire" : "Ride the Wave"}
                            </h2>
                            <p className="text-xl mb-8" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}>
                                {accountType === "instructor"
                                    ? "Share your passion for surfing and build a thriving teaching business with our platform."
                                    : "Professional surf instruction for all skill levels. From your first wave to competition prep."}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center justify-center mb-2">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div className="text-2xl font-bold">10K+</div>
                                    <div className="text-sm">Active Members</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center justify-center mb-2">
                                        <Star className="h-6 w-6" />
                                    </div>
                                    <div className="text-2xl font-bold">4.9</div>
                                    <div className="text-sm">Average Rating</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center justify-center mb-2">
                                        <BookOpen className="h-6 w-6" />
                                    </div>
                                    <div className="text-2xl font-bold">500+</div>
                                    <div className="text-sm">Expert Instructors</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center justify-center mb-2">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <div className="text-2xl font-bold">100%</div>
                                    <div className="text-sm">Secure Platform</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const GoogleLogo = () => (
    <svg
        width="1.2em"
        height="1.2em"
        id="icon-google"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block shrink-0 align-sub text-[inherit] size-lg mr-2"
    >
        <g clipPath="url(#clip0)">
            <path
                d="M15.6823 8.18368C15.6823 7.63986 15.6382 7.0931 15.5442 6.55811H7.99829V9.63876H12.3194C12.1401 10.6323 11.564 11.5113 10.7203 12.0698V14.0687H13.2983C14.8122 12.6753 15.6823 10.6176 15.6823 8.18368Z"
                fill="#4285F4"
            />
            <path
                d="M7.99812 16C10.1558 16 11.9753 15.2915 13.3011 14.0687L10.7231 12.0698C10.0058 12.5578 9.07988 12.8341 8.00106 12.8341C5.91398 12.8341 4.14436 11.426 3.50942 9.53296H0.849121V11.5936C2.2072 14.295 4.97332 16 7.99812 16Z"
                fill="#34A853"
            />
            <path
                d="M3.50665 9.53295C3.17154 8.53938 3.17154 7.4635 3.50665 6.46993V4.4093H0.849292C-0.285376 6.66982 -0.285376 9.33306 0.849292 11.5936L3.50665 9.53295Z"
                fill="#FBBC04"
            />
            <path
                d="M7.99812 3.16589C9.13867 3.14825 10.241 3.57743 11.067 4.36523L13.3511 2.0812C11.9048 0.723121 9.98526 -0.0235266 7.99812 -1.02057e-05C4.97332 -1.02057e-05 2.2072 1.70493 0.849121 4.40932L3.50648 6.46995C4.13848 4.57394 5.91104 3.16589 7.99812 3.16589Z"
                fill="#EA4335"
            />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="15.6825" height="16" fill="white" />
            </clipPath>
        </defs>
    </svg>
)

export default SignUpPage
