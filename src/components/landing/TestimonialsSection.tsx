
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const testimonialsRef = useRef(null);
  
  // GSAP animations
  useEffect(() => {
    // Testimonials animation
    gsap.from(testimonialsRef.current, {
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power3.out"
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const testimonials = [
    {
      quote: "VIBER has transformed how I communicate with my friends. The mood indicators make it so much easier to understand the tone of messages!",
      name: "Sarah K.",
      title: "Marketing Director",
      avatar: "https://i.pravatar.cc/100?img=1"
    },
    {
      quote: "The Status Builder is incredibly creative. I love how I can express exactly what I'm feeling or doing in such a visual way.",
      name: "Marcus T.",
      title: "Graphic Designer",
      avatar: "https://i.pravatar.cc/100?img=2"
    },
    {
      quote: "The AI conversation summaries have been a game-changer for keeping track of important details in my work chats.",
      name: "Priya M.",
      title: "Project Manager",
      avatar: "https://i.pravatar.cc/100?img=3"
    },
    {
      quote: "I've never felt so understood in a chat app before. The vibe check feature helps my friends know when I need support without having to explicitly ask.",
      name: "Jordan L.",
      title: "Student",
      avatar: "https://i.pravatar.cc/100?img=4"
    },
    {
      quote: "As someone who works remotely, VIBER helps me stay connected with my team in a more meaningful way than regular messaging apps.",
      name: "Alex R.",
      title: "Software Developer",
      avatar: "https://i.pravatar.cc/100?img=5"
    }
  ];
  
  return (
    <div className="mb-16" ref={testimonialsRef}>
      <h3 className="text-2xl font-bold text-center mb-8 genz-gradient-text">What our users are saying</h3>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="pastel-card">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex gap-4 items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="rounded-full h-12 w-12 object-cover border-2 border-white/30"
                      />
                      <div>
                        <h4 className="font-semibold flex items-center gap-1">
                          {testimonial.name}
                          <BadgeCheck className="h-4 w-4 text-viber-purple" />
                        </h4>
                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                      </div>
                    </div>
                    <blockquote className="text-sm text-gray-600 italic bg-white/50 p-3 rounded-xl border border-white/30">"{testimonial.quote}"</blockquote>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex justify-center mt-4">
          <CarouselPrevious className="static translate-y-0 -translate-x-4" />
          <CarouselNext className="static translate-y-0 translate-x-4" />
        </div>
      </Carousel>
    </div>
  );
};

export default TestimonialsSection;
