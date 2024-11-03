"use client";

import dynamic from 'next/dynamic';
import { ReportIncident } from '@/components/report-incident';
import { ModeToggle } from '@/components/mode-toggle';
import { MobilePromo } from '@/components/mobile-promo';
import { RecentReports } from '@/components/recent-reports';
import { Footer } from '@/components/footer';
import { MapPin } from 'lucide-react';

const IncidentMap = dynamic(
  () => import('@/components/incident-map').then((mod) => mod.IncidentMap),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-6xl mx-auto px-4">
          <nav className="flex items-center justify-between h-full">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">MonteAlert</h1>
            </div>
            <div className="flex items-center gap-4">
              <ReportIncident />
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 pt-20">
        <div className="h-[70vh] md:h-[80vh] relative">
          <IncidentMap />
        </div>
        <RecentReports />
        <MobilePromo />
      </main>
      
      <Footer />
    </div>
  );
}