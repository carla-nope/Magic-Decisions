import { useState, useEffect } from 'react'
import { BookOpen, ArrowRight, Mail, Sparkles, Heart, Brain, Plus, ExternalLink } from 'lucide-react'
import './index.css'

interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  featured: boolean
  readTime: string
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Psychology: Brain,
  Strategy: Sparkles,
  Lifestyle: Heart,
  Technology: BookOpen,
}

const CATEGORY_COLORS: Record<string, string> = {
  Psychology: 'purple',
  Strategy: 'emerald',
  Lifestyle: 'rose',
  Technology: 'blue',
}

function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load blog posts from manifest
    fetch('/blog-manifest.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || [])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const featuredPosts = posts.filter(p => p.featured)
  const recentPosts = posts.filter(p => !p.featured)

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

        {loading ? (
          <div className="flex items-center gap-3 text-slate-500 py-12">
            <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
            <span>Loading posts...</span>
          </div>
        ) : posts.length === 0 ? (
          /* Empty State - New CMS Setup */
          <div className="w-full max-w-4xl mb-12">
            <div className="mystical-card p-8 text-center bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Plus className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Welcome to Your Blog!</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Your blog is set up and ready. Click the button above to open the Content Manager and write your first post.
              </p>
              <div className="bg-slate-100 rounded-lg p-4 text-left max-w-md mx-auto">
                <p className="font-medium text-slate-700 mb-2 text-sm">How to add blog posts:</p>
                <ol className="text-slate-600 text-sm space-y-1">
                  <li>1. Click "Open CMS Editor" above</li>
                  <li>2. Sign in with GitHub/GitLab/Bitbucket</li>
                  <li>3. Click "New Blog Posts" to create</li>
                  <li>4. Write your post in Markdown</li>
                  <li>5. Click "Save" to publish</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Articles */}
            {featuredPosts.length > 0 && (
              <div className="w-full max-w-4xl mb-12">
                <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">Featured Articles</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => {
                    const Icon = CATEGORY_ICONS[post.category] || Brain
                    const color = CATEGORY_COLORS[post.category] || 'purple'
                    return (
                      <div key={post.slug} className="mystical-card p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-${color}-100 flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-6 h-6 text-${color}-600`} />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{post.category}</span>
                            <h3 className="font-bold text-slate-800 text-lg mb-2">{post.title}</h3>
                            <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-400">{post.readTime}</span>
                              <a
                                href={`/blog/${post.slug}`}
                                className="flex items-center gap-1 text-emerald-600 text-sm font-medium hover:text-emerald-700"
                              >
                                Read More <ArrowRight className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* More Articles */}
            {recentPosts.length > 0 && (
              <div className="w-full max-w-4xl mb-12">
                <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">More to Explore</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentPosts.map((post) => {
                    const Icon = CATEGORY_ICONS[post.category] || Brain
                    const color = CATEGORY_COLORS[post.category] || 'purple'
                    return (
                      <div key={post.slug} className="mystical-card p-5 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-8 h-8 rounded-lg bg-${color}-100 flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 text-${color}-600`} />
                          </div>
                          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{post.category}</span>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">{post.title}</h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{post.readTime}</span>
                          <a
                            href={`/blog/${post.slug}`}
                            className="flex items-center gap-1 text-emerald-600 text-sm font-medium hover:text-emerald-700"
                          >
                            Read <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}

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

        {/* SEO Content Section */}
        <div className="w-full max-w-3xl mt-8 mb-4">
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

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-slate-600 text-sm">
                <strong className="text-slate-700">Get Started:</strong> Try our free decision tools including the Yes No Oracle, Spin Wheel, Coin Flip, and Random Picker. No signup required—just instant decisions when you need them.
              </p>
            </div>
          </div>
        </div>

        {/* Internal Admin Link - Site Management */}
        <div className="w-full max-w-3xl mb-16">
          <div className="flex items-center justify-center">
            <a
              href="/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-500 text-xs transition-colors"
            >
              Site Administration
            </a>
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
  )
}

export default BlogPage
