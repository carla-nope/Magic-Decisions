import { useState } from 'react'
import { BookOpen, ArrowRight, Mail, Sparkles, Heart, Brain, Clock, ExternalLink } from 'lucide-react'
import './index.css'

const blogPosts = [
  {
    id: 1,
    title: 'The Psychology Behind Decision Fatigue',
    excerpt: 'Why do we struggle with simple choices? Learn about cognitive load and how randomization tools can help preserve mental energy.',
    category: 'Psychology',
    icon: Brain,
    color: 'purple',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'When to Use Randomness vs Logic',
    excerpt: 'Not every decision needs deep analysis. Discover when it makes sense to let chance decide and when to think it through.',
    category: 'Strategy',
    icon: Sparkles,
    color: 'emerald',
    readTime: '4 min read',
    featured: true,
  },
  {
    id: 3,
    title: '10 Decisions You Should Never Overthink',
    excerpt: 'From what to eat for dinner to who drives—some choices deserve quick decisions, not hours of deliberation.',
    category: 'Lifestyle',
    icon: Heart,
    color: 'rose',
    readTime: '3 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'The Science of Randomness',
    excerpt: 'How computers generate random numbers and why true randomness matters for fair decision-making tools.',
    category: 'Technology',
    icon: BookOpen,
    color: 'blue',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'Breaking Analysis Paralysis',
    excerpt: 'When you have too many options and cannot choose, a random selector can be your best friend. Here\'s why.',
    category: 'Psychology',
    icon: Clock,
    color: 'amber',
    readTime: '4 min read',
    featured: false,
  },
];

const featuredPosts = blogPosts.filter(p => p.featured);
const recentPosts = blogPosts.filter(p => !p.featured);

function BlogPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm mb-4">
            <BookOpen className="w-4 h-4" />
            Blog & Resources
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            Making Better Decisions
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Practical insights on decision-making, psychology, and how to overcome choice overload.
          </p>
        </div>

        {/* Featured Articles */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => {
              const Icon = post.icon;
              return (
                <div key={post.id} className="mystical-card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-${post.color}-100 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 text-${post.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{post.category}</span>
                      <h3 className="font-bold text-slate-800 text-lg mb-2">{post.title}</h3>
                      <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{post.readTime}</span>
                        <button className="flex items-center gap-1 text-emerald-600 text-sm font-medium hover:text-emerald-700">
                          Read More <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card p-8 text-center bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
              <Mail className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Get Weekly Decision Tips</h3>
            <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
              Join thousands of readers who get practical insights on making better choices. No spam, just useful content.
            </p>
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-emerald-600">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">Thanks for subscribing! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mystical-input flex-1 text-center sm:text-left"
                  required
                />
                <button type="submit" className="mystical-btn whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-xs text-slate-400 mt-4">Unsubscribe anytime. We respect your inbox.</p>
          </div>
        </div>

        {/* More Articles */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">More to Explore</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map((post) => {
              const Icon = post.icon;
              return (
                <div key={post.id} className="mystical-card p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-${post.color}-100 flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 text-${post.color}-600`} />
                    </div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{post.category}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{post.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{post.readTime}</span>
                    <button className="flex items-center gap-1 text-emerald-600 text-sm font-medium hover:text-emerald-700">
                      Read <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* External Blog Link */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card p-6 text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Looking for More Content?</h3>
            <p className="text-slate-600 text-sm mb-4">
              Visit our external blog for in-depth articles, tutorials, and exclusive decision-making frameworks.
            </p>
            <button className="mystical-btn flex items-center gap-2 mx-auto">
              Visit Our Blog
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="w-full max-w-3xl mt-8 mb-16">
          <div className="mystical-card p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">About Magic Decisions Blog</h2>
            <p className="text-slate-600 mb-4">
              Welcome to the Magic Decisions blog, your resource for understanding how to make better choices in everyday life. We explore the psychology behind decision-making, offering practical tips for overcoming analysis paralysis and choosing wisely when faced with multiple options.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mb-3">What We Cover</h3>
            <ul className="text-slate-600 space-y-2 mb-4">
              <li>• Decision fatigue and how to manage it effectively</li>
              <li>• When randomness helps vs. when analysis is better</li>
              <li>• Practical tools and techniques for daily decisions</li>
              <li>• The science behind random selection tools</li>
              <li>• Real-world examples of decision-making in action</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-3">Why Trust Our Content?</h3>
            <p className="text-slate-600 mb-4">
              Our articles are based on research in cognitive psychology, behavioral economics, and practical experience with decision tools. We believe in evidence-based approaches while keeping content accessible and actionable.
            </p>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-slate-600 text-sm">
                <strong className="text-slate-700">Get Started:</strong> Try our free decision tools including the Yes No Oracle, Spin Wheel, Coin Flip, and Random Picker. No signup required—just instant decisions when you need them.
              </p>
            </div>
          </div>
        </div>

        {/* Footer spacer for fixed nav/footer */}
        <div className="h-24" />
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default BlogPage;