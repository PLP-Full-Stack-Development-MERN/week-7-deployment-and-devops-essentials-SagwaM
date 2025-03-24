import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/ui-custom/Container";
import Section from "@/components/ui-custom/Section";
import Button from "@mui/material/Button";
import { useIntersectionAnimation } from "@/lib/animation";

// Sample blog posts data
const allPosts = [
  {
    id: 1,
    title: "The Art of Minimalist Design",
    excerpt:
      "Exploring how less becomes more in the world of modern design principles and aesthetics.",
    author: "Alex Morgan",
    date: "May 12, 2023",
    category: "Design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    featured: true,
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Finding Balance in a Digital World",
    excerpt:
      "How to maintain focus and well-being in an age of constant digital distractions.",
    author: "Jamie Chen",
    date: "April 28, 2023",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true,
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "The Future of Sustainable Technology",
    excerpt:
      "Innovations that are changing the landscape of eco-friendly tech solutions.",
    author: "Sam Wilson",
    date: "March 15, 2023",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true,
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Photography Essentials for Beginners",
    excerpt:
      "A guide to getting started with photography and capturing meaningful moments.",
    author: "Taylor Reed",
    date: "March 2, 2023",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    featured: false,
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Cooking with Seasonal Ingredients",
    excerpt:
      "How to make the most of local, seasonal produce in your everyday cooking.",
    author: "Jordan Kim",
    date: "February 15, 2023",
    category: "Food",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false,
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "The Psychology of Color in Marketing",
    excerpt:
      "Understanding how colors influence consumer behavior and brand perception.",
    author: "Alex Morgan",
    date: "January 28, 2023",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false,
    readTime: "6 min read",
  },
  {
    id: 7,
    title: "Mindfulness Practices for Daily Life",
    excerpt:
      "Simple techniques to incorporate mindfulness into your everyday routine.",
    author: "Sam Wilson",
    date: "January 10, 2023",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false,
    readTime: "4 min read",
  },
  {
    id: 8,
    title: "Essential Productivity Tools for Remote Work",
    excerpt:
      "A curated list of software and methods to enhance your remote work experience.",
    author: "Jamie Chen",
    date: "December 12, 2022",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    featured: false,
    readTime: "7 min read",
  },
];

// Categories from the posts
const categories = Array.from(new Set(allPosts.map((post) => post.category)));

const Blog = () => {
  const [headerRef, headerVisible] = useIntersectionAnimation(0.1);
  const [featuredRef, featuredVisible] = useIntersectionAnimation(0.1);
  const [postsRef, postsVisible] = useIntersectionAnimation(0.1);
  
  const featuredPosts = allPosts.filter((post) => post.featured);
  const regularPosts = allPosts.filter((post) => !post.featured);

  return (
    <>
      <Section>
        <Container>
          <div 
            ref={headerRef}
            className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Our Stories
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              Explore thoughtful writings on design, technology, and mindful living.
              Each story crafted with care and purpose.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Button variant="outline" size="sm" className="rounded-full">
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <Section className="pb-8">
          <Container>
            <div
              ref={featuredRef}
              className={`transition-all duration-700 delay-100 ${
                featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-2xl font-bold tracking-tight mb-8">Featured Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 ease-in-out group"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow p-6">
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-muted-foreground">
                            {post.date}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-sm font-medium">
                          By {post.author}
                        </span>
                        <Link
                          to={`/blog/${post.id}`}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* All Posts */}
      <Section className="pt-8">
        <Container>
          <div
            ref={postsRef}
            className={`transition-all duration-700 delay-200 ${
              postsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-bold tracking-tight mb-8">All Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 ease-in-out group"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">
                          {post.date}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-sm font-medium">
                        By {post.author}
                      </span>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Blog;
