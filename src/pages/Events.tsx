
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Calendar as CalendarIcon } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Annual Alumni Reunion 2023",
    type: "In-person",
    date: "2023-12-15",
    time: "10:00 AM - 4:00 PM",
    location: "FX Engineering College Campus, Tirunelveli",
    description: "Join us for a day of networking, campus tours, and reconnecting with old friends and professors. The event will include panel discussions, an awards ceremony, and a lunch reception.",
    attendees: 120,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Career Development Workshop",
    type: "Virtual",
    date: "2023-11-25",
    time: "6:00 PM - 8:00 PM",
    location: "Zoom Webinar",
    description: "This virtual workshop will focus on career advancement strategies for engineering professionals. Learn from industry experts about navigating the current job market and developing key skills.",
    attendees: 85,
    image: "",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Tech Trends 2023: AI & Machine Learning",
    type: "Hybrid",
    date: "2023-11-10",
    time: "5:30 PM - 7:30 PM",
    location: "FX Auditorium + Live Stream",
    description: "A special talk by our distinguished alumni working in AI and ML fields. Gain insights into the latest technological advancements and how they're shaping industries.",
    attendees: 150,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop",
    status: "upcoming"
  },
  {
    id: 4,
    title: "FX Summer Hackathon",
    type: "In-person",
    date: "2023-06-10",
    time: "9:00 AM - 9:00 PM",
    location: "FX Engineering Labs",
    description: "A 12-hour hackathon where students and alumni collaborated on innovative projects. The event included mentoring sessions, tech talks, and exciting prizes for winners.",
    attendees: 75,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop",
    status: "past"
  },
  {
    id: 5,
    title: "Industry-Academia Partnership Meet",
    type: "In-person",
    date: "2023-04-22",
    time: "11:00 AM - 2:00 PM",
    location: "FX Conference Hall",
    description: "A networking event that brought together industry leaders and academic faculty to discuss collaboration opportunities, internships, and research partnerships.",
    attendees: 60,
    image: "",
    status: "past"
  }
];

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEvents = events.filter(event => 
    (event.status === activeTab || activeTab === "all") && 
    (searchTerm === "" || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      event.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <MainLayout>
      <PageHeader
        title="Events & Gatherings"
        subtitle="Connect with the FX community through various events and meetups"
      />
      
      <div className="fx-container py-8">
        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto md:flex-1">
                  <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Tabs defaultValue="upcoming" className="w-full md:w-auto" onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                    <TabsTrigger value="past">Past Events</TabsTrigger>
                    <TabsTrigger value="all">All Events</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-all border-fx-purple/10 hover:border-fx-purple/30 overflow-hidden flex flex-col">
                  {event.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <Badge 
                        variant={event.type === "In-person" ? "default" : event.type === "Virtual" ? "outline" : "secondary"}
                        className={event.type === "In-person" ? "bg-fx-purple" : ""}
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.attendees} {event.status === 'upcoming' ? 'registered' : 'attended'}</span>
                      </div>
                    </div>
                    <p className="mt-4">{event.description}</p>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    {event.status === 'upcoming' ? (
                      <Button className="w-full bg-fx-purple hover:bg-fx-purple/90">Register Now</Button>
                    ) : (
                      <Button variant="outline" className="w-full">View Event Gallery</Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No events found</h3>
              <p className="mt-2 text-muted-foreground">No {activeTab} events match your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;
