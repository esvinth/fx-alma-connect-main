
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: "Connect with Alumni",
    description: "Search and connect with FX alumni from various batches and departments to expand your professional network.",
    link: "/alumni",
    linkText: "Browse Alumni"
  },
  {
    title: "Discover Opportunities",
    description: "Explore job postings and internship opportunities exclusively shared by our alumni for the FX community.",
    link: "/jobs",
    linkText: "View Opportunities"
  },
  {
    title: "Attend Events",
    description: "Join reunions, workshops, and networking events organized for the FX community throughout the year.",
    link: "/events",
    linkText: "Upcoming Events"
  }
];

const FeaturedSection = () => {
  return (
    <section className="py-16">
      <div className="fx-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-fx-dark mb-4">What We Offer</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            FX Alma Connect is designed to foster meaningful connections and provide valuable resources for our community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-fx-purple/10 hover:border-fx-purple/30 hover:shadow-md transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link to={feature.link}>
                  <Button variant="link" className="p-0 h-auto font-medium text-fx-purple hover:text-fx-purple/80">
                    {feature.linkText} <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
