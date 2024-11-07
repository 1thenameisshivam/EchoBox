"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageSquare, Shield, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        "EchoBox has revolutionized how we gather feedback in our company. It's like having an anonymous suggestion box, but so much better!",
      author: "HR Manager at a Fortune 500 Company",
    },
    {
      quote:
        "As a student, I love being able to ask questions in class without feeling embarrassed. EchoBox has made learning so much more comfortable.",
      author: "University Student",
    },
    {
      quote:
        "The anonymity provided by EchoBox has led to more honest and constructive feedback in our team meetings.",
      author: "Tech Startup Founder",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Grid Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] z-0">
          <div
            className="absolute inset-0 bg-grid-white/[0.1]"
            style={{ backgroundSize: "30px 30px" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Empower Your Voice, Protect Your Identity
            </h1>
            <p className="text-xl mb-8">
              EchoBox: The revolutionary platform for anonymous feedback,
              comments, and questions. Speak your mind without revealing who you
              are.
            </p>
            <Link href={"/dashboard"}>
              <Button size="lg" className="text-lg px-8 rounded-full">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose EchoBox?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "100% Anonymous",
                description:
                  "Your identity remains completely hidden, ensuring honest and open communication.",
              },
              {
                icon: MessageSquare,
                title: "Versatile Feedback",
                description:
                  "From comments to questions, express yourself freely on any topic.",
              },
              {
                icon: Zap,
                title: "Instant Impact",
                description:
                  "See your feedback make a difference immediately, without fear of repercussions.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-primary mb-4 mx-auto transform group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8">
                <p className="text-2xl italic mb-6">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>
                <p className="font-semibold text-right">
                  - {testimonials[activeTestimonial].author}
                </p>
              </CardContent>
            </Card>
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeTestimonial ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {[
              {
                question: "Is EchoBox really 100% anonymous?",
                answer:
                  "Yes, EchoBox is designed with privacy as the top priority. We do not collect or store any personally identifiable information.",
              },
              {
                question: "How can I start using EchoBox?",
                answer:
                  "Simply click the 'Get Started' button and follow the prompts. No registration is required to submit feedback.",
              },
              {
                question: "Can EchoBox be integrated into existing systems?",
                answer:
                  "We offer API integrations for seamless incorporation into your existing platforms. Contact our support team for more details.",
              },
            ].map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Amplify Your Voice?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already benefiting from honest,
            anonymous communication with EchoBox.
          </p>
          <Link href={"/dashboard"}>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 rounded-full"
            >
              Start Taking Feedback
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-background text-center py-6">
        <p>&copy; 2023 EchoBox. All rights reserved.</p>
      </footer>
    </div>
  );
}
