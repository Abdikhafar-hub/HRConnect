'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Briefcase, Phone, MapPin, Mail, MessageCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const CompanyProfile: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const handleContactSubmit = (data: ContactFormData) => {
    console.log('Contact Form Data:', data);
    alert('Message Sent!');
  };

  const handleChatSubmit = (message: string) => {
    setChatMessages([...chatMessages, { user: message, bot: "Hello! How can I assist you today?" }]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navbar Links */}
      <nav className="mb-8 text-center">
        <a href="#about" className="px-4 py-2 text-blue-600 hover:text-blue-800">About Us</a>
        <a href="#contact" className="px-4 py-2 text-blue-600 hover:text-blue-800">Contact Us</a>
        <a href="#career" className="px-4 py-2 text-blue-600 hover:text-blue-800">Careers</a>
        <a href="#chatbot" className="px-4 py-2 text-blue-600 hover:text-blue-800">AI Chatbot</a>
      </nav>

      {/* About Us Section */}
      <section id="about" className="mb-12">
        <h2 className="text-4xl font-bold text-center mb-6">About Us</h2>
        <p className="text-lg text-gray-700 leading-relaxed text-center">
          We are a leading company in the industry, dedicated to providing the best services to our clients.
          Our team is passionate about innovation, customer satisfaction, and sustainability. Join us on our journey to making a difference!
        </p>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="mb-12">
        <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit(handleContactSubmit)} className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium">Full Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium">Email</label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="block text-lg font-medium">Message</label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              id="message"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.message && <span className="text-red-600 text-sm">{errors.message.message}</span>}
          </div>

          <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
        </form>
      </section>

      {/* Career Section */}
      <section id="career" className="mb-12">
        <h2 className="text-4xl font-bold text-center mb-6">Careers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Software Engineer', desc: 'Join our team of passionate developers!' },
            { title: 'Product Manager', desc: 'Drive product development from idea to execution.' },
            { title: 'Marketing Specialist', desc: 'Help us build our brand and reach more customers!' }
          ].map((job, index) => (
            <Card key={index} className="bg-gray-100 shadow-md">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We are hiring for the role of {job.title}. Apply now to join an amazing team and make an impact.</p>
                <Button className="mt-4">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Chatbot Section */}
      <section id="chatbot" className="mb-12">
        <h2 className="text-4xl font-bold text-center mb-6">AI Chatbot</h2>
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.user ? 'justify-end' : 'justify-start'}`}>
                <div className={`w-3/4 p-4 rounded-lg ${message.user ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <p>{message.user || message.bot}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-3 border border-gray-300 rounded-md"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleChatSubmit((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyProfile;
