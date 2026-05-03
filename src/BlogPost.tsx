import { useState, useEffect } from 'react'
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, Sparkles, Heart, Brain } from 'lucide-react'
import './index.css'

interface PostData {
  title: string
  date: string
  excerpt: string
  category: string
  featured: boolean
  author: string
  body: string
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

      if (typeof value === 'string') {
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1)
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1)
        }

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

// Simple markdown to HTML converter
function simpleMarkdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    // Lists
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    // Paragraphs (double line breaks)
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => {
      if (p.startsWith('<h') || p.startsWith('<li') || p.startsWith('<pre')) {
        return p
      }
      // Convert single line breaks to <br> within paragraphs
      return `<p>${p.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')

  // Wrap consecutive li elements in ul
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

  return html
}

interface BlogPostProps {
  slug: string
  onBack: () => void
}

function BlogPost({ slug, onBack }: BlogPostProps) {
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      try {
        const fileName = `${slug}.md`
        const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}/${encodeURIComponent(fileName)}`

        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error('Post not found')
        }

        const file = await response.json()
        const contentResponse = await fetch(file.download_url)
        const content = await contentResponse.text()

        const { data, body } = parseFrontmatter(content)

        const htmlContent = simpleMarkdownToHtml(body)

        setPost({
          title: String(data.title || 'Untitled'),
          date: String(data.date || new Date().toISOString().split('T')[0]),
          excerpt: String(data.excerpt || ''),
          category: String(data.category || 'General'),
          featured: Boolean(data.featured || false),
          author: String(data.author || 'MagicDecisions'),
          body: htmlContent,
          readTime: calculateReadTime(body),
        })

        setLoading(false)
      } catch (err) {
        console.error('Error fetching post:', err)
        setError('Failed to load post')
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({
        title: post?.title || 'Blog Post',
        text: post?.excerpt || '',
        url: url,
      })
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <div className="stars-bg" />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
          <div className="flex items-center gap-3 text-slate-500">
            <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
            <span>Loading post...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen relative">
        <div className="stars-bg" />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
          <div className="mystical-card p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Post Not Found</h2>
            <p className="text-slate-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
            <button onClick={onBack} className="mystical-btn">
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    )
  }

  const Icon = CATEGORY_ICONS[post.category] || Brain
  const color = CATEGORY_COLORS[post.category] || 'purple'

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        {/* Back Button */}
        <div className="w-full max-w-3xl mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </button>
        </div>

        {/* Article */}
        <article className="w-full max-w-3xl">
          <div className="mystical-card overflow-hidden">
            {/* Header */}
            <div className="p-8 pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-${color}-100 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${color}-600`} />
                </div>
                <span className="text-sm font-medium text-slate-400 uppercase tracking-wide">{post.category}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 leading-tight">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pb-6 border-b border-slate-200">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div
                className="prose prose-slate max-w-none
                  prose-headings:text-slate-800 prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-700 prose-strong:font-semibold
                  prose-ul:text-slate-600 prose-li:mb-2
                  prose-ol:text-slate-600
                  prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-4
                  prose-code:text-emerald-600 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-slate-800 prose-pre:text-slate-100"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />

              {/* Share */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                <span className="text-sm text-slate-500">Share this article:</span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  {copied ? (
                    <>
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Footer spacer */}
        <div className="h-24" />
      </div>
    </div>
  )
}

export default BlogPost