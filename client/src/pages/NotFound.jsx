import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "@/components/ui-custom/Container";
import Section from "@/components/ui-custom/Section";
import Button from "@/components/ui-custom/Button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Section className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <Container size="sm">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">404</h1>
          <h2 className="text-2xl md:text-3xl font-medium">Page not found</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been
            moved or doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/blog">Explore Blog</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default NotFound;