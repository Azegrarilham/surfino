
'use client';
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { Home, Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { UserAvatar } from "@/components/user-avatar";

const Navbar = () => {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();

    return (
        <nav className="h-16 bg-background border-b">
            <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <Logo />

                {/* Desktop Menu */}
                <NavMenu className="hidden md:block" />

                <div className="flex items-center gap-3">
                    {isAuthenticated && user ? (
                        <UserAvatar />
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                className="inline-flex"
                                onClick={() => router.push("/login")}
                            >
                                Sign In
                            </Button>
                            <Button onClick={() => router.push("/signup")}>
                                Get Started
                            </Button>
                        </>
                    )}

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <NavigationSheet />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
