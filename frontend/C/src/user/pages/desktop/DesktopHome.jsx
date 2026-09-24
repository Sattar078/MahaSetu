import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, FileText, ShieldCheck, ClipboardList, Star, Landmark,
  ChevronRight, Globe, ArrowRight, Phone, CheckCircle2, Users,
  MapPin, Clock, Shield, Bot, Award, Search, Heart, Zap,
  BookOpen, ExternalLink, Mail, MessageSquare, HelpCircle,
  Menu, X
} from 'lucide-react';

/**
 * DesktopHome — Full website homepage shown on desktop (≥1024px).
 * Contains: Navbar, Hero, Features, How It Works, Stats, Testimonials, CTA, Footer.
 */
export default function DesktopHome() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for stats counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
  ];

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      
      {/* ═══════════════ TRICOLOR TOP BAR ═══════════════ */}
      <div className="h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] w-full sticky top-0 z-[60]" />

      {/* ═══════════════ DESKTOP NAVBAR ═══════════════ */}
      <nav className={`sticky top-1.5 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('#hero')}>
              <div className="w-9 h-9 rounded-xl bg-white p-0.5 flex items-center justify-center shadow-sm border border-slate-200">
                <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-extrabold text-[#000080] text-lg tracking-wide">DOWLET1</span>
                <p className="text-[9px] text-slate-400 -mt-0.5 font-medium tracking-wider">ONE PLATFORM • UNIFIED SERVICES</p>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-medium text-slate-600 hover:text-[#000080] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF9933] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#000080] transition-colors">
                <Globe size={16} />
                English
              </button>
              <button
                onClick={() => navigate('/role-select')}
                className="bg-gradient-to-r from-[#000080] to-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                Get Started <ArrowRight size={16} />
              </button>
            </div>

            {/* Mobile menu toggle for tablet */}
            <button
              className="lg:hidden text-slate-600 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown for tablet breakpoint */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white shadow-lg">
            <div className="px-6 py-4 space-y-3">
              {navLinks.map(link => (
                <button key={link.label} onClick={() => scrollTo(link.href)} className="block text-sm font-medium text-slate-600 hover:text-[#000080] w-full text-left py-2">
                  {link.label}
                </button>
              ))}
              <button onClick={() => navigate('/role-select')} className="w-full bg-[#000080] text-white py-2.5 rounded-xl text-sm font-bold mt-2">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section id="hero" className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000080] via-blue-900 to-[#0a1628]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #FF9933 0%, transparent 50%), radial-gradient(circle at 80% 20%, #138808 0%, transparent 50%)' }} />
        {/* Decorative DOWLET1 logo watermark */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[420px] h-[420px] select-none pointer-events-none hidden xl:flex items-center justify-center opacity-[0.05]">
          <img src="/dowlet-logo.png" alt="" className="w-full h-full object-contain filter brightness-200" />
        </div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#FF9933]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-40 w-96 h-96 bg-[#138808]/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="desktop-hero-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-white/20">
                <span className="text-xs font-bold text-[#FF9933]">GOV.IN</span>
                <span className="w-1 h-1 bg-white/40 rounded-full" />
                <span className="text-xs font-medium text-white/80">Unified Citizen Services</span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6">
                One Platform for{' '}
                <span className="bg-gradient-to-r from-[#FF9933] to-yellow-300 bg-clip-text text-transparent">
                  Unified Government
                </span>{' '}
                Services
              </h1>

              <p className="text-lg lg:text-xl text-blue-100/80 max-w-lg mb-8 leading-relaxed">
                Access certificates, scholarships, welfare schemes, and more — all from a single, intelligent platform powered by AI.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => navigate('/role-select')}
                  className="bg-gradient-to-r from-[#FF9933] to-orange-500 text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-[1.03] flex items-center gap-2"
                >
                  Get Started <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => scrollTo('#features')}
                  className="bg-white/10 backdrop-blur-md text-white px-8 py-3.5 rounded-xl text-sm font-bold border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  Explore Features <ChevronRight size={18} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 text-white/60">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-[#138808]" />
                  <span className="text-xs font-medium">Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#138808]" />
                  <span className="text-xs font-medium">Government Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-[#FF9933]" />
                  <span className="text-xs font-medium">AI Powered</span>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="hidden lg:flex justify-center desktop-hero-slide-up">
              <div className="relative">
                {/* Glow behind phone */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/20 to-[#138808]/20 blur-3xl rounded-full scale-110" />
                
                {/* Phone frame */}
                <div className="relative w-[280px] h-[560px] bg-slate-900 rounded-[3rem] border-4 border-slate-700 shadow-2xl overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-10" />
                  
                  {/* Screen content mockup */}
                  <div className="w-full h-full bg-gradient-to-b from-slate-50 to-white p-4 pt-10 overflow-hidden">
                    {/* Mini header */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-white p-0.5 flex items-center justify-center shadow-xs border border-slate-200">
                        <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
                      </div>
                      <span className="font-extrabold text-[#000080] text-[10px]">DOWLET1</span>
                    </div>
                    {/* Mini greeting */}
                    <p className="text-[9px] text-slate-500 mb-3">Good Morning, Rahul</p>
                    {/* Mini AI card */}
                    <div className="bg-gradient-to-br from-[#000080] to-blue-900 rounded-xl p-3 mb-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Sparkles size={10} className="text-[#FF9933]" />
                        <span className="text-white text-[8px] font-bold">DOWLET1 AI</span>
                      </div>
                      <p className="text-white text-[10px] font-bold">How can we help?</p>
                      <div className="bg-white/20 rounded-lg mt-2 h-5" />
                    </div>
                    {/* Mini quick actions */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {['📄', '📋', '🔖', '🪪'].map((e, i) => (
                        <div key={i} className="w-full aspect-square bg-slate-50 rounded-lg flex items-center justify-center text-sm border border-slate-100">{e}</div>
                      ))}
                    </div>
                    {/* Mini services */}
                    <div className="bg-white rounded-lg p-2 border border-slate-100 shadow-sm">
                      <p className="text-[7px] font-bold text-slate-400 uppercase mb-1">Services</p>
                      <div className="grid grid-cols-4 gap-1.5">
                        {['🏆', '🎓', '💼', '🌾', '❤️', '🚗', '💰', '⊞'].map((e, i) => (
                          <div key={i} className="w-full aspect-square bg-slate-50 rounded-md flex items-center justify-center text-[10px]">{e}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges around phone */}
                <div className="absolute -left-16 top-20 bg-white rounded-xl p-3 shadow-xl border border-slate-100 flex items-center gap-2 desktop-float-badge" style={{ animationDelay: '0s' }}>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-800">Verified</p>
                    <p className="text-[8px] text-slate-400">Identity secure</p>
                  </div>
                </div>

                <div className="absolute -right-20 top-40 bg-white rounded-xl p-3 shadow-xl border border-slate-100 flex items-center gap-2 desktop-float-badge" style={{ animationDelay: '0.5s' }}>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <Bot size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-800">AI Ready</p>
                    <p className="text-[8px] text-slate-400">Ask anything</p>
                  </div>
                </div>

                <div className="absolute -left-10 bottom-24 bg-white rounded-xl p-3 shadow-xl border border-slate-100 flex items-center gap-2 desktop-float-badge" style={{ animationDelay: '1s' }}>
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-800">Digital Docs</p>
                    <p className="text-[8px] text-slate-400">Always available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ═══════════════ KEY FEATURES ═══════════════ */}
      <section id="features" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-4">
              <Sparkles size={14} className="text-[#000080]" />
              <span className="text-xs font-bold text-[#000080]">PLATFORM FEATURES</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
              Everything You Need,{' '}
              <span className="text-[#000080]">One Platform</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              DOWLET1 simplifies government services with AI-powered assistance, verified identity reuse, and real-time application tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Bot, 
                color: 'text-[#FF9933]', 
                bg: 'bg-orange-50', 
                border: 'border-orange-100',
                title: 'AI-Powered Assistance',
                desc: 'Ask in English or Hindi. Our AI understands your needs and guides you to the right government service instantly.'
              },
              {
                icon: FileText, 
                color: 'text-blue-600', 
                bg: 'bg-blue-50', 
                border: 'border-blue-100',
                title: 'Digital Document Wallet',
                desc: 'Store and access your certificates, IDs, and documents digitally. Share securely with any government department.'
              },
              {
                icon: ShieldCheck, 
                color: 'text-emerald-600', 
                bg: 'bg-emerald-50', 
                border: 'border-emerald-100',
                title: 'Verified Information Reuse',
                desc: 'Enter your details once. Reuse verified information across eligible services — no repetitive form filling.'
              },
              {
                icon: ClipboardList, 
                color: 'text-purple-600', 
                bg: 'bg-purple-50', 
                border: 'border-purple-100',
                title: 'Application Tracking',
                desc: 'Real-time status updates for every application. Know exactly where your request stands in the pipeline.'
              },
              {
                icon: Star, 
                color: 'text-amber-600', 
                bg: 'bg-amber-50', 
                border: 'border-amber-100',
                title: 'Personalized Recommendations',
                desc: 'Receive service suggestions tailored to your profile, location, and eligibility — no more searching blindly.'
              },
              {
                icon: Landmark, 
                color: 'text-[#000080]', 
                bg: 'bg-indigo-50', 
                border: 'border-indigo-100',
                title: 'Multi-Department Access',
                desc: 'Certificates, education, healthcare, welfare, agriculture — access services from all departments in one place.'
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`group bg-white rounded-2xl p-6 border ${feature.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default`}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-1.5 mb-4">
              <Zap size={14} className="text-[#138808]" />
              <span className="text-xs font-bold text-[#138808]">HOW IT WORKS</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
              Simple Steps to{' '}
              <span className="text-[#138808]">Get Started</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              From registration to receiving your certificate — everything is streamlined.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Register', desc: 'Create your account with basic information and a phone number.', icon: Users, color: '#FF9933' },
              { step: '02', title: 'Verify Identity', desc: 'Connect your government ID for verified, reusable information.', icon: ShieldCheck, color: '#000080' },
              { step: '03', title: 'Apply for Services', desc: 'Choose a service, let AI pre-fill your form, upload documents.', icon: ClipboardList, color: '#138808' },
              { step: '04', title: 'Track & Receive', desc: 'Track progress in real-time and receive digital certificates.', icon: Award, color: '#FF9933' },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-slate-200 z-0" />
                )}
                
                <div className="relative z-10">
                  <div 
                    className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${item.color}10`, border: `2px solid ${item.color}30` }}
                  >
                    <item.icon size={32} style={{ color: item.color }} />
                  </div>
                  <div className="text-[11px] font-extrabold text-slate-300 mb-1">STEP {item.step}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ STATISTICS BAR ═══════════════ */}
      <section ref={statsRef} className="py-16 bg-gradient-to-r from-[#000080] via-blue-900 to-[#0a1628] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #FF9933 0%, transparent 40%), radial-gradient(circle at 70% 50%, #138808 0%, transparent 40%)' }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Government Services', icon: Landmark },
              { value: '36', label: 'States & UTs', icon: MapPin },
              { value: '100%', label: 'Digital Process', icon: Zap },
              { value: '24/7', label: 'Always Available', icon: Clock },
            ].map((stat, i) => (
              <div key={i} className={`transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-white/10 mx-auto mb-3 flex items-center justify-center">
                  <stat.icon size={22} className="text-[#FF9933]" />
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-blue-200/70 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="about" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 rounded-full px-4 py-1.5 mb-4">
              <Heart size={14} className="text-[#FF9933]" />
              <span className="text-xs font-bold text-[#FF9933]">CITIZEN VOICES</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
              Trusted by{' '}
              <span className="text-[#FF9933]">Citizens</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              See how DOWLET1 is transforming the government service experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: 'Priya Sharma',
                location: 'Jaipur, Rajasthan',
                avatar: '👩',
                text: '"I got my income certificate in just 3 days through DOWLET1. The AI assistant helped me understand exactly which documents I needed. Amazing!"',
                rating: 5,
              },
              {
                name: 'Amit Patel',
                location: 'Ahmedabad, Gujarat',
                avatar: '👨',
                text: '"No more visiting multiple offices. I applied for my son\'s scholarship and tracked it in real-time. The verified info reuse saved so much time."',
                rating: 5,
              },
              {
                name: 'Sunita Devi',
                location: 'Patna, Bihar',
                avatar: '👩‍🦱',
                text: '"As a first-time user, the AI guided me step by step in Hindi. I could understand everything clearly. Very grateful for this platform."',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, s) => (
                    <Star key={s} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">{testimonial.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin size={10} /> {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Citizen testimonials note */}
          <p className="text-center text-[11px] text-slate-300 mt-8 italic">
            * User experiences collected from verified citizen beneficiaries across participating states.
          </p>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="py-20 bg-gradient-to-br from-[#FF9933]/5 via-white to-[#138808]/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[#000080] to-blue-900 rounded-3xl p-10 lg:p-16 shadow-2xl relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9933]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#138808]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
                Ready to Simplify Your{' '}
                <span className="text-[#FF9933]">Government Services?</span>
              </h2>
              <p className="text-blue-100/80 text-lg mb-8 max-w-xl mx-auto">
                Join millions of citizens accessing services through a single, intelligent platform.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => navigate('/role-select')}
                  className="bg-gradient-to-r from-[#FF9933] to-orange-500 text-white px-8 py-4 rounded-xl text-base font-bold shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-[1.03] flex items-center gap-2"
                >
                  Get Started <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => scrollTo('#features')}
                  className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl text-base font-bold border border-white/20 hover:bg-white/20 transition-all"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ DESKTOP FOOTER ═══════════════ */}
      <footer className="bg-slate-900 text-white">
        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/95 p-1 flex items-center justify-center">
                  <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-extrabold text-lg tracking-wide">DOWLET1</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                One Platform for Unified Government Services. Making citizen services accessible, transparent, and intelligent.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors">
                  <ExternalLink size={14} />
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors">
                  <Mail size={14} />
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors">
                  <MessageSquare size={14} />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-slate-300">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Home', action: () => navigate('/home') },
                  { label: 'Explore Services', action: () => navigate('/services') },
                  { label: 'My Documents', action: () => navigate('/documents') },
                  { label: 'My Applications', action: () => navigate('/applications') },
                  { label: 'AI Assistant', action: () => navigate('/ai') },
                ].map((item, i) => (
                  <li key={i}>
                    <button onClick={item.action} className="text-slate-400 hover:text-[#FF9933] text-sm transition-colors flex items-center gap-1.5">
                      <ChevronRight size={12} /> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Government */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-slate-300">Government</h4>
              <ul className="space-y-3">
                {['Departments', 'Announcements', 'Welfare Schemes', 'Education', 'Healthcare'].map((item, i) => (
                  <li key={i}>
                    <span className="text-slate-400 hover:text-[#FF9933] text-sm transition-colors cursor-pointer flex items-center gap-1.5">
                      <ChevronRight size={12} /> {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-slate-300">Support</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Help Center', icon: HelpCircle },
                  { label: 'Feedback', icon: MessageSquare },
                  { label: 'Privacy Policy', icon: Shield },
                  { label: 'Terms of Service', icon: BookOpen },
                  { label: 'Accessibility', icon: Users },
                ].map((item, i) => (
                  <li key={i}>
                    <span className="text-slate-400 hover:text-[#FF9933] text-sm transition-colors cursor-pointer flex items-center gap-1.5">
                      <item.icon size={12} /> {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs">
              © 2025 DOWLET1 — Unified Citizen Services Portal • Government of India 🇮🇳
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#FF9933]" />
              <div className="h-2 w-2 rounded-full bg-white" />
              <div className="h-2 w-2 rounded-full bg-[#138808]" />
            </div>
            <p className="text-slate-500 text-xs">
              Secured by National Citizen Data Mesh
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
