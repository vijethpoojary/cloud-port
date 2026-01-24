import { useEffect, useState } from 'react'
import { ArrowUp, ArrowDown, Zap, Code2, GitBranch, Star } from 'lucide-react'

const GitHubActivity = () => {
  const GITHUB_USERNAME = 'vijethpoojary'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  
  // Main metrics state
  const [metrics, setMetrics] = useState({
    userInfo: null,
    repos: [],
    events: [],
    commits30Days: 0,
    currentStreak: 0,
    longestStreak: 0,
    languages: {},
    hourlyActivity: Array(24).fill(0),
    dayActivity: Array(7).fill(0),
    totalRepos: 0,
    totalStars: 0,
    contributionsThisYear: 0,
    recentCommits: [],
  })

  // Fetch data from GitHub API
  const fetchGitHubData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch user info
      const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      const user = await userRes.json()

      // Fetch repos
      const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
      )
      const repos = await reposRes.json()

      // Fetch public events
      const eventsRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`
      )
      const events = await eventsRes.json()

      // Process data
      const processedData = processGitHubData(user, repos, events)
      
      setMetrics(prev => ({
        ...prev,
        userInfo: user,
        repos: repos,
        events: events,
        ...processedData,
      }))
      
      setLastUpdated(new Date())
      setLoading(false)
    } catch (err) {
      setError(`Failed to fetch GitHub data: ${err.message}`)
      setLoading(false)
    }
  }

  const processGitHubData = (user, repos, events) => {
    // Calculate commits in last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const commits30Days = events.filter(
      e => e.type === 'PushEvent' && new Date(e.created_at) > thirtyDaysAgo
    ).length

    // Calculate streaks and activity
    const activityMap = new Map()
    const hourlyActivity = Array(24).fill(0)
    const dayActivity = Array(7).fill(0)
    const languageMap = {}
    const recentCommits = []

    events.forEach(event => {
      const eventDate = new Date(event.created_at)
      const dateKey = eventDate.toISOString().split('T')[0]
      
      if (event.type === 'PushEvent') {
        activityMap.set(dateKey, (activityMap.get(dateKey) || 0) + 1)
        hourlyActivity[eventDate.getHours()]++
        dayActivity[eventDate.getDay()]++
        
        // Collect recent commits
        if (recentCommits.length < 10) {
          recentCommits.push({
            repo: event.repo.name,
            message: event.payload.commits?.[0]?.message || 'Commit',
            timestamp: eventDate,
            sha: event.payload.commits?.[0]?.sha?.slice(0, 7) || '',
          })
        }
      }
    })

    // Calculate streaks
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    
    for (let i = 0; i < 365; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateKey = date.toISOString().split('T')[0]
      
      if (activityMap.has(dateKey)) {
        tempStreak++
        if (i === 0 || i === 1) currentStreak = tempStreak
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 0
      }
    }

    // Aggregate languages from repos
    repos.forEach(repo => {
      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1
      }
    })

    // Sort languages by frequency and get top 5
    const topLanguages = Object.entries(languageMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .reduce((acc, [lang, count]) => {
        acc[lang] = count
        return acc
      }, {})

    // Count total stars
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)

    // Calculate contributions this year
    const yearAgo = new Date()
    yearAgo.setFullYear(yearAgo.getFullYear() - 1)
    const contributionsThisYear = events.filter(e => new Date(e.created_at) > yearAgo).length

    return {
      commits30Days,
      currentStreak,
      longestStreak,
      languages: topLanguages,
      hourlyActivity,
      dayActivity,
      totalRepos: repos.length,
      totalStars,
      contributionsThisYear,
      recentCommits,
    }
  }

  // Auto-refresh every 5 minutes
  useEffect(() => {
    fetchGitHubData()
    const interval = setInterval(fetchGitHubData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Helper components
  const TrendIndicator = ({ value, previous = null, isHigherBetter = true }) => {
    if (!previous) return null
    const isPositive = value >= previous
    const shouldShowGreen = isHigherBetter ? isPositive : !isPositive
    
    return (
      <div className={`flex items-center gap-1 text-xs font-medium ${shouldShowGreen ? 'text-green-600' : 'text-red-600'}`}>
        {shouldShowGreen ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
        {Math.abs(value - previous)}
      </div>
    )
  }

  const PercentageBar = ({ value, max, color = 'bg-aws-blue', label }) => {
    const percentage = (value / max) * 100
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-aws-text-primary text-xs font-medium">{label}</span>
          <span className="text-aws-text-secondary text-xs">{value}</span>
        </div>
        <div className="w-full h-2 bg-aws-bg-light rounded-full overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    )
  }

  const HeatmapCell = ({ value, maxValue }) => {
    const intensity = value / (maxValue || 1)
    const baseColor = [240, 112, 34] // Orange base
    const color = `rgb(${Math.floor(baseColor[0] * (1 - intensity * 0.7))}, ${Math.floor(baseColor[1] * (1 - intensity * 0.5))}, ${Math.floor(baseColor[2] * (1 - intensity * 0.3))})`
    
    return (
      <div
        className="w-4 h-4 rounded border border-aws-border hover:ring-2 ring-aws-blue transition-all"
        style={{ backgroundColor: color }}
        title={`${value} commits`}
      ></div>
    )
  }

  const LoadingSkeleton = () => (
    <div className="space-y-8 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="aws-card p-6 h-32 bg-aws-bg-light"></div>
      ))}
    </div>
  )

  if (error) {
    return (
      <div className="animate-slide-up">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-aws-text-primary mb-2">GitHub Activity</h2>
          <p className="text-aws-text-secondary">Real-time GitHub contribution insights</p>
        </div>
        <div className="aws-card p-6 border-red-200 bg-red-50">
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchGitHubData}
            className="mt-4 aws-button-primary"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="animate-slide-up">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-aws-text-primary mb-2">GitHub Activity</h2>
          <p className="text-aws-text-secondary">Real-time GitHub contribution insights</p>
        </div>
        <LoadingSkeleton />
      </div>
    )
  }

  const maxHourlyActivity = Math.max(...metrics.hourlyActivity, 1)
  const maxDayActivity = Math.max(...metrics.dayActivity, 1)
  const totalLanguageUsages = Object.values(metrics.languages).reduce((a, b) => a + b, 0)

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-aws-text-primary mb-2">GitHub Activity</h2>
          <p className="text-aws-text-secondary">Real-time GitHub contribution insights</p>
        </div>
        {lastUpdated && (
          <div className="text-right text-xs text-aws-text-secondary">
            <p>Last updated</p>
            <p className="font-medium text-aws-text-primary">
              {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Commits in 30 days */}
        <div className="aws-card p-6 hover:border-aws-border-dark transition-colors duration-150">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm text-aws-text-secondary">Commits (30d)</p>
            <Zap size={18} className="text-orange-500" />
          </div>
          <p className="text-3xl font-semibold text-aws-text-primary mb-2">
            {metrics.commits30Days}
          </p>
          <p className="text-xs text-aws-text-secondary">
            {(metrics.commits30Days / 30).toFixed(1)} per day
          </p>
        </div>

        {/* Current Streak */}
        <div className="aws-card p-6 hover:border-aws-border-dark transition-colors duration-150">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm text-aws-text-secondary">Current Streak</p>
            <Zap size={18} className="text-yellow-500" />
          </div>
          <p className="text-3xl font-semibold text-aws-text-primary mb-2">
            {metrics.currentStreak}
          </p>
          <p className="text-xs text-aws-text-secondary">
            Longest: {metrics.longestStreak} days
          </p>
        </div>

        {/* Repositories */}
        <div className="aws-card p-6 hover:border-aws-border-dark transition-colors duration-150">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm text-aws-text-secondary">Repositories</p>
            <GitBranch size={18} className="text-aws-blue" />
          </div>
          <p className="text-3xl font-semibold text-aws-text-primary mb-2">
            {metrics.totalRepos}
          </p>
          <p className="text-xs text-aws-text-secondary">
            {metrics.totalStars} stars total
          </p>
        </div>

        {/* Contributions This Year */}
        <div className="aws-card p-6 hover:border-aws-border-dark transition-colors duration-150">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm text-aws-text-secondary">Contributions</p>
            <Code2 size={18} className="text-green-600" />
          </div>
          <p className="text-3xl font-semibold text-aws-text-primary mb-2">
            {metrics.contributionsThisYear}
          </p>
          <p className="text-xs text-aws-text-secondary">This year</p>
        </div>
      </div>

      {/* Top Languages & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Programming Languages */}
        <div className="aws-card p-6">
          <h3 className="text-lg font-semibold text-aws-text-primary mb-6 flex items-center gap-2">
            <Code2 size={20} className="text-aws-blue" />
            Top Programming Languages
          </h3>
          <div className="space-y-4">
            {Object.entries(metrics.languages).map(([language, count]) => {
              const percentage = (count / totalLanguageUsages) * 100
              const colors = {
                'JavaScript': 'bg-yellow-500',
                'TypeScript': 'bg-blue-600',
                'Python': 'bg-blue-500',
                'Java': 'bg-orange-600',
                'Go': 'bg-cyan-500',
                'Rust': 'bg-orange-700',
                'C++': 'bg-blue-700',
                'CSS': 'bg-pink-500',
                'HTML': 'bg-orange-500',
                'Shell': 'bg-gray-700',
              }
              const color = colors[language] || 'bg-aws-blue'
              
              return (
                <div key={language} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-aws-text-primary">{language}</span>
                    <span className="text-xs text-aws-text-secondary">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-aws-bg-light rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Repository Stats */}
        <div className="aws-card p-6">
          <h3 className="text-lg font-semibold text-aws-text-primary mb-6 flex items-center gap-2">
            <Star size={20} className="text-yellow-500" />
            Repository Statistics
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-aws-bg-light border border-aws-border rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-aws-text-primary font-medium">Total Repositories</p>
                  <p className="text-xs text-aws-text-secondary mt-1">Public repositories available</p>
                </div>
                <p className="text-2xl font-semibold text-aws-blue">{metrics.totalRepos}</p>
              </div>
            </div>

            <div className="p-4 bg-aws-bg-light border border-aws-border rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-aws-text-primary font-medium">Total Stars</p>
                  <p className="text-xs text-aws-text-secondary mt-1">Stars across all repositories</p>
                </div>
                <p className="text-2xl font-semibold text-yellow-500">{metrics.totalStars}</p>
              </div>
            </div>

            <div className="p-4 bg-aws-bg-light border border-aws-border rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-aws-text-primary font-medium">Yearly Contributions</p>
                  <p className="text-xs text-aws-text-secondary mt-1">Commits and contributions</p>
                </div>
                <p className="text-2xl font-semibold text-green-600">{metrics.contributionsThisYear}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commit Activity Heatmap - By Hour */}
      <div className="aws-card p-6">
        <h3 className="text-lg font-semibold text-aws-text-primary mb-6">Commits by Hour</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-aws-text-secondary">Most active hours:</p>
            <p className="text-sm font-medium text-aws-text-primary">
              {metrics.hourlyActivity.indexOf(Math.max(...metrics.hourlyActivity))}:00 -{' '}
              {(metrics.hourlyActivity.indexOf(Math.max(...metrics.hourlyActivity)) + 1) % 24}:00
            </p>
          </div>
          <div className="grid grid-cols-12 gap-1">
            {metrics.hourlyActivity.map((count, hour) => (
              <div
                key={hour}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded border border-aws-border hover:ring-2 ring-aws-blue transition-all cursor-default"
                  style={{
                    height: '40px',
                    backgroundColor: `rgba(255, 153, 0, ${count / (maxHourlyActivity || 1) * 0.8})`,
                  }}
                  title={`${hour}:00 - ${count} commits`}
                ></div>
                <span className="text-xs text-aws-text-secondary">{hour}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commit Activity Heatmap - By Day of Week */}
      <div className="aws-card p-6">
        <h3 className="text-lg font-semibold text-aws-text-primary mb-6">Commits by Day of Week</h3>
        <div className="flex items-end justify-between gap-4">
          {metrics.dayActivity.map((count, dayIdx) => {
            const maxVal = Math.max(...metrics.dayActivity, 1)
            return (
              <div key={dayIdx} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full rounded border border-aws-border hover:ring-2 ring-aws-blue transition-all cursor-default"
                  style={{
                    height: `${(count / maxVal) * 120}px`,
                    backgroundColor: `rgba(255, 153, 0, ${count / maxVal * 0.8})`,
                  }}
                  title={`${dayLabels[dayIdx]}: ${count} commits`}
                ></div>
                <span className="text-sm text-aws-text-secondary font-medium">
                  {dayLabels[dayIdx]}
                </span>
                <span className="text-xs text-aws-text-secondary">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Commits */}
      <div className="aws-card p-6">
        <h3 className="text-lg font-semibold text-aws-text-primary mb-6">Recent Commits</h3>
        <div className="space-y-3">
          {metrics.recentCommits.length > 0 ? (
            metrics.recentCommits.map((commit, idx) => (
              <div
                key={idx}
                className="p-4 bg-aws-bg-light border border-aws-border rounded-md hover:border-aws-border-dark transition-colors duration-150"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-xs bg-aws-bg text-aws-text-secondary px-2 py-1 rounded font-mono">
                        {commit.sha}
                      </code>
                      <span className="text-xs text-aws-text-secondary">
                        {commit.repo.split('/')[1]}
                      </span>
                    </div>
                    <p className="text-sm text-aws-text-primary font-medium">
                      {commit.message.split('\n')[0]}
                    </p>
                    <p className="text-xs text-aws-text-secondary mt-2">
                      {new Date(commit.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-aws-text-secondary">No recent commits found</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-aws-border">
        <p className="text-xs text-aws-text-secondary">
          Data refreshes automatically every 5 minutes • Last updated:{' '}
          {lastUpdated?.toLocaleTimeString()}
        </p>
        <button
          onClick={fetchGitHubData}
          disabled={loading}
          className="mt-3 aws-button-secondary text-sm"
        >
          {loading ? 'Refreshing...' : 'Refresh Now'}
        </button>
      </div>
    </div>
  )
}

export default GitHubActivity
