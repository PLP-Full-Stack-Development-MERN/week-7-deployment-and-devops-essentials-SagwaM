import { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { 
  Typography, 
  Grid, 
  Box, 
  Paper, 
  Chip, 
  Card, 
  CardContent, 
  Avatar, 
  Button,
  Container as MuiContainer,
  useTheme
} from "@mui/material";
import SimpleIcon from '@mui/icons-material/MoreHoriz';
import QualityIcon from '@mui/icons-material/Star';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Section from "@/components/ui-custom/Section";

const About = () => {
  const theme = useTheme();
  
  const refs = {
    header: useRef(null),
    mission: useRef(null),
    team: useRef(null),
    values: useRef(null)
  };
  
  const [visible, setVisible] = useState({
    header: false,
    mission: false,
    team: false,
    values: false
  });

  useEffect(() => {
    const observers = {};
    
    Object.keys(refs).forEach(key => {
      if (refs[key].current) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisible(prev => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.1 }
        );
        
        observers[key].observe(refs[key].current);
      }
    });
    
    return () => {
      Object.values(observers).forEach(observer => {
        observer.disconnect();
      });
    };
  }, []);

  const getFadeProps = (key) => ({
    style: {
      opacity: visible[key] ? 1 : 0,
      transform: visible[key] ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.7s, transform 0.7s'
    }
  });

  const team = [
    {
      name: "Alex Morgan",
      role: "Founder & Creative Director",
      bio: "With over 15 years in design and publishing, Alex founded Storyscape to create a platform that respects both writers and readers.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Jamie Chen",
      role: "Lead Developer",
      bio: "Jamie builds elegant, responsive interfaces with a focus on accessibility and performance.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sam Wilson",
      role: "Content Strategist",
      bio: "Sam helps writers craft compelling narratives that resonate with readers and align with their goals.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <Section>
        <Container>
          <Box 
            ref={refs.header}
            {...getFadeProps('header')}
            sx={{ 
              textAlign: 'center', 
              maxWidth: '800px', 
              mx: 'auto' 
            }}
          >
            <Chip 
              label="Our Story" 
              color="primary" 
              sx={{ mb: 3, bgcolor: 'primary.light', color: 'primary.dark' }} 
            />
            <Typography variant="h2" component="h1" gutterBottom>
              About Storyscape
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary"
              sx={{ fontWeight: 'normal' }}
            >
              We believe in the power of thoughtful writing and meaningful storytelling. 
              Our platform is designed to highlight what matters most—your words.
            </Typography>
          </Box>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section sx={{ bgcolor: 'action.hover' }}>
        <Container size="lg">
          <Grid 
            container 
            spacing={6} 
            alignItems="center"
            ref={refs.mission}
            {...getFadeProps('mission')}
          >
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Our Mission
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                paragraph
                sx={{ fontSize: '1.125rem' }}
              >
                Storyscape was founded with a simple but powerful mission: to create a 
                platform where content comes first. We believe that great writing deserves 
                a distraction-free environment that highlights the beauty of words.
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ fontSize: '1.125rem' }}
              >
                In a digital landscape filled with noise, we provide a calm, focused 
                space for both writers and readers. Every design decision we make prioritizes 
                readability, accessibility, and the pure joy of sharing ideas.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={4}
                sx={{ 
                  borderRadius: theme.shape.borderRadius * 2,
                  overflow: 'hidden',
                  height: '100%'
                }}
              >
                <Box 
                  component="img" 
                  src="https://images.unsplash.com/photo-1524678714210-9917a6c619c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="A peaceful office workspace with minimal design" 
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Section>

      {/* Values Section */}
      <Section>
        <Container>
          <Box 
            ref={refs.values}
            {...getFadeProps('values')}
            sx={{ 
              textAlign: 'center', 
              maxWidth: '800px', 
              mx: 'auto',
              mb: 8
            }}
          >
            <Typography variant="h3" gutterBottom>
              Our Values
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ fontSize: '1.125rem' }}
            >
              These core principles guide everything we do at Storyscape, 
              from design decisions to how we interact with our community.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                title: "Simplicity",
                description: "We believe in removing unnecessary complexity and focusing on what truly matters.",
                icon: SimpleIcon,
              },
              {
                title: "Quality",
                description: "We prioritize thoughtful, well-crafted experiences over quantity or quick solutions.",
                icon: QualityIcon,
              },
              {
                title: "Accessibility",
                description: "We design for everyone, ensuring our platform is usable by people of all abilities.",
                icon: AccessibilityIcon,
              },
            ].map((value, index) => (
              <Grid 
                item 
                xs={12} 
                md={4} 
                key={index}
                sx={{ 
                  transition: 'all 0.7s',
                  transitionDelay: `${index * 100 + 200}ms`,
                  opacity: visible.values ? 1 : 0,
                  transform: visible.values ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 2.5 
                      }}
                    >
                      <Box 
                        sx={{ 
                          p: 1.5, 
                          borderRadius: '50%', 
                          bgcolor: 'primary.light', 
                          color: 'primary.dark',
                          display: 'flex'
                        }}
                      >
                        <value.icon />
                      </Box>
                    </Box>
                    <Typography variant="h5" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Team Section */}
      <Section sx={{ bgcolor: 'action.hover' }}>
        <Container>
          <Box 
            ref={refs.team}
            {...getFadeProps('team')}
            sx={{ 
              textAlign: 'center', 
              maxWidth: '800px', 
              mx: 'auto',
              mb: 8
            }}
          >
            <Typography variant="h3" gutterBottom>
              Our Team
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ fontSize: '1.125rem' }}
            >
              Meet the passionate individuals behind Storyscape. We're a small but dedicated 
              team committed to creating the best platform for writers and readers alike.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid 
                item 
                xs={12} 
                md={4} 
                key={index}
                sx={{ 
                  transition: 'all 0.7s',
                  transitionDelay: `${index * 100 + 300}ms`,
                  opacity: visible.team ? 1 : 0,
                  transform: visible.team ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{ width: 80, height: 80, mx: 'auto', mb: 3 }}
                    />
                    <Typography variant="h5" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography 
                      color="primary" 
                      variant="subtitle2" 
                      gutterBottom
                    >
                      {member.role}
                    </Typography>
                    <Typography color="text.secondary">
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Final CTA Section */}
      <Section>
        <Container size="md">
          <Card 
            sx={{ 
              borderRadius: theme.shape.borderRadius * 3,
              textAlign: 'center',
              p: { xs: 4, md: 6 }
            }}
          >
            <CardContent>
              <Typography variant="h3" gutterBottom>
                Join Our Journey
              </Typography>
              <Typography 
                color="text.secondary" 
                sx={{ 
                  mb: 4, 
                  fontSize: '1.125rem',
                  maxWidth: 600,
                  mx: 'auto'
                }}
              >
                We're building a community of thoughtful writers and readers who value 
                quality content and minimalist design. We'd love for you to be a part of it.
              </Typography>
              <Box 
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  justifyContent: 'center'
                }}
              >
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  component={RouterLink}
                  to="/contact"
                >
                  Get in Touch
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  component={RouterLink}
                  to="/blog"
                >
                  Explore Stories
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  );
};

export default About;
