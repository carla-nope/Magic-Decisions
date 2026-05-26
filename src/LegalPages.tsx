import { useState } from 'react'
import { Shield, FileText, Info, Mail, Home, Sparkles, ArrowRight } from 'lucide-react'
import './index.css'

type Tool = 'home' | 'oracle' | 'spin' | 'coin' | 'picker' | 'activity' | 'dinner' | 'rps' | 'names' | 'privacy' | 'terms' | 'about' | 'contact'

// Privacy Policy Component
function PrivacyPolicy({ onNavigate }: { onNavigate: (page: Tool) => void }) {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      content: `We collect minimal information to provide our services:

• Input Data: When you use our tools (like typing names or adding options), this data is processed locally in your browser and is not stored on our servers.

• Usage Data: We may collect anonymous statistics about which tools are most popular to improve our service. This data does not identify you personally.

• Cookies: We may use essential cookies to maintain your preferences and session state. We do not use tracking or advertising cookies.

We do not sell, trade, or otherwise transfer your personal information to outside parties.`
    },
    {
      id: 'data-storage',
      title: 'Data Storage and Security',
      content: `Your data privacy is important to us:

• Local Storage: Some features (like history or preferences) may be stored in your browser's local storage. This data stays on your device and is not accessible by us.

• No Server Storage: We do not store your inputs, choices, or personal information on external servers.

• Security: Since we don't collect personal data, there's no risk of unauthorized access to your information on our servers.`
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      content: `Our website may use third-party services:

• Hosting: We use Vercel for website hosting. They may collect standard server logs.

• Analytics: We may use Google Analytics to understand traffic patterns. This data is anonymized and aggregated.

• Advertisements: If we display ads in the future, third-party ad networks may collect information about your visits.

These services have their own privacy policies. We encourage you to review them.`
    },
    {
      id: 'children',
      title: "Children's Privacy",
      content: `Our website is not directed at children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13, we will delete that information promptly.`
    },
    {
      id: 'rights',
      title: 'Your Rights',
      content: `You have the right to:

• Access your data stored locally in your browser
• Delete your local data by clearing your browser cache
• Opt-out of analytics by using browser privacy settings
• Contact us with any questions about your data

Since we don't collect personal data on our servers, there's no need to request data deletion from us.`
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.

If you have any questions about this Privacy Policy, please contact us using the information provided on our Contact page.`
    },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-[#A09080] hover:text-ink-800 mb-8 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-cream-300 text-secondary-400 text-sm mb-4">
            <Shield className="w-4 h-4" />
            Privacy & Legal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4 text-ink-800">
            Privacy Policy
          </h1>
          <p className="text-[#6B5E4E]">Last Updated: April 12, 2026</p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="mystical-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold font-display text-ink-800 mb-3">{section.title}</h3>
              <div className="text-[#6B5E4E] leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Terms & Conditions Component
function TermsConditions({ onNavigate }: { onNavigate: (page: Tool) => void }) {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: `By accessing and using Magic Decisions ("the Website"), you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to abide by these terms, please do not use this Website.

These Terms and Conditions apply to all users of the Website. We reserve the right to modify these terms at any time. Continued use of the Website after any changes constitutes acceptance of the new terms.`
    },
    {
      id: 'services',
      title: 'Description of Services',
      content: `Magic Decisions provides free online decision-making tools including:

• Yes No Oracle - Mystical yes/no question answering
• Spin Wheel - Customizable spinning wheel for random selection
• Coin Flip - Virtual coin tossing for binary decisions
• Random Picker - Random selection from user-defined options
• Activity Picker - Random activity suggestions from categorized lists
• Dinner Decider - Food and cuisine randomization
• Rock Paper Scissors - Classic game against computer
• Name Picker - Random name selection and team assignment
• Username Generator - Generate unique handles for social media
• Bio Generator - Create catchy bios for Instagram & dating apps
• Outfit Ideas - Get outfit inspiration by vibe & weather
• Decision Style Quiz - Discover if you're a Maximizer or Satisficer
• Cognitive Bias Test - Test your awareness of mental shortcuts
• Should I Buy It? - Make smarter purchasing decisions
• Magic Chores - Gamify tasks with magic-themed rewards

These tools are provided "as is" for entertainment and decision-making purposes.`
    },
    {
      id: 'usage',
      title: 'Acceptable Use',
      content: `You agree to use the Website only for lawful purposes. You agree NOT to:

• Use the Website in any way that violates applicable laws or regulations
• Attempt to gain unauthorized access to any part of the Website
• Use automated tools to overwhelm or disrupt the Website
• Share content that is defamatory, obscene, or offensive
• Use the Website for any commercial purpose without written permission

We reserve the right to terminate access for users who violate these terms.`
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer of Warranties',
      content: `The Website and services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied.

We do not guarantee:
• Uninterrupted, secure, or error-free service
• Accuracy or reliability of results from our tools
• That the Website will meet your specific requirements

The random results generated by our tools are for entertainment purposes only and should not be used as the sole basis for important life, financial, or medical decisions.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      content: `To the fullest extent permitted by law:

We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Website.

We are not responsible for:
• Loss of data or information
• Technical failures or downtime
• Actions taken based on tool results
• Any damages arising from reliance on the Website

Some jurisdictions may not allow these limitations, so some of these exclusions may not apply to you.`
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      content: `The Website and its original content, features, and functionality are owned by Magic Decisions and are protected by international copyright, trademark, and other intellectual property laws.

You may not:
• Copy, reproduce, or distribute our content without permission
• Use our trademarks or branding without authorization
• Create derivative works based on our Website

User-generated content (inputs to tools) remains your property, but you grant us a license to use it as needed to provide our services.`
    },
    {
      id: 'governing',
      title: 'Governing Law',
      content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which Magic Decisions operates, without regard to its conflict of law provisions.

Any disputes arising from these terms shall be resolved through binding arbitration or in the courts of that jurisdiction.

If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in effect.`
    },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-[#A09080] hover:text-ink-800 mb-8 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-cream-300 text-primary-400 text-sm mb-4">
            <FileText className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4 text-ink-800">
            Terms and Conditions
          </h1>
          <p className="text-[#6B5E4E]">Last Updated: April 12, 2026</p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="mystical-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold font-display text-ink-800 mb-3">{section.title}</h3>
              <div className="text-[#6B5E4E] leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// About Page Component
function AboutPage({ onNavigate }: { onNavigate: (page: Tool) => void }) {
  const beliefs = [
    { title: 'Deciding is a skill.', description: 'Kids can practice decision-making through small, safe, everyday choices.' },
    { title: 'Low-stakes choices matter.', description: 'Tiny decisions help kids build confidence, independence, and self-trust over time.' },
    { title: 'Fairness helps.', description: 'Random tools like dice, coin flips, and spin wheels make family choices feel less personal and more neutral.' },
    { title: 'Speed matters.', description: 'Some choices do not need 20 minutes of debate. A simple tool can help everyone move forward.' },
    { title: 'Privacy matters.', description: 'Our tools are designed to be simple and low-friction, without requiring sign-ups just to make a quick decision.' },
    { title: 'Learning can be fun.', description: 'This site is also a real-world business and web design learning project between a mom and daughter.' },
  ];

  const stats = [
    { number: '15', label: 'Decision Tools', color: 'text-secondary-400' },
    { number: '100%', label: 'Free to Use', color: 'text-secondary-400' },
    { number: '0', label: 'Required Sign-up', color: 'text-primary-400' },
    { number: 'Family', label: 'Built with Heart', color: 'text-secondary-400' },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-[#A09080] hover:text-ink-800 mb-8 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-cream-300 text-secondary-400 text-sm mb-4">
            <Info className="w-4 h-4" />
            About Us
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4 text-ink-800">
            About Magic Decisions
          </h1>
          <p className="text-xl text-[#6B5E4E] max-w-2xl mx-auto">
            Making everyday decisions easier, fairer, and a little more magical.
          </p>
        </div>

        {/* Introduction */}
        <div className="mystical-card p-8 mb-8 rounded-2xl">
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            Magic Decisions is a collection of free decision-making tools for kids, parents, families, classrooms, and anyone who occasionally gets stuck choosing what to do next.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed">
            We believe decision-making does not always have to feel heavy. Sometimes you need a fair coin flip, a quick spin wheel, a dice roll, or a playful prompt to help you move forward. For low-stakes everyday choices, a little bit of structure — and a little bit of magic — can make deciding feel easier.
          </p>
        </div>

        {/* Our Story */}
        <div className="mystical-card p-8 mb-8 rounded-2xl">
          <h2 className="text-2xl font-bold font-display text-ink-800 mb-4">Our Story</h2>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            Magic Decisions started with a very real problem in our own home: decision-making is hard.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            I am Carla, a single mom who has struggled with decisions myself. I know what it feels like to overthink, second-guess, delay, and wish someone else would just pick already. Then I started noticing something familiar in my 10-year-old daughter. She was beginning to struggle with decisions too — small choices, everyday choices, the kind that can still feel surprisingly big when you are a kid.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            Instead of turning it into another lecture, we decided to turn it into a project.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            Magic Decisions became something we could build together: a fun website full of simple tools that help make low-stakes choices feel less stressful and more playful. Along the way, my daughter gets to learn about web design, SEO, online business, creativity, and how an idea can become something real on the internet.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed">
            So this site is part family project, part learning lab, and part practical toolkit for families like ours.
          </p>
        </div>

        {/* Why We Built This */}
        <div className="mystical-card p-8 mb-8 rounded-2xl">
          <h2 className="text-2xl font-bold font-display text-ink-800 mb-4">Why We Built This Site</h2>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            We built Magic Decisions for the moments when a decision does not need to become a full family meeting.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            What should we eat? Which game should we play? Who goes first? What chore comes next? Which activity should we try today? Should we flip a coin and see how we feel about the result?
          </p>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            These are not life-or-death decisions. They are everyday moments. But everyday moments are where kids get to practice noticing preferences, making choices, handling outcomes, and learning that not every decision has to be perfect.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed">
            Magic Decisions gives families a low-pressure way to practice those skills. The tools are free, fast, and easy to use. No accounts. No downloads. No complicated setup. Just simple decision tools that help you pick, play, laugh, and move on.
          </p>
        </div>

        {/* Who It's For */}
        <div className="mystical-card p-8 mb-8 rounded-2xl">
          <h2 className="text-2xl font-bold font-display text-ink-800 mb-4">Who Magic Decisions Is For</h2>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            Magic Decisions is for parents who want to help their kids practice making choices without turning every decision into a battle. It is for kids who freeze when asked to choose, overthink simple options, say "I don't care" when they really do, or need a playful nudge to trust their own reaction.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            It is also for teachers, homeschool families, game-night planners, friend groups, and anyone who wants a fair, fun way to make small choices.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed">
            The site is designed for low-stakes decisions: choosing activities, assigning turns, picking prompts, making family routines more fun, or adding a little randomness to ordinary moments. It is not meant for medical, legal, financial, safety, or major life decisions.
          </p>
        </div>

        {/* What We Believe */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-display text-ink-800 mb-6 text-center">What We Believe</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {beliefs.map((belief) => (
              <div key={belief.title} className="mystical-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold font-display text-ink-800 mb-2">{belief.title}</h3>
                <p className="text-[#6B5E4E] text-sm">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mystical-card p-8 mb-8 rounded-2xl">
          <h2 className="text-2xl font-bold font-display text-ink-800 mb-6 text-center">Magic by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className={`text-4xl font-bold mb-1 ${stat.color}`}>{stat.number}</p>
                <p className="text-[#6B5E4E] text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Mission */}
        <div className="mystical-card p-8 mb-8 rounded-2xl">
          <h2 className="text-2xl font-bold font-display text-ink-800 mb-4">Our Mission</h2>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            Our mission is to make decision-making feel less stressful and more approachable for kids and families.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed">
            We are not here to tell families what to choose. We are here to give them simple tools that make choosing easier. Sometimes the tool gives you an answer. Sometimes it helps you realize what you actually wanted all along. Either way, the goal is the same: less stuck, more action, and a little more confidence with every small choice.
          </p>
        </div>

        {/* Start with a Small Decision */}
        <div className="mystical-card p-8 mb-8 rounded-2xl">
          <h2 className="text-2xl font-bold font-display text-ink-800 mb-4">Start with a Small Decision</h2>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            If you or your child tends to overthink, freeze, or avoid small choices, start with something easy. Flip a coin. Spin a wheel. Roll a die. Try a prompt. Notice how the result feels.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            That tiny reaction — relief, disappointment, excitement, hesitation — can tell you a lot.
          </p>
          <p className="text-[#6B5E4E] leading-relaxed mb-4">
            Ready to let a little magic guide your next low-stakes decision?
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="mystical-btn inline-flex items-center gap-2"
          >
            Try Our Free Decision Tools
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Lead Magnet CTA */}
        <div className="mystical-card p-8 text-center bg-cream-50 border border-cream-300 rounded-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-secondary-400" />
          </div>
          <h2 className="text-xl font-bold font-display text-ink-800 mb-3">
            Want to Help Kids Practice Confident Choices?
          </h2>
          <p className="text-[#6B5E4E] text-sm mb-6 max-w-md mx-auto">
            Get the free Decision Traps Guide and learn five common ways kids get stuck when making choices — plus simple prompts that make everyday decisions easier to practice.
          </p>
          <a
            href="https://go.magicdecisions.com/dt1"
            target="_blank"
            rel="noopener noreferrer"
            className="mystical-btn inline-flex items-center gap-2"
          >
            Get the Free Decision Traps Guide
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Contact Page Component
function ContactPage({ onNavigate }: { onNavigate: (page: Tool) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || 'Magic Decisions Contact Form');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:support@magicdecisions.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactMethods = [
    {
      emoji: '💬',
      title: 'General Inquiries',
      description: 'Questions about our tools or website',
      response: 'Usually within 24-48 hours',
    },
    {
      emoji: '🐛',
      title: 'Bug Reports',
      description: 'Report issues or unexpected behavior',
      response: 'Usually within 24 hours',
    },
    {
      emoji: '💡',
      title: 'Feature Requests',
      description: 'Suggest new tools or improvements',
      response: 'We review all suggestions weekly',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-[#A09080] hover:text-ink-800 mb-8 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-cream-300 text-secondary-400 text-sm mb-4">
            <Mail className="w-4 h-4" />
            Contact Us
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4 text-ink-800">
            Get in Touch
          </h1>
          <p className="text-[#6B5E4E] max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Response Times */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {contactMethods.map((method) => (
            <div key={method.title} className="mystical-card p-5 text-center rounded-2xl">
              <span className="text-3xl mb-3 block">{method.emoji}</span>
              <h3 className="font-semibold font-display text-ink-800 mb-1">{method.title}</h3>
              <p className="text-[#6B5E4E] text-sm mb-2">{method.description}</p>
              <p className="text-secondary-400 text-xs">{method.response}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="mystical-card p-8 text-center rounded-2xl">
            <span className="text-5xl mb-4 block">✨</span>
            <h2 className="text-2xl font-bold font-display text-ink-800 mb-3">Message Sent!</h2>
            <p className="text-[#6B5E4E] mb-4">
              Thank you for reaching out. We'll get back to you soon.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="text-secondary-400 hover:text-secondary-500"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mystical-card p-8 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[#6B5E4E] text-sm mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mystical-input w-full ${errors.name ? 'border-highlight-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-highlight-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-[#6B5E4E] text-sm mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mystical-input w-full ${errors.email ? 'border-highlight-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-highlight-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[#6B5E4E] text-sm mb-2">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mystical-input w-full"
              >
                <option value="">Select a topic...</option>
                <option value="general">General Inquiry</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-[#6B5E4E] text-sm mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`mystical-input w-full resize-none ${errors.message ? 'border-highlight-500' : ''}`}
                placeholder="How can we help you?"
              />
              {errors.message && <p className="text-highlight-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="mystical-btn w-full"
            >
              Send Message
            </button>
          </form>
        )}

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-xl font-bold font-display text-ink-800 mb-4 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="mystical-card p-5 rounded-2xl">
              <h3 className="font-semibold font-display text-ink-800 mb-2">How quickly do you respond?</h3>
              <p className="text-[#6B5E4E] text-sm">We typically respond within 24-48 hours on business days.</p>
            </div>
            <div className="mystical-card p-5 rounded-2xl">
              <h3 className="font-semibold font-display text-ink-800 mb-2">Can I request a new tool?</h3>
              <p className="text-[#6B5E4E] text-sm">Absolutely! We review all feature requests and add popular tools when possible.</p>
            </div>
            <div className="mystical-card p-5 rounded-2xl">
              <h3 className="font-semibold font-display text-ink-800 mb-2">Is my data safe?</h3>
              <p className="text-[#6B5E4E] text-sm">Yes. We don't store your personal information. See our Privacy Policy for details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PrivacyPolicy, TermsConditions, AboutPage, ContactPage };