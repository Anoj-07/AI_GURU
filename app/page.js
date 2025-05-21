"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 relative">
      {/* User button in top right corner */}
      <div className="absolute top-4 right-4">
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Main content */}
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
          Welcome to Your Dashboard
        </h1>
        
        <p className="text-xl text-gray-200 mb-8 animate-slide-up delay-100">
          Manage your projects, track progress, and collaborate with your team seamlessly.
        </p>

        <Button 
          onClick={() => router.push('/dashboard')}
          className="px-8 py-6 text-xl rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg transition-all duration-300 hover:scale-105"
        >
          🚀 Launch Dashboard
        </Button>
      </div>

      {/* Optional decorative elements */}
      <div className="absolute bottom-4 text-gray-200 text-sm">
        Start managing your workflow like a pro
      </div>
    </div>
  );
}