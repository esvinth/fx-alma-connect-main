import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageSquare, Share2, Send, Image, Video, Link2, Calendar, Users, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useSocket } from '@/hooks/useSocket';
import { API_BASE_URL } from '@/config/api';

interface Post {
  _id?: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
}

const Feed = () => {
  const socket = useSocket();
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Socket real-time updates
  useEffect(() => {
    if (!socket) return;

    socket.on('post_created', (newPost: Post) => {
      setPosts(prev => [newPost, ...prev]);
    });

    socket.on('post_updated', (updatedPost: Post) => {
      setPosts(prev => prev.map(post => 
        post._id === updatedPost._id ? updatedPost : post
      ));
    });

    return () => {
      socket.off('post_created');
      socket.off('post_updated');
    };
  }, [socket]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !user) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: {
            id: user.id,
            name: user.name,
            role: user.currentJob || user.role,
            avatar: '',
          },
          content: newPostContent,
        }),
      });

      if (!response.ok) throw new Error('Failed to create post');

      setNewPostContent('');
      
      toast({
        title: "Post created",
        description: "Your post has been published successfully!",
      });
    } catch (err) {
      console.error("Error creating post:", err);
      toast({
        variant: "destructive",
        title: "Post failed",
        description: "There was an error creating your post. Please try again.",
      });
    }
  };
  
  // Function to like a post
  const handleLikePost = async (post: Post) => {
    if (!post._id) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        }),
      });

      if (!response.ok) throw new Error('Failed to like post');

      const updatedPost = await response.json();

      setPosts(prev => prev.map(p => p._id === updatedPost._id ? updatedPost : p));
    } catch (err) {
      console.error("Error liking post:", err);
      toast({
        variant: "destructive",
        title: "Action failed",
        description: "There was an error processing your request.",
      });
    }
  };

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

  // If there's an error, show error state
  if (error) {
    return (
      <MainLayout>
        <PageHeader
          title="Community Feed"
          subtitle="Stay updated with the latest news and updates from the FX community"
        />
        <div className="fx-container py-8 text-center">
          <Card className="p-8 border-red-300 bg-red-50">
            <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Feed</h3>
            <p className="text-red-500">{error.message}</p>
            <Button 
              className="mt-4 bg-red-600 hover:bg-red-700" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        title="Community Feed"
        subtitle="Stay updated with the latest news and updates from the FX community"
      />
      
      <div className="fx-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar - Quick access */}
          <div className="hidden md:block col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="sticky top-20 border-fx-purple/20 shadow-sm backdrop-blur-sm bg-white/90">
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-fx-purple to-fx-blue bg-clip-text text-transparent">Quick Links</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start hover:text-fx-purple hover:bg-fx-purple/10">
                    <Calendar className="h-4 w-4 mr-2" />
                    Upcoming Events
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:text-fx-purple hover:bg-fx-purple/10">
                    <Image className="h-4 w-4 mr-2" />
                    Photo Gallery
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:text-fx-purple hover:bg-fx-purple/10">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    My Messages
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:text-fx-purple hover:bg-fx-purple/10">
                    <Users className="h-4 w-4 mr-2" />
                    My Connections
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Main content - Feed */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            {/* Create post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-fx-purple/20 shadow-sm backdrop-blur-sm bg-white/90">
                <CardContent className="pt-6">
                  <div className="flex space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-fx-purple to-fx-blue text-white">
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'ME'}
                      </AvatarFallback>
                    </Avatar>
                    <Textarea 
                      placeholder="Share something with the community..." 
                      className="resize-none"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                  </div>
                  <div className="flex mt-4 pt-3 border-t justify-between">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="hover:text-fx-purple hover:bg-fx-purple/10">
                        <Image className="h-4 w-4 mr-2" />
                        Photo
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:text-fx-purple hover:bg-fx-purple/10">
                        <Video className="h-4 w-4 mr-2" />
                        Video
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:text-fx-purple hover:bg-fx-purple/10">
                        <Link2 className="h-4 w-4 mr-2" />
                        Link
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-fx-purple to-fx-blue hover:opacity-90"
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Posts */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {posts.map((post) => (
                <motion.div key={post._id} variants={item}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 border-fx-purple/20 backdrop-blur-sm bg-white/90">
                    <CardHeader className="pb-3">
                      <div className="flex space-x-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-fx-purple to-fx-blue text-white">
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{post.author.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {post.author.role} · {post.time}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{post.content}</p>
                      {post.image && (
                        <div className="rounded-md overflow-hidden mt-3 mb-3">
                          <img 
                            src={post.image} 
                            alt="Post attachment" 
                            className="w-full object-cover max-h-80 hover:scale-[1.02] transition-transform duration-300"
                          />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`${post.liked ? 'text-fx-purple bg-fx-purple/10' : 'text-muted-foreground'} hover:text-fx-purple hover:bg-fx-purple/10`}
                        onClick={() => handleLikePost(post)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Like ({post.likes})
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-fx-purple hover:bg-fx-purple/10">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comment ({post.comments})
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-fx-purple hover:bg-fx-purple/10">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share ({post.shares})
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Loading state */}
            {loading && (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-fx-purple" />
                <span className="sr-only">Loading posts...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Feed;
