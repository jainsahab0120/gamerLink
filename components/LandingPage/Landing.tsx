"use client";
import Link from "next/link";
import { Twitch, Youtube, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../global/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main>
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to GamerLink
            </h2>
            <p className="text-xl mb-8">
              Your ultimate destination for game streaming and community
            </p>
            <Link href="/register">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={
                  <Twitch className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                }
                title="Live Streaming"
                description="Stream your gameplay live to thousands of viewers"
              />
              <FeatureCard
                icon={
                  <Youtube className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                }
                title="Video on Demand"
                description="Upload and watch recorded gameplay videos anytime"
              />
              <FeatureCard
                icon={
                  <Users className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                }
                title="Community"
                description="Connect with fellow gamers and build your audience"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-purple-600 dark:bg-purple-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Streaming?
            </h2>
            <p className="text-xl mb-8">
              Join GamerLink today and take your gaming to the next level!
            </p>
            <Link href="/register">
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 GamerLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function StreamCard({ image, title, streamer, viewers }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">{streamer}</p>
        <div className="flex items-center text-red-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{viewers} viewers</span>
        </div>
      </div>
    </div>
  );
}
