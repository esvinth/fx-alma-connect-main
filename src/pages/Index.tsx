
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroBanner from '@/components/home/HeroBanner';
import AlumniHighlights from '@/components/home/AlumniHighlights';
import StatsSection from '@/components/home/StatsSection';
import FeaturedSection from '@/components/home/FeaturedSection';

const Index = () => {
  return (
    <MainLayout>
      <HeroBanner />
      <StatsSection />
      <AlumniHighlights />
      <FeaturedSection />
    </MainLayout>
  );
};

export default Index;
