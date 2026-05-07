import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, ShieldCheck, TrendingUp, Users, Calendar, 
  CheckCircle, Hammer, DollarSign, PieChart, Star
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './LandingPage.css';

export default function LandingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="landing-page">
      <Helmet>
        <title>RenovatePro | Premium Home Renovation Management SaaS</title>
        <meta name="description" content="Connect with top-rated contractors, manage your renovation budget, and track your projects with RenovatePro." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg">
          <img src="/hero-renovation.png" alt="Luxury Home Renovation" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <span className="hero-badge">Professional Renovation Management</span>
            <h1 className="hero-title">
              Build your dream space, <br />
              <span className="gradient-text">stress-free.</span>
            </h1>
            <p className="hero-subtitle">
              The ultimate platform to track expenses, manage contractors, and oversee every detail of your home renovation project.
            </p>
            <div className="hero-actions">
              <Link to="/signup">
                <Button size="lg" className="hero-btn-primary">
                  Start Your Project <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="ghost" className="hero-btn-secondary">
                  Login to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="stats-section">
        <div className="stats-container glass-panel">
          <div className="stat-item">
            <h2>$50M+</h2>
            <p>Budgets Managed</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h2>10,000+</h2>
            <p>Projects Completed</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h2>4.9/5</h2>
            <p>User Rating</p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="services-section">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-title">Everything you need to succeed</h2>
          <p className="section-subtitle">Powerful tools designed for homeowners and professionals alike.</p>
        </motion.div>

        <motion.div 
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Card className="service-card" hoverable>
              <div className="service-icon icon-blue"><PieChart size={28} /></div>
              <h3>Budget Tracking</h3>
              <p>Monitor every expense in real-time. Compare estimated costs with actual spending to stay on track.</p>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="service-card" hoverable>
              <div className="service-icon icon-green"><Calendar size={28} /></div>
              <h3>Task Management</h3>
              <p>Organize project phases, assign deadlines, and tick off tasks as your renovation progresses.</p>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="service-card" hoverable>
              <div className="service-icon icon-purple"><Users size={28} /></div>
              <h3>Contractor Hub</h3>
              <p>Keep all your contractor details, quotes, and contact information organized in one central place.</p>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="service-card" hoverable>
              <div className="service-icon icon-orange"><Hammer size={28} /></div>
              <h3>Material Lists</h3>
              <p>Create detailed shopping lists for materials, track vendors, and calculate total costs instantly.</p>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* GALLERY / SHOWCASE SECTION */}
      <section id="gallery" className="gallery-section">
        <div className="gallery-container">
          <motion.div 
            className="gallery-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Visualize the Possibilities</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', marginLeft: 0 }}>
              See how our users have transformed their spaces using our management tools to stay organized.
            </p>
            
            <ul className="feature-list">
              <li><CheckCircle size={20} color="var(--success)" /> <span>Real-time sync across devices</span></li>
              <li><CheckCircle size={20} color="var(--success)" /> <span>Export reports for contractors</span></li>
              <li><CheckCircle size={20} color="var(--success)" /> <span>Bank-level data security</span></li>
            </ul>

            <Link to="/signup">
              <Button style={{ marginTop: '2rem' }}>Get Started Today</Button>
            </Link>
          </motion.div>

          <motion.div 
            className="gallery-image-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-panel mockup-panel">
              <img src="/hero-renovation.png" alt="App Dashboard Mockup" className="mockup-img" />
              <div className="floating-card stat-card-float">
                <DollarSign size={24} color="var(--success)" />
                <div>
                  <p>Saved on Budget</p>
                  <h4>$4,250</h4>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="testimonials-section">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="section-title">Loved by homeowners</h2>
          <p className="section-subtitle">Don't just take our word for it.</p>
        </motion.div>

        <motion.div 
          className="testimonials-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {[
            { name: "Sarah Jenkins", role: "Homeowner", text: "RenovatePro completely saved our kitchen remodel. We stayed 10% under budget just by being able to track every small material cost." },
            { name: "Michael Chen", role: "Property Investor", text: "I manage 3-4 flips at a time. The dashboard gives me a bird's eye view of all my contractors and expenses. An absolute game-changer." },
            { name: "Emily Rodriguez", role: "Interior Designer", text: "I recommend this to all my clients. The visual task boards keep everyone aligned on what needs to happen next." }
          ].map((t, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="testimonial-card">
                <div className="stars">
                  {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="var(--warning)" color="var(--warning)" />)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-container glass-panel">
          <h2>Ready to start your renovation journey?</h2>
          <p>Join thousands of users who are building their dream spaces stress-free.</p>
          <Link to="/signup">
            <Button size="lg" className="cta-btn">Create Free Account</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
