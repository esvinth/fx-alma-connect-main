
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Search, Users, Briefcase, Award, Clock, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mentors = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Senior Software Engineer",
    company: "Google",
    experiences: ["Web Development", "Machine Learning", "Career Guidance"],
    availability: "Weekends",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop",
    bio: "I've been working at Google for 5 years, specializing in frontend development and machine learning applications. Happy to guide students interested in similar fields."
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Founder & CEO",
    company: "TechSolutions",
    experiences: ["Entrepreneurship", "Product Development", "Leadership"],
    availability: "Flexible hours",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop",
    bio: "After graduating from FX, I started my own tech company that has now grown to 50+ employees. I can share insights about entrepreneurship and building products."
  },
  {
    id: 3,
    name: "Vijay Kumar",
    role: "CTO",
    company: "Fintech Solutions",
    experiences: ["Financial Technology", "Backend Systems", "Cloud Architecture"],
    availability: "Weekday evenings",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop",
    bio: "Passionate about building scalable backend systems. I've worked on payment processing platforms and financial applications used by millions."
  },
  {
    id: 4,
    name: "Anjali Patel",
    role: "Product Manager",
    company: "Tesla",
    experiences: ["Mechanical Engineering", "Project Management", "Automotive Industry"],
    availability: "Monthly sessions",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop",
    bio: "I manage production optimization projects at Tesla. Can provide guidance on mechanical engineering careers and transitioning to project management roles."
  }
];

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

const mentorshipRequestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  area: z.string().min(1, { message: "Please select an area of interest" }),
  background: z.string().min(10, { message: "Please provide some background about yourself" }),
  questions: z.string().min(10, { message: "Please provide specific questions or topics" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
type MentorshipRequestValues = z.infer<typeof mentorshipRequestSchema>;

const Mentorship = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [selectedMentorId, setSelectedMentorId] = useState<number | null>(null);
  const { toast } = useToast();

  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const mentorshipForm = useForm<MentorshipRequestValues>({
    resolver: zodResolver(mentorshipRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      area: "",
      background: "",
      questions: ""
    }
  });

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = searchTerm === "" || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesExpertise = selectedExpertise === "all" || 
      mentor.experiences.some(exp => exp.toLowerCase().includes(selectedExpertise.toLowerCase()));
    
    return matchesSearch && matchesExpertise;
  });

  const expertiseAreas = [
    "Web Development",
    "Machine Learning",
    "Career Guidance",
    "Entrepreneurship",
    "Product Development",
    "Leadership",
    "Financial Technology",
    "Backend Systems",
    "Cloud Architecture",
    "Mechanical Engineering",
    "Project Management",
    "Automotive Industry"
  ];

  const handleContactSubmit = (data: ContactFormValues) => {
    console.log("Contact form submitted:", data);
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    });
    contactForm.reset();
  };

  const handleMentorshipSubmit = (data: MentorshipRequestValues) => {
    console.log("Mentorship request submitted:", data);
    toast({
      title: "Mentorship Request Sent",
      description: selectedMentorId 
        ? `Your request has been sent to ${mentors.find(m => m.id === selectedMentorId)?.name}` 
        : "Your mentorship request has been submitted. We'll match you with a suitable mentor.",
    });
    mentorshipForm.reset();
    setSelectedMentorId(null);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Mentorship & Contact"
        subtitle="Connect with alumni mentors or reach out to the FX Alma Connect team"
      />
      
      <div className="fx-container py-8">
        <Tabs defaultValue="mentors" className="space-y-6">
          <TabsList className="w-full md:w-auto mx-auto flex justify-center">
            <TabsTrigger value="mentors" className="flex-1">Find Mentors</TabsTrigger>
            <TabsTrigger value="request" className="flex-1">Request Mentorship</TabsTrigger>
            <TabsTrigger value="contact" className="flex-1">Contact Us</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mentors" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search mentors by name, role, or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                      <SelectTrigger>
                        <SelectValue placeholder="Area of Expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Areas</SelectItem>
                        {expertiseAreas.map((area) => (
                          <SelectItem key={area} value={area}>{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {filteredMentors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMentors.map((mentor) => (
                  <Card key={mentor.id} className="hover:shadow-md transition-all border-fx-purple/10 hover:border-fx-purple/30">
                    <CardHeader className="pb-3">
                      <div className="flex space-x-4">
                        <Avatar className="h-16 w-16 border-2 border-fx-purple/20">
                          <AvatarImage src={mentor.imageUrl} alt={mentor.name} />
                          <AvatarFallback className="text-lg bg-fx-purple/20">
                            {mentor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold">{mentor.name}</h3>
                          <p className="text-muted-foreground">
                            {mentor.role} at {mentor.company}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{mentor.bio}</p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-start">
                          <Award className="h-4 w-4 mr-2 mt-1 text-fx-purple" />
                          <div>
                            <p className="font-medium">Expertise</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {mentor.experiences.map((exp, index) => (
                                <Badge key={index} variant="outline" className="bg-fx-purple/10 text-fx-purple border-fx-purple/30">
                                  {exp}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-fx-purple" />
                          <div>
                            <p className="font-medium">Availability</p>
                            <p className="text-sm text-muted-foreground">{mentor.availability}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 border-t">
                      <Button 
                        className="w-full bg-fx-purple hover:bg-fx-purple/90"
                        onClick={() => {
                          setSelectedMentorId(mentor.id);
                          document.getElementById('request-tab')?.click();
                        }}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Request Mentorship
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold">No mentors found</h3>
                <p className="mt-2 text-muted-foreground">Try adjusting your search filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="request" className="space-y-6" id="request-tab">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">
                  {selectedMentorId 
                    ? `Request Mentorship from ${mentors.find(m => m.id === selectedMentorId)?.name}`
                    : "Request Mentorship"
                  }
                </h3>
                <p className="text-muted-foreground">
                  {selectedMentorId 
                    ? "Complete the form below to connect with your selected mentor"
                    : "Fill out this form to be matched with a suitable mentor from our alumni network"
                  }
                </p>
              </CardHeader>
              <CardContent>
                <Form {...mentorshipForm}>
                  <form onSubmit={mentorshipForm.handleSubmit(handleMentorshipSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={mentorshipForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={mentorshipForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={mentorshipForm.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area of Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an area of interest" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {expertiseAreas.map((area) => (
                                <SelectItem key={area} value={area}>{area}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={mentorshipForm.control}
                      name="background"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Background</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please share a bit about yourself, your current studies or work, and your career goals."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={mentorshipForm.control}
                      name="questions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specific Questions or Topics</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="What specific topics would you like to discuss with a mentor? Any particular questions or challenges?"
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full md:w-auto bg-fx-purple hover:bg-fx-purple/90">
                      Submit Mentorship Request
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2">
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold">Contact Us</h3>
                    <p className="text-muted-foreground">
                      Have questions or feedback? Send us a message and we'll get back to you.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Form {...contactForm}>
                      <form onSubmit={contactForm.handleSubmit(handleContactSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={contactForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={contactForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={contactForm.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter the subject of your message" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={contactForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Write your message here"
                                  className="min-h-[150px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full md:w-auto bg-fx-purple hover:bg-fx-purple/90">
                          Send Message
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold">Get in Touch</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium">FX Alumni Office</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Francis Xavier Engineering College<br />
                        Tirunelveli, Tamil Nadu, India
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        alumni@fxec.edu<br />
                        support@fxalmaconnect.com
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        +91 123 456 7890<br />
                        +91 987 654 3210
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Office Hours</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Monday to Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 9:00 AM - 1:00 PM
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Mentorship;
