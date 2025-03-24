import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "@/components/ui-custom/Container";
import Section from "@/components/ui-custom/Section";
import Button from "@/components/ui-custom/Button";
import { useIntersectionAnimation } from "@/lib/animation";

// Sample blog post data
const blogPosts = [
  {
    id: "1",
    title: "The Art of Minimalist Design",
    content: `
      <p class="lead">Minimalism isn't just an aesthetic choice—it's a deliberate approach to design that prioritizes essential elements while eliminating everything unnecessary.</p>
      
      <p>In a world of increasing complexity and constant visual noise, minimalist design stands as a testament to the power of restraint. It asks a fundamental question: What can be removed while preserving meaning?</p>
      
      <h2>The Core Principles</h2>
      
      <p>At its heart, minimalist design embraces several key principles:</p>
      
      <ul>
        <li>Reduction to essentials</li>
        <li>Thoughtful use of negative space</li>
        <li>Limited color palettes</li>
        <li>Emphasis on typography and hierarchy</li>
        <li>Functional clarity</li>
      </ul>
      
      <p>Each element must earn its place in the composition. As Dieter Rams famously said, "Less, but better."</p>
      
      <blockquote>
        <p>Good design is as little design as possible. Less, but better – because it concentrates on the essential aspects, and the products are not burdened with non-essentials.</p>
        <cite>— Dieter Rams</cite>
      </blockquote>
      
      <h2>Beyond Aesthetics</h2>
      
      <p>While often associated with a distinct visual style, true minimalism extends beyond aesthetics to encompass the entire user experience. It considers how people interact with designs and aims to reduce friction in these interactions.</p>
      
      <p>Minimalist interfaces load faster, communicate more clearly, and create mental space for users to focus on what matters.</p>
      
      <h2>Finding Balance</h2>
      
      <p>The challenge lies in distinguishing between what's truly essential and what can be eliminated. Go too far, and you risk creating something cold and impractical; not far enough, and you miss the benefits of simplification.</p>
      
      <p>Great minimalist design maintains humanity and warmth while removing distraction. It doesn't sacrifice functionality or emotional resonance for the sake of simplicity.</p>
      
      <h2>The Future of Minimalism</h2>
      
      <p>As our digital and physical environments grow more complex, the principles of minimalism become increasingly valuable. They remind us to question excess and focus on what truly matters.</p>
      
      <p>Perhaps the most powerful aspect of minimalist design is how it creates space—both visual and mental—for people to bring their own meaning to experiences.</p>
      
      <p>In this way, minimalism isn't about emptiness. It's about making room for what's essential.</p>
    `,
    author: "Alex Morgan",
    authorBio: "Alex is a senior designer with over 10 years of experience in UX and product design. They specialize in creating intuitive, minimalist interfaces for complex systems.",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "May 12, 2023",
    category: "Design",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    relatedPosts: [2, 3, 6],
  },
  // ... other blog posts would be defined here
];

// Related post minimal data
const relatedPostsData = [
  {
    id: 2,
    title: "Finding Balance in a Digital World",
    excerpt:
      "How to maintain focus and well-being in an age of constant digital distractions.",
    author: "Jamie Chen",
    date: "April 28, 2023",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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
    readTime: "6 min read",
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
    readTime: "6 min read",
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [headerRef, headerVisible] = useIntersectionAnimation(0.1);
  const [contentRef, contentVisible] = useIntersectionAnimation(0.1);
  const [authorRef, authorVisible] = useIntersectionAnimation(0.1);
  const [relatedRef, relatedVisible] = useIntersectionAnimation(0.1);

  useEffect(() => {
    // Simulate loading the post data
    setLoading(true);
    setTimeout(() => {
      const foundPost = blogPosts.find((p) => p.id === id);
      if (foundPost) {
        setPost(foundPost);
        // Get related posts
        const related = relatedPostsData.filter((p) => 
          foundPost.relatedPosts.includes(p.id)
        );
        setRelatedPosts(related);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <Section>
        <Container>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Loading article...</p>
          </div>
        </Container>
      </Section>
    );
  }

  if (!post) {
    return (
      <Section>
        <Container>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link to="/blog">Return to Blog</Link>
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="pb-8">
        <Container size="md">
          <div
            ref={headerRef}
            className={`transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Link
                to="/blog"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span aria-hidden="true">←</span> Back to Blog
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm font-medium text-muted-foreground">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  By <span className="font-medium text-foreground">{post.author}</span>
                </span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{post.date}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{post.readTime}</span>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Content Section */}
      <Section className="py-8">
        <Container size="md">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article 
              ref={contentRef}
              className={`lg:col-span-3 prose prose-slate max-w-none dark:prose-invert transition-all duration-700 delay-100 ${
                contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              <div
                ref={authorRef}
                className={`bg-card rounded-xl border border-border p-6 transition-all duration-700 delay-200 ${
                  authorVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h3 className="text-lg font-bold mb-4">About the Author</h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{post.author}</h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {post.authorBio}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
              </div>

              <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      The Core Principles
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Beyond Aesthetics
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Finding Balance
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      The Future of Minimalism
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <Section className="bg-accent py-16">
          <Container>
            <div
              ref={relatedRef}
              className={`transition-all duration-700 delay-300 ${
                relatedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-2xl font-bold tracking-tight mb-8">
                You Might Also Enjoy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post, index) => (
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
    </>
  );
};

export default BlogPost;
