"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full -top-48 -left-48 mix-blend-overlay animate-blob1"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full top-1/2 right-0 mix-blend-overlay animate-blob2"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/30 rounded-full bottom-0 left-1/4 mix-blend-overlay animate-blob3"></div>
      </div>

      {/* User button in top right corner */}
      <div className="absolute top-4 right-4 z-50">
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Main content */}
      <div className="text-center space-y-8 max-w-2xl mx-auto relative z-10">
        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
          Welcome to Your AI GURU
        </h1>
        
        <p className="text-xl text-gray-200 mb-8 animate-slide-up delay-100">
         Create you own course Using AI, Learn and Groww with AI..
        </p>

        <Button 
          onClick={() => router.push('/dashboard')}
          className="px-8 py-6 text-xl rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          🚀 Get Start 
        </Button>
      </div>

      {/* Optional decorative elements */}
      <div className="absolute bottom-4 text-gray-200 text-sm z-10">
        Start managing your workflow like a pro
      </div>
    </div>
  );
}