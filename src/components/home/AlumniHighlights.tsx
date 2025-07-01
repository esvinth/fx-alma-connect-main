
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface AlumniHighlightProps {
  name: string;
  batch: string;
  department: string;
  position: string;
  company: string;
  achievement: string;
  imageUrl: string;
}

const alumniFeatured: AlumniHighlightProps[] = [
  {
    name: "Priya Sharma",
    batch: "2010",
    department: "Computer Science",
    position: "Senior Software Engineer",
    company: "Google",
    achievement: "Led the development of Google's cloud infrastructure project",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop"
  },
  {
    name: "Rahul Verma",
    batch: "2012",
    department: "Electronics",
    position: "Founder & CEO",
    company: "TechSolutions",
    achievement: "Launched a successful IoT startup with 5M in funding",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop"
  },
  {
    name: "Anjali Patel",
    batch: "2015",
    department: "Mechanical",
    position: "Product Manager",
    company: "Tesla",
    achievement: "Managed the production line optimization, increasing efficiency by 30%",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop"
  },
  {
    name: "Vijay Kumar",
    batch: "2008",
    department: "IT",
    position: "CTO",
    company: "Fintech Solutions",
    achievement: "Revolutionized banking app security with AI-based threat detection",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop"
  }
];

const AlumniHighlight: React.FC<AlumniHighlightProps> = ({ 
  name, batch, department, position, company, achievement, imageUrl 
}) => {
  return (
    <Card className="hover:shadow-md transition-all border-fx-purple/10 hover:border-fx-purple/30">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 border-2 border-fx-purple/20">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback className="text-lg bg-fx-purple/20">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h3 className="mt-4 text-xl font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {department}, Batch of {batch}
          </p>
          <p className="mt-2 font-medium">
            {position} at {company}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {achievement}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const AlumniHighlights = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="fx-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-fx-dark mb-4">Notable Alumni</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our graduates are making waves across industries and contributing to society through their exceptional work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {alumniFeatured.map((alumni, index) => (
            <AlumniHighlight key={index} {...alumni} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlumniHighlights;
