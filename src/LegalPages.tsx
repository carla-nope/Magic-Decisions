import { useState } from 'react'
import { Shield, FileText, Info, Mail, Home } from 'lucide-react'
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
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm mb-4">
            <Shield className="w-4 h-4" />
            Privacy & Legal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last Updated: April 12, 2026</p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="mystical-card p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{section.title}</h3>
              <div className="text-gray-400 leading-relaxed whitespace-pre-line">
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
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm mb-4">
            <FileText className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
            Terms and Conditions
          </h1>
          <p className="text-gray-400">Last Updated: April 12, 2026</p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="mystical-card p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{section.title}</h3>
              <div className="text-gray-400 leading-relaxed whitespace-pre-line">
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
  const teamValues = [
    { emoji: '🎯', title: 'Fairness', description: 'Every choice should have an equal chance. We use proper randomization algorithms to ensure fairness.' },
    { emoji: '⚡', title: 'Speed', description: 'No sign-ups, no downloads, no delays. Get your answer instantly when you need it.' },
    { emoji: '🔒', title: 'Privacy', description: 'Your inputs stay on your device. We don\'t collect personal data or track your decisions.' },
    { emoji: '🎨', title: 'Delight', description: 'Tools should be fun to use. We add delightful animations and visual feedback to make decisions enjoyable.' },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm mb-4">
            <Info className="w-4 h-4" />
            About Us
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            About Magic Decisions
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're on a mission to make decision-making fun, fair, and effortless.
          </p>
        </div>

        {/* Our Story */}
        <div className="mystical-card p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Magic Decisions started with a simple frustration: deciding where to eat with friends. Everyone had different opinions, conversations dragged on, and sometimes we just ended up not eating together at all.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            We thought—what if there was a fun, magical way to make these decisions? Something that felt fair, didn't require accounts or downloads, and actually made the process enjoyable?
          </p>
          <p className="text-gray-400 leading-relaxed">
            That's how Magic Decisions was born. Today, we've expanded to eight tools that help with everything from daily food choices to team assignments for game night. Our philosophy is simple: for low-stakes decisions, why not let a little magic take the stress away?
          </p>
        </div>

        {/* Our Values */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">What We Believe</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {teamValues.map((value) => (
              <div key={value.title} className="mystical-card p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{value.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mystical-card p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Magic by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-purple-400 mb-1">15</p>
              <p className="text-gray-500 text-sm">Decision Tools</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-400 mb-1">100%</p>
              <p className="text-gray-500 text-sm">Free Forever</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-amber-400 mb-1">0</p>
              <p className="text-gray-500 text-sm">Required Sign-up</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-cyan-400 mb-1">200+</p>
              <p className="text-gray-500 text-sm">Built-in Options</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">Ready to let the magic guide your decisions?</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-purple-500/30"
          >
            Try Our Tools
          </button>
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
      window.location.href = `mailto:stubborndragonflies@gmail.com?subject=${subject}&body=${body}`;
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
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm mb-4">
            <Mail className="w-4 h-4" />
            Contact Us
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Response Times */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {contactMethods.map((method) => (
            <div key={method.title} className="mystical-card p-5 text-center">
              <span className="text-3xl mb-3 block">{method.emoji}</span>
              <h3 className="font-semibold text-white mb-1">{method.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{method.description}</p>
              <p className="text-cyan-400 text-xs">{method.response}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="mystical-card p-8 text-center">
            <span className="text-5xl mb-4 block">✨</span>
            <h2 className="text-2xl font-bold text-white mb-3">Message Sent!</h2>
            <p className="text-gray-400 mb-4">
              Thank you for reaching out. We'll get back to you soon.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="text-purple-400 hover:text-purple-300"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mystical-card p-8">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mystical-input w-full ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mystical-input w-full ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Subject</label>
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
              <label className="block text-gray-400 text-sm mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`mystical-input w-full resize-none ${errors.message ? 'border-red-500' : ''}`}
                placeholder="How can we help you?"
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Send Message
            </button>
          </form>
        )}

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="mystical-card p-5">
              <h3 className="font-semibold text-white mb-2">How quickly do you respond?</h3>
              <p className="text-gray-400 text-sm">We typically respond within 24-48 hours on business days.</p>
            </div>
            <div className="mystical-card p-5">
              <h3 className="font-semibold text-white mb-2">Can I request a new tool?</h3>
              <p className="text-gray-400 text-sm">Absolutely! We review all feature requests and add popular tools when possible.</p>
            </div>
            <div className="mystical-card p-5">
              <h3 className="font-semibold text-white mb-2">Is my data safe?</h3>
              <p className="text-gray-400 text-sm">Yes. We don't store your personal information. See our Privacy Policy for details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PrivacyPolicy, TermsConditions, AboutPage, ContactPage };