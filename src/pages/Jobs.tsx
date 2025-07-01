
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, Clock, Building, Plus } from 'lucide-react';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('all');
  const [location, setLocation] = useState('all');

  const jobs = [
    {
      id: 1,
      title: "Software Developer",
      company: "TechSolutions Inc.",
      location: "Bengaluru, India",
      type: "Full-time",
      salary: "₹12-18 LPA",
      posted: "2 days ago",
      description: "Looking for a skilled software developer with experience in React, Node.js, and TypeScript to join our growing engineering team.",
      requirements: ["3+ years of development experience", "Strong JavaScript skills", "Experience with React", "Bachelor's degree in Computer Science"],
      contactEmail: "careers@techsolutions.com"
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "Analytics Pro",
      location: "Remote",
      type: "Internship",
      salary: "₹25,000-35,000/month",
      posted: "1 week ago",
      description: "Exciting opportunity for students and recent graduates to gain hands-on experience in data science and machine learning projects.",
      requirements: ["Knowledge of Python and data analysis libraries", "Understanding of statistical concepts", "Currently pursuing or recently completed degree"],
      contactEmail: "hiring@analyticspro.in"
    },
    {
      id: 3,
      title: "Mechanical Design Engineer",
      company: "Innovation Engineering",
      location: "Chennai, India",
      type: "Full-time",
      salary: "₹8-12 LPA",
      posted: "3 weeks ago",
      description: "Join our team to design innovative mechanical solutions for automotive industry clients. Work on cutting-edge projects with advanced CAD tools.",
      requirements: ["Degree in Mechanical Engineering", "Experience with SolidWorks or similar CAD software", "Knowledge of manufacturing processes"],
      contactEmail: "jobs@innoveng.com"
    },
    {
      id: 4,
      title: "Frontend Developer",
      company: "WebTech Solutions",
      location: "Hyderabad, India",
      type: "Contract",
      salary: "₹70,000-90,000/month",
      posted: "Just now",
      description: "6-month contract position with possibility of extension. Looking for a frontend developer to work on our client's e-commerce platform.",
      requirements: ["Strong HTML, CSS, and JavaScript", "Experience with React or Vue", "Responsive design expertise"],
      contactEmail: "contract@webtech.co.in"
    },
    {
      id: 5,
      title: "Electronics Hardware Engineer",
      company: "NextGen Devices",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹10-15 LPA",
      posted: "5 days ago",
      description: "Design and develop electronic hardware for IoT devices. Work with cross-functional teams to bring innovative products to market.",
      requirements: ["Degree in Electronics Engineering", "PCB design experience", "Knowledge of microcontrollers and sensors"],
      contactEmail: "careers@nextgendevices.in"
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === "" || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = jobType === "all" || job.type === jobType;
    const matchesLocation = location === "all" || job.location.includes(location);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Jobs & Internships"
        subtitle="Explore opportunities shared by the FX alumni community"
      >
        <Button className="bg-gradient-to-r from-fx-purple to-fx-blue hover:opacity-90">
          <Plus className="h-5 w-5 mr-2" />
          Post a Job
        </Button>
      </PageHeader>
      
      <div className="fx-container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 border-fx-purple/20 shadow-md backdrop-blur-sm bg-white/90">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by job title, company, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-fx-purple/20 focus-visible:ring-fx-purple"
                    />
                  </div>
                </div>
                
                <div>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger className="border-fx-purple/20 focus:ring-fx-purple">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="border-fx-purple/20 focus:ring-fx-purple">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                      <SelectItem value="Chennai">Chennai</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {filteredJobs.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {filteredJobs.map((job) => (
              <motion.div key={job.id} variants={item}>
                <Card className="hover:shadow-md transition-all border-fx-purple/10 hover:border-fx-purple/30 backdrop-blur-sm bg-white/90">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-fx-purple to-fx-blue bg-clip-text text-transparent">{job.title}</h3>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          <span>{job.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-fx-purple/10 text-fx-purple border-fx-purple/30 hover:bg-fx-purple/20">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {job.type}
                        </Badge>
                        <Badge variant="outline" className="bg-secondary hover:bg-secondary/80">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline" className="bg-secondary hover:bg-secondary/80">
                          <Clock className="h-3 w-3 mr-1" />
                          {job.posted}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">Salary: {job.salary}</p>
                    <p className="mb-4">{job.description}</p>
                    
                    <div className="mt-3">
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-sm">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap justify-between gap-4 pt-2 border-t">
                    <div className="text-sm">
                      <span className="font-medium">Contact: </span>
                      <a href={`mailto:${job.contactEmail}`} className="text-fx-purple hover:underline">
                        {job.contactEmail}
                      </a>
                    </div>
                    <Button className="bg-gradient-to-r from-fx-purple to-fx-blue hover:opacity-90">
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-12 text-center border rounded-lg bg-white/90 backdrop-blur-sm border-fx-purple/20"
          >
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No jobs found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your search filters</p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default Jobs;
