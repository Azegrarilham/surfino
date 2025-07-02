import { Button } from "@/components/ui/button";
import { MapPinIcon, StarIcon, TrendingUpIcon, AwardIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Rating, RatingButton } from "../rating";

const teamMembers = [
    {
        name: "Ahmed Benali",
        title: "Beginner to Advanced",
        bio: "Professional surfer with 15+ years experience. Specializes in wave reading and technique refinement.",
        imageUrl: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
        location: "Taghazout",
        level: "Expert",
        hourlyRate: 75,
        rating: 4.9,
        reviewCount: 127,
        yearsExperience: 15,
        languages: ["English", "Arabic", "French"]
    },
    {
        name: "Fatima El Mansouri",
        title: "All Levels",
        bio: "Former competitive surfer turned instructor. Expert in longboard techniques and ocean safety.",
        imageUrl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
        location: "Essaouira",
        level: "Expert",
        hourlyRate: 80,
        rating: 4.8,
        reviewCount: 89,
        yearsExperience: 12,
        languages: ["English", "Arabic", "German"]
    },
    {
        name: "Youssef Amrani",
        title: "Advanced",
        bio: "Shortboard specialist and former national champion. Focuses on performance surfing and competition prep.",
        imageUrl: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
        location: "Anchor Point",
        level: "Expert",
        hourlyRate: 85,
        rating: 4.9,
        reviewCount: 156,
        yearsExperience: 18,
        languages: ["English", "Arabic", "Spanish"]
    },
    {
        name: "Omar Idrissi",
        title: "Beginners",
        bio: "Patient and encouraging instructor perfect for first-time surfers. Safety-certified and ocean rescue trained.",
        imageUrl: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
        location: "Imsouane",
        level: "Advanced",
        hourlyRate: 55,
        rating: 4.7,
        reviewCount: 203,
        yearsExperience: 7,
        languages: ["English", "Arabic", "French"]
    },
    {
        name: "Karim Bouhali",
        title: "All Levels",
        bio: "Versatile instructor with expertise in both longboard and shortboard. Great for progression coaching.",
        imageUrl: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
        location: "Tamraght",
        level: "Advanced",
        hourlyRate: 65,
        rating: 4.6,
        reviewCount: 94,
        yearsExperience: 9,
        languages: ["English", "Arabic", "Dutch"]
    },
    {
        name: "Aicha Benomar",
        title: "All Levels",
        bio: "Women's surfing specialist and yoga instructor. Combines mindfulness with surf coaching.",
        imageUrl: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
        location: "Taghazout",
        level: "Advanced",
        hourlyRate: 70,
        rating: 4.8,
        reviewCount: 112,
        yearsExperience: 10,
        languages: ["English", "Arabic", "French", "Italian"]
    },
    {
        name: "Hassan Ziani",
        title: "Intermediate to Advanced",
        bio: "Technical coach specializing in wave selection and advanced maneuvers. Former professional surfer.",
        imageUrl: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
        location: "Anza",
        level: "Expert",
        hourlyRate: 90,
        rating: 4.9,
        reviewCount: 78,
        yearsExperience: 20,
        languages: ["English", "Arabic", "Portuguese"]
    },
    {
        name: "Nadia Rharbi",
        title: "All Levels",
        bio: "Enthusiastic instructor with focus on building confidence. Specializes in SUP and traditional surfing.",
        imageUrl: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=600",
        location: "Mirleft",
        level: "Advanced",
        hourlyRate: 60,
        rating: 4.7,
        reviewCount: 145,
        yearsExperience: 8,
        languages: ["English", "Arabic", "French"]
    },
];

const Instructors = () => {
    return (
        <div className="flex flex-col justify-center py-12 sm:py-16 px-6 lg:px-8 max-w-screen-xl mx-auto gap-16">
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-ocean-blue/10 to-surf-teal/10 text-ocean-blue font-medium text-sm mb-6">
                    <AwardIcon className="w-4 h-4 mr-2" />
                    Professional Instructors
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text ">
                    Meet Our Instructors
                </h2>

                <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
                    Our philosophy is simple — hire professional local surf instructors for all skill levels.
                    From your first wave to competition prep, experience the best of Morocco's surf culture.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-4">
                    <Button
                        size="lg"
                        className=" hover:from-ocean-blue/90 hover:to-surf-teal/90 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Book a Lesson
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300"
                    >
                        About us
                    </Button>
                </div>
            </div>

            {/* Instructors Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {teamMembers.map((member) => (
                    <div
                        key={member.name}
                        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-ocean-blue/20"
                    >
                        {/* Image Section */}
                        <div className="relative overflow-hidden">
                            <Image
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                                width={400}
                                height={400}
                            />

                            {/* Level Badge */}
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${member.level === 'Expert'
                                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white'
                                        : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                                    }`}>
                                    {member.level}
                                </span>
                            </div>

                            {/* Experience Badge */}
                            <div className="absolute top-4 right-4">
                                <span className="bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm">
                                    {member.yearsExperience}+ years
                                </span>
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Content Section */}
                        <div className="p-3 space-y-2">
                            {/* Name and Title */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-ocean-blue transition-colors duration-200">
                                    {member.name}
                                </h3>
                                <p className="text-surf-teal font-medium text-sm mt-1">
                                    {member.title}
                                </p>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPinIcon className="w-4 h-4 text-moroccan-gold" />
                                <span className="text-sm font-medium">{member.location}</span>
                            </div>

                            {/* Rating and Reviews */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        <StarIcon className="w-4 h-4 fill-moroccan-gold text-moroccan-gold" />
                                        <span className="text-sm font-bold text-gray-900 ml-1">
                                            {member.rating}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        ({member.reviewCount} reviews)
                                    </span>
                                </div>

                                <div className="text-right">
                                    <div className="text-xs text-gray-500">from</div>
                                    <div className="text-lg font-bold text-ocean-blue">
                                        ${member.hourlyRate}
                                        <span className="text-sm font-normal text-gray-500">/hr</span>
                                    </div>
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="flex flex-wrap gap-1">
                                {member.languages.slice(0, 3).map((lang) => (
                                    <span
                                        key={lang}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>

                            {/* Action Button */}
                            <Button
                                className="w-full hover:from-ocean-blue/90 hover:to-surf-teal/90 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                asChild
                            >
                                <Link href={`/instructor/${member.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                    View Profile & Book
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-1">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-moroccan-gold/10 to-terracotta/10 rounded-full">
                    <TrendingUpIcon className="w-5 h-5 text-moroccan-gold mr-2" />
                    <span className="text-moroccan-gold font-semibold">
                        All instructors are vertified and insured
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Instructors;
