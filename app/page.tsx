import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Briefcase,
  Shield,
  CreditCard,
  Star,
  Globe,
  ArrowRight,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Award,
  Zap,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WorkConnect
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                  🚀 Trusted by 50,000+ users across Africa
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Connect with
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}
                    Africa's{" "}
                  </span>
                  Best Workers
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  The most trusted platform connecting employers with skilled blue-collar workers across Africa. Find
                  reliable work or hire verified professionals in your area.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup?role=worker">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-6"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Find Work
                  </Button>
                </Link>
                <Link href="/auth/signup?role=employer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-lg px-8 py-6 bg-transparent"
                  >
                    <Briefcase className="w-5 h-5 mr-2" />
                    Hire Workers
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">25K+</div>
                  <div className="text-sm text-gray-600">Jobs Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder.svg?height=600&width=500"
                  alt="Workers using WorkConnect platform"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Registered Workers</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25,000+</div>
              <div className="text-gray-600">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15</div>
              <div className="text-gray-600">African Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Features</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose WorkConnect?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for the African market with features that matter most to local workers and employers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Verified & Trusted</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  All workers undergo ID verification with background checks. View ratings, reviews, and work history
                  before making hiring decisions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Integrated with M-Pesa, MTN Money, Airtel Money, and other mobile payment platforms. Escrow system
                  protects both parties.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Multilingual Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Available in English, Swahili, Hausa, Amharic, Arabic, French, and more. Communicate in your preferred
                  language.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  AI-powered algorithm matches workers with jobs based on location, skills, availability, and past
                  performance ratings.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Digital Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Clear, legally-binding digital contracts protect both workers and employers. Dispute resolution system
                  included.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Mobile Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Works perfectly on basic smartphones with slow internet connections. Offline mode for essential
                  features.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-700 mb-4">How It Works</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Process, Powerful Results</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and connect with opportunities or talent across Africa.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Workers */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">For Job Seekers</h3>
                <p className="text-gray-600">Find reliable work opportunities in your area</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Sign Up & Verify</h4>
                    <p className="text-gray-600">
                      Create your profile with phone verification and ID upload. Add your skills, experience, and
                      availability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Browse & Apply</h4>
                    <p className="text-gray-600">
                      Browse jobs in your area or get matched automatically. Apply with one tap and chat with employers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Work & Earn</h4>
                    <p className="text-gray-600">
                      Complete jobs safely with digital contracts. Get paid instantly to your mobile wallet upon
                      completion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Employers */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-green-600 mb-4">For Employers</h3>
                <p className="text-gray-600">Hire skilled workers quickly and safely</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Post Your Job</h4>
                    <p className="text-gray-600">
                      Describe your job requirements, budget, and timeline. Our system will find the best matches for
                      you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Review & Select</h4>
                    <p className="text-gray-600">
                      Review applications from verified workers. Check ratings, reviews, and previous work samples.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Hire & Pay Securely</h4>
                    <p className="text-gray-600">
                      Create digital contracts and pay through our secure escrow system. Release payment when satisfied.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 mb-4">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from thousands of workers and employers who trust WorkConnect for their needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "WorkConnect changed my life. I went from struggling to find work to having a steady income. The
                  platform is easy to use and payments are always on time."
                </p>
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">James Mwangi</div>
                    <div className="text-sm text-gray-600">Construction Worker, Nairobi</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "As a business owner, finding reliable workers was always a challenge. WorkConnect's verification
                  system gives me confidence in every hire."
                </p>
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Adebayo</div>
                    <div className="text-sm text-gray-600">Restaurant Owner, Lagos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "The mobile money integration is perfect for our market. I can pay workers instantly without worrying
                  about cash or bank transfers."
                </p>
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">Mohamed Kone</div>
                    <div className="text-sm text-gray-600">Contractor, Abidjan</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Work Life?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of workers and employers who trust WorkConnect for their success. Get started today and
              experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup?role=worker">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Start Finding Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/auth/signup?role=employer">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 bg-transparent"
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  Start Hiring Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">WorkConnect</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Connecting Africa's workforce with opportunities across the continent. Building the future of work, one
                connection at a time.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">For Workers</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/worker/jobs" className="text-gray-400 hover:text-white transition-colors">
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup?role=worker" className="text-gray-400 hover:text-white transition-colors">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="/help/worker" className="text-gray-400 hover:text-white transition-colors">
                    Worker Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="text-gray-400 hover:text-white transition-colors">
                    Safety Guidelines
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">For Employers</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/employer/post-job" className="text-gray-400 hover:text-white transition-colors">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup?role=employer" className="text-gray-400 hover:text-white transition-colors">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link href="/help/employer" className="text-gray-400 hover:text-white transition-colors">
                    Employer Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-gray-400 hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400">
                <p>&copy; 2024 WorkConnect. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
