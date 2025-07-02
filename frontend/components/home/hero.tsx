import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import Calendar30 from "../calander/calandr";

const Hero = () => {
    return (
        <div className="flex items-center justify-center px-6  bg-cover bg-cover bg-center pb-20" style={{
            backgroundImage: "url('https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg')"
        }}>
            <div className="text-center max-w-2xl pt-10">
                <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none text-black drop-shadow-lg">
                    Just released v1.0.0
                </Badge>
                <h1 className="mt-6 text-4xl sm:text-4xl md:text-5xl md:leading-[1.2] font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    Morocco’s easiest way to book a surf lesson.
                </h1>
                <p className="mt-6 text-[17px] md:text-xl text-white">
                    Where Atlantic Waves Meet Amazigh Heritage
                </p>
                <div className="mt-12 flex items-center justify-center gap-4">
                    <Command>
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList>
                        </CommandList>
                    </Command>
                    <Calendar30/>
                </div>
            </div>
        </div>
    );
};

export default Hero;
