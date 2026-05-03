import { useState, useEffect } from 'react'
import { BookOpen, ArrowRight, Mail, Sparkles, Heart, Brain, Plus, Calendar, Clock } from 'lucide-react'
import './index.css'

interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  featured: boolean
  author: string
  readTime: string
  body?: string
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

const REPO_OWNER = 'carla-nope'
const REPO_NAME = 'Magic-Decisions'
const CONTENT_PATH = 'content/blog'

function parseFrontmatter(content: string): { data: Record<string, string | boolean | number>; body: string } {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) {
    return { data: {}, body: content }
  }

  const frontmatter = frontmatterMatch[1]
  const body = content.slice(frontmatterMatch[0].length).trim()
  const data: Record<string, string | boolean | number> = {}

  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim()
      let value: string | boolean | number = line.slice(colonIndex + 1).trim()

      // Handle quoted strings
      if (typeof value === 'string') {
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1)
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1)
        }

        // Handle booleans
        if (value === 'true') value = true
        if (value === 'false') value = false
      }

      data[key] = value
    }
  })

  return { data, body }
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function BlogPostCard({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  const Icon = CATEGORY_ICONS[post.category] || Brain
  const color = CATEGORY_COLORS[post.category] || 'purple'

  return (
    <div
      className="mystical-card p-5 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg bg-${color}-100 flex items-center justify-center`}>
          <Icon className={`w-4 h-4 text-${color}-600`} />
        </div>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{post.category}</span>
      </div>
      <h3 className="font-bold text-slate-800 mb-2">{post.title}</h3>
      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium hover:text-emerald-700">
          Read <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  )
}

function BlogPage({ onNavigateToPost }: { onNavigateToPost?: (slug: string) => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Fetch the directory listing from GitHub API
        const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}`
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }

        const files = await response.json()
        const markdownFiles = files.filter((f: any) => f.name.endsWith('.md') || f.name.endsWith('.mdx'))

        // Fetch each post's content
        const postsData = await Promise.all(
          markdownFiles.map(async (file: any) => {
            const contentResponse = await fetch(file.download_url)
            const content = await contentResponse.text()
            const { data, body } = parseFrontmatter(content)

            return {
              slug: file.name.replace(/\.mdx?$/, ''),
              title: data.title || 'Untitled',
              date: data.date || new Date().toISOString().split('T')[0],
              excerpt: data.excerpt || '',
              category: data.category || 'General',
              featured: data.featured || false,
              author: data.author || 'MagicDecisions',
              readTime: calculateReadTime(body),
            }
          })
        )

        // Sort by date, newest first
        postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        setPosts(postsData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Failed to load blog posts')
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handlePostClick = (slug: string) => {
    // Trigger navigation - will be handled by parent or router
    if (onNavigateToPost) {
      onNavigateToPost(slug)
    }
    // Update URL without page reload
    window.history.pushState({}, '', `/blog/${slug}`)
    // Dispatch custom event for routing
    window.dispatchEvent(new CustomEvent('blog-post-navigate', { detail: { slug } }))
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
        ) : error ? (
          <div className="mystical-card p-8 text-center">
            <p className="text-slate-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mystical-btn"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="w-full max-w-4xl mb-12">
            <div className="mystical-card p-8 text-center bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Plus className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Welcome to Your Blog!</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Your blog is set up and ready. Click the button above to open the Content Manager and write your first post.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Articles */}
            {featuredPosts.length > 0 && (
              <div className="w-full max-w-4xl mb-12">
                <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">Featured Articles</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <div
                      key={post.slug}
                      className="mystical-card p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handlePostClick(post.slug)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-${CATEGORY_COLORS[post.category] || 'purple'}-100 flex items-center justify-center flex-shrink-0`}>
                          {(() => {
                            const Icon = CATEGORY_ICONS[post.category] || Brain
                            return <Icon className={`w-6 h-6 text-${CATEGORY_COLORS[post.category] || 'purple'}-600`} />
                          })()}
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{post.category}</span>
                          <h3 className="font-bold text-slate-800 text-lg mb-2">{post.title}</h3>
                          <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">{post.readTime}</span>
                            <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium hover:text-emerald-700">
                              Read More <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* More Articles */}
            {recentPosts.length > 0 && (
              <div className="w-full max-w-4xl mb-12">
                <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">More to Explore</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentPosts.map((post) => (
                    <BlogPostCard
                      key={post.slug}
                      post={post}
                      onClick={() => handlePostClick(post.slug)}
                    />
                  ))}
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
            <p className="text-xs text-slate-400 mt-4">Newsletter coming soon!</p>
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

// Also export the component for use in individual post pages
export { parseFrontmatter, formatDate, calculateReadTime, REPO_OWNER, REPO_NAME, CONTENT_PATH }