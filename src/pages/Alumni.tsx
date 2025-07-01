
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Briefcase } from 'lucide-react';

const alumniData = [
  {
    id: 1,
    name: "Priya Sharma",
    batch: "2010",
    department: "Computer Science",
    location: "Bengaluru",
    company: "Google",
    position: "Senior Software Engineer",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Rahul Verma",
    batch: "2012",
    department: "Electronics",
    location: "Mumbai",
    company: "TechSolutions",
    position: "Founder & CEO",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Anjali Patel",
    batch: "2015",
    department: "Mechanical",
    location: "New Delhi",
    company: "Tesla",
    position: "Product Manager",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Vijay Kumar",
    batch: "2008",
    department: "IT",
    location: "Chennai",
    company: "Fintech Solutions",
    position: "CTO",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Deepak Sharma",
    batch: "2018",
    department: "Computer Science",
    location: "Hyderabad",
    company: "Microsoft",
    position: "Software Developer",
    imageUrl: ""
  },
  {
    id: 6,
    name: "Kavita Singh",
    batch: "2013",
    department: "Civil",
    location: "Pune",
    company: "Constructions Ltd",
    position: "Project Manager",
    imageUrl: ""
  },
  {
    id: 7,
    name: "Ravi Patel",
    batch: "2016",
    department: "Electrical",
    location: "Ahmedabad",
    company: "Power Systems",
    position: "Electrical Engineer",
    imageUrl: ""
  },
  {
    id: 8,
    name: "Meera Reddy",
    batch: "2009",
    department: "IT",
    location: "Bengaluru",
    company: "Amazon",
    position: "Technical Lead",
    imageUrl: ""
  }
];

const Alumni = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [filteredAlumni, setFilteredAlumni] = useState(alumniData);

  const departments = [...new Set(alumniData.map(a => a.department))];
  const batches = [...new Set(alumniData.map(a => a.batch))];

  const handleSearch = () => {
    const filtered = alumniData.filter(alumni => {
      const matchesSearch = searchTerm === "" || 
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = selectedDepartment === "all" || alumni.department === selectedDepartment;
      const matchesBatch = selectedBatch === "all" || alumni.batch === selectedBatch;
      
      return matchesSearch && matchesDepartment && matchesBatch;
    });
    
    setFilteredAlumni(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("all");
    setSelectedBatch("all");
    setFilteredAlumni(alumniData);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Alumni Directory"
        subtitle="Connect with FX Engineering College graduates from across the years"
      />
      
      <div className="fx-container py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, company, position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Batch Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    {batches.map(batch => (
                      <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-1 md:col-span-3 flex space-x-3">
                <Button onClick={handleSearch} className="bg-fx-purple hover:bg-fx-purple/90">
                  Search
                </Button>
                <Button variant="outline" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alumni) => (
              <Card key={alumni.id} className="hover:shadow-md transition-all border-fx-purple/10 hover:border-fx-purple/30">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 border-2 border-fx-purple/20">
                      <AvatarImage src={alumni.imageUrl} alt={alumni.name} />
                      <AvatarFallback className="text-lg bg-fx-purple/20">
                        {alumni.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 text-xl font-semibold">{alumni.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {alumni.department}, {alumni.batch}
                    </p>
                    <div className="mt-3 flex items-center text-sm text-gray-600">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <p>{alumni.position} at {alumni.company}</p>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <p>{alumni.location}</p>
                    </div>
                    <Button variant="outline" className="mt-4 w-full border-fx-purple/50 text-fx-purple hover:bg-fx-purple/10">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-muted-foreground">No alumni found matching your criteria. Please try a different search.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Alumni;
