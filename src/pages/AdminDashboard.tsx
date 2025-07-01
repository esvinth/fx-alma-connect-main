import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  MessageSquare,
  Briefcase,
  Calendar,
  Bell,
  Settings,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  UserPlus,
  Mail,
  Info,
  BarChart4,
  RefreshCcw,
  Shield,
  UserCheck,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  dateJoined: string;
  avatar?: string;
  lastActive?: string;
}

interface Post {
  id: number;
  author: string;
  content: string;
  type: string;
  datePosted: string;
  status: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  attendees: number;
  status: string;
}

interface JobListing {
  id: number;
  title: string;
  company: string;
  postedBy: string;
  datePosted: string;
  status: string;
}

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Priya Sharma", email: "priya@example.com", role: "Alumni", status: "Active", dateJoined: "2023-01-15", avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop", lastActive: "2023-10-15 09:30 AM" },
    { id: 2, name: "Rahul Verma", email: "rahul@example.com", role: "Alumni", status: "Active", dateJoined: "2023-02-20", avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop", lastActive: "2023-10-14 11:45 AM" },
    { id: 3, name: "Kunal Shah", email: "kunal@example.com", role: "Student", status: "Pending", dateJoined: "2023-05-10", lastActive: "Never" },
    { id: 4, name: "Anjali Patel", email: "anjali@example.com", role: "Alumni", status: "Active", dateJoined: "2023-03-05", avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop", lastActive: "2023-10-15 03:20 PM" },
    { id: 5, name: "Vikram Singh", email: "vikram@example.com", role: "Student", status: "Inactive", dateJoined: "2023-04-17", lastActive: "2023-10-10 10:15 AM" },
    { id: 6, name: "Neha Gupta", email: "neha@example.com", role: "Alumni", status: "Pending", dateJoined: "2023-10-15", lastActive: "Never" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const { toast } = useToast();

  const posts: Post[] = [
    { id: 1, author: "Priya Sharma", content: "Excited to share that I've been promoted...", type: "Text", datePosted: "2023-10-05", status: "Approved" },
    { id: 2, author: "Rahul Verma", content: "Looking to hire interns for our AI team...", type: "Job", datePosted: "2023-10-08", status: "Approved" },
    { id: 3, author: "Vikram Singh", content: "Check out this article on renewable energy...", type: "Link", datePosted: "2023-10-10", status: "Pending" },
    { id: 4, author: "Anjali Patel", content: "Inappropriate content that violates guidelines...", type: "Text", datePosted: "2023-10-12", status: "Rejected" }
  ];

  const events: Event[] = [
    { id: 1, title: "Annual Alumni Reunion 2023", date: "2023-12-15", attendees: 120, status: "Upcoming" },
    { id: 2, title: "Career Development Workshop", date: "2023-11-25", attendees: 85, status: "Upcoming" },
    { id: 3, title: "Tech Trends 2023: AI & Machine Learning", date: "2023-11-10", attendees: 150, status: "Upcoming" },
    { id: 4, title: "FX Summer Hackathon", date: "2023-06-10", attendees: 75, status: "Completed" }
  ];

  const jobs: JobListing[] = [
    { id: 1, title: "Software Developer", company: "TechSolutions Inc.", postedBy: "Rahul Verma", datePosted: "2023-10-08", status: "Active" },
    { id: 2, title: "Data Science Intern", company: "Analytics Pro", postedBy: "Priya Sharma", datePosted: "2023-10-04", status: "Active" },
    { id: 3, title: "Mechanical Design Engineer", company: "Innovation Engineering", postedBy: "Anjali Patel", datePosted: "2023-09-20", status: "Active" },
    { id: 4, title: "Frontend Developer", company: "WebTech Solutions", postedBy: "Vikram Singh", datePosted: "2023-10-12", status: "Pending" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        const newUser = {
          id: users.length + 1,
          name: `New User ${Math.floor(Math.random() * 100)}`,
          email: `user${Math.floor(Math.random() * 100)}@example.com`,
          role: Math.random() > 0.5 ? "Alumni" : "Student",
          status: "Pending",
          dateJoined: new Date().toISOString().split('T')[0],
          lastActive: "Never"
        };
        
        setUsers(prevUsers => [...prevUsers, newUser]);
        
        toast({
          title: "New Registration",
          description: `${newUser.name} has registered and needs approval.`,
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [users, toast]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastRefreshed(new Date());
      setIsLoading(false);
      toast({
        title: "Dashboard Refreshed",
        description: "All data has been updated to the latest version."
      });
    }, 1000);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredPosts = posts.filter(post => 
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.postedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleUserAction = (action: string, userId: number) => {
    if (action === 'Approve') {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'Active' } : user
      ));
      toast({
        title: "User Approved",
        description: `User with ID ${userId} has been approved.`,
      });
    } else if (action === 'Reject') {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'Rejected' } : user
      ));
      toast({
        title: "User Rejected",
        description: `User with ID ${userId} has been rejected.`,
      });
    } else if (action === 'Delete') {
      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: "User Deleted",
        description: `User with ID ${userId} has been deleted from the system.`,
      });
    }
  };

  const handleAction = (action: string, type: string, id: number) => {
    if (type === 'user') {
      handleUserAction(action, id);
    } else {
      console.log(`${action} ${type} with ID ${id}`);
      toast({
        title: "Action Successful",
        description: `${action} ${type} with ID ${id}`,
      });
    }
  };

  const handleSendAnnouncement = () => {
    toast({
      title: "Announcement Sent",
      description: "Your announcement has been sent to all users.",
    });
  };

  const pendingUsers = users.filter(user => user.status === 'Pending').length;

  return (
    <MainLayout>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage users, content, and site settings"
      />
      
      <div className="fx-container py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: {lastRefreshed.toLocaleTimeString()}</span>
          </div>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {pendingUsers > 0 && (
          <Card className="mb-6 border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-200 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                  {pendingUsers} {pendingUsers === 1 ? 'user' : 'users'} pending approval
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  New registrations require your approval to access the platform.
                </p>
              </div>
              <Button 
                className="bg-yellow-600 hover:bg-yellow-700" 
                onClick={() => document.getElementById('users-tab')?.click()}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Review Now
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Users</p>
                <h3 className="text-3xl font-bold mt-1">{users.length}</h3>
                <p className="text-xs text-green-600 mt-1">+15% from last month</p>
              </div>
              <div className="p-3 rounded-full bg-fx-purple/10 text-fx-purple">
                <Users className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Jobs</p>
                <h3 className="text-3xl font-bold mt-1">48</h3>
                <p className="text-xs text-green-600 mt-1">+22% from last month</p>
              </div>
              <div className="p-3 rounded-full bg-fx-purple/10 text-fx-purple">
                <Briefcase className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Upcoming Events</p>
                <h3 className="text-3xl font-bold mt-1">12</h3>
                <p className="text-xs text-yellow-600 mt-1">Same as last month</p>
              </div>
              <div className="p-3 rounded-full bg-fx-purple/10 text-fx-purple">
                <Calendar className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">New Posts</p>
                <h3 className="text-3xl font-bold mt-1">87</h3>
                <p className="text-xs text-red-600 mt-1">-5% from last month</p>
              </div>
              <div className="p-3 rounded-full bg-fx-purple/10 text-fx-purple">
                <MessageSquare className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search users, posts, events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center" id="users-tab">
              <Users className="h-4 w-4 mr-2" />
              Users
              {pendingUsers > 0 && (
                <Badge className="ml-2 bg-yellow-500" variant="secondary">{pendingUsers}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Users</CardTitle>
                  <Button className="bg-fx-purple hover:bg-fx-purple/90">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
                <CardDescription>View and manage all registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(user => (
                      <TableRow key={user.id} className={user.status === 'Pending' ? 'bg-yellow-50 dark:bg-yellow-950/10' : ''}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'Alumni' ? 'default' : 'outline'} className={user.role === 'Alumni' ? 'bg-fx-purple' : ''}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            user.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800' :
                            user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800' :
                            user.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800' : 
                            'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                          }>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.dateJoined).toLocaleDateString()}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {user.status === 'Pending' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50" 
                                  onClick={() => handleAction('Approve', 'user', user.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50" 
                                  onClick={() => handleAction('Reject', 'user', user.id)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button variant="outline" size="sm" onClick={() => handleAction('Edit', 'user', user.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAction('Delete', 'user', user.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="posts">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Manage Posts</CardTitle>
                <CardDescription>Approve, reject, or delete user posts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Author</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map(post => (
                      <TableRow key={post.id}>
                        <TableCell>{post.author}</TableCell>
                        <TableCell className="max-w-xs truncate">{post.content}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{post.type}</Badge>
                        </TableCell>
                        <TableCell>{new Date(post.datePosted).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            post.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' :
                            post.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            'bg-red-100 text-red-800 border-red-200'
                          }>
                            {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {post.status === 'Pending' && (
                              <>
                                <Button variant="outline" size="sm" className="text-green-600" onClick={() => handleAction('Approve', 'post', post.id)}>
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleAction('Reject', 'post', post.id)}>
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button variant="outline" size="sm" onClick={() => handleAction('Delete', 'post', post.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="jobs">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Manage Job Listings</CardTitle>
                <CardDescription>Review and manage job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Posted By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.map(job => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.postedBy}</TableCell>
                        <TableCell>{new Date(job.datePosted).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            job.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' :
                            job.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            'bg-red-100 text-red-800 border-red-200'
                          }>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {job.status === 'Pending' && (
                              <Button variant="outline" size="sm" className="text-green-600" onClick={() => handleAction('Approve', 'job', job.id)}>
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="outline" size="sm" onClick={() => handleAction('Edit', 'job', job.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAction('Delete', 'job', job.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Events</CardTitle>
                  <Button className="bg-fx-purple hover:bg-fx-purple/90">
                    <Calendar className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </div>
                <CardDescription>View and manage upcoming and past events</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Attendees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map(event => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                        <TableCell>{event.attendees}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            'bg-green-100 text-green-800 border-green-200'
                          }>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleAction('Edit', 'event', event.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAction('Delete', 'event', event.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="announcements">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Send Announcement</CardTitle>
                <CardDescription>Create and send announcements to all users or specific groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Announcement Title</label>
                    <Input placeholder="Enter announcement title" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <Textarea 
                      placeholder="Write your announcement message here..."
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Send To</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="all-users" />
                          <label htmlFor="all-users">All Users</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="alumni" />
                          <label htmlFor="alumni">Alumni Only</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="students" />
                          <label htmlFor="students">Students Only</label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Notification Method</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="email-notification" />
                          <label htmlFor="email-notification">Email</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="in-app-notification" defaultChecked />
                          <label htmlFor="in-app-notification">In-app Notification</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-fx-purple hover:bg-fx-purple/90" onClick={handleSendAnnouncement}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Configure general settings for the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">General Settings</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Enable Registration</p>
                          <p className="text-sm text-muted-foreground">Allow new users to register on the platform</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Require Email Verification</p>
                          <p className="text-sm text-muted-foreground">Users must verify their email before accessing features</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Auto-approve Alumni Accounts</p>
                          <p className="text-sm text-muted-foreground">Automatically approve accounts with verified alumni email domains</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Content Moderation</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Pre-moderate All Posts</p>
                          <p className="text-sm text-muted-foreground">All posts require admin approval before appearing</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Pre-moderate Job Listings</p>
                          <p className="text-sm text-muted-foreground">All job postings require admin approval</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Allow Comments on Posts</p>
                          <p className="text-sm text-muted-foreground">Enable users to comment on feed posts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">New User Welcome Email</p>
                          <p className="text-sm text-muted-foreground">Send welcome email to new users</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Weekly Digest Email</p>
                          <p className="text-sm text-muted-foreground">Send weekly email with platform updates</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Job Alert Emails</p>
                          <p className="text-sm text-muted-foreground">Notify users of relevant job postings</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button className="bg-fx-purple hover:bg-fx-purple/90">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
