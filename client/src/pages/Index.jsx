import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/ui-custom/Container";
import Section from "@/components/ui-custom/Section";
import Button from "@/components/ui-custom/Button";
import { useIntersectionAnimation } from "@/lib/animation";

// Example blog posts for the featured section
const featuredPosts = [
  {
    id: 1,
    title: "The Art of Minimalist Design",
    excerpt:
      "Exploring how less becomes more in the world of modern design principles and aesthetics.",
    author: "Alex Morgan",
    date: "May 12, 2023",
    category: "Design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
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
  },
];

const Index = () => {
  // Animation hooks for different sections
  const [heroRef, heroVisible] = useIntersectionAnimation(0.1);
  const [featuredRef, featuredVisible] = useIntersectionAnimation(0.1);
  const [ctaRef, ctaVisible] = useIntersectionAnimation(0.1);
  
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-16 lg:pt-20">
        <div 
          ref={heroRef}
          className={`transition-all duration-1000 delay-100 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Container size="lg">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Welcome to Storyscape
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
                Where Stories Come to Life with Elegant Simplicity
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mb-10">
                A minimalist blogging platform designed for writers who appreciate
                clean aesthetics and distraction-free storytelling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/blog">Explore Stories</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Start Writing</Link>
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </Section>

      {/* Featured Posts Section */}
      <Section>
        <Container>
          <div 
            ref={featuredRef}
            className={`transition-all duration-1000 delay-200 ${
              featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Stories</h2>
                <p className="text-muted-foreground">
                  Curated content from our best writers
                </p>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/blog">View all stories</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <article 
                  key={post.id}
                  className={`group flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 ease-in-out`}
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
                      <div className="flex items-center mb-3">
                        <span className="text-sm text-muted-foreground">
                          {post.date}
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

      {/* Features Section */}
      <Section className="bg-accent">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Crafted for the Modern Storyteller
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature designed with intention, focusing on what truly matters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Elegant Simplicity",
                description:
                  "A clean, distraction-free writing environment that lets your content shine.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                  </svg>
                ),
              },
              {
                title: "Responsive Design",
                description:
                  "Your stories look beautiful on any device, from desktop to mobile.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                ),
              },
              {
                title: "Thoughtful Typography",
                description:
                  "Carefully selected fonts and spacing for optimal reading experience.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border/40 shadow-sm"
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container size="md">
          <div 
            ref={ctaRef}
            className={`bg-card rounded-3xl p-8 md:p-12 border border-border shadow-sm text-center transition-all duration-1000 ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Start Your Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of writers and readers who appreciate the beauty of
              simplicity and the power of words.
            </p>
            <Button size="lg" className="mb-4" asChild>
              <Link to="/login">Create Your Account</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              No credit card required. Start writing in minutes.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Index;