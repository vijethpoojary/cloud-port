# GitHub Activity Component Documentation

## Component Overview
The `GitHubActivity` component is an AWS-themed React component that fetches and displays real GitHub activity data for a user, providing comprehensive insights into their coding patterns and contributions.

## File Location
`src/components/GitHubActivity.jsx`

## Key Features Implemented

### 1. **Real GitHub API Integration**
- Fetches data from the GitHub REST API (no authentication required for public data)
- Uses three main endpoints:
  - `https://api.github.com/users/{username}` - User profile info
  - `https://api.github.com/users/{username}/repos` - Repository data
  - `https://api.github.com/users/{username}/events/public` - Public activity events

### 2. **Core Metrics Displayed**
- **Commits in Last 30 Days**: Daily average calculation
- **Current Coding Streak**: Consecutive days with commits
- **Longest Streak**: All-time longest streak
- **Total Repositories**: Count of all public repos
- **Total Stars**: Sum of stars across all repos
- **Yearly Contributions**: Total commits for the current year
- **Top 5 Programming Languages**: With percentage bars
- **Commit Activity by Hour**: Heatmap showing most active hours (0-23)
- **Commit Activity by Day of Week**: Bar chart showing weekly patterns
- **Recent Commits**: Last 10 commits with repo name, message, and timestamp

### 3. **Styling & Design**
- **AWS Theme Classes**: Uses `aws-card`, `aws-text-primary`, `aws-text-secondary`, `aws-blue`, `aws-bg-light`, `aws-border`
- **Tailwind Utilities**: Responsive grid layouts, spacing, shadows
- **Smooth Animations**: Slide-up entry, fade transitions, hover effects
- **Color Coding**: Language-specific colors, gradient indicators
- **Gradient Backgrounds**: Orange (#FF9900) and AWS Blue (#0073BB) themed

### 4. **Loading & Error Handling**
- Loading skeleton animation while fetching data
- User-friendly error messages with retry button
- Visual loading states on buttons

### 5. **Auto-Refresh Functionality**
- Data automatically refreshes every 5 minutes
- Manual refresh button available
- "Last updated" timestamp display

### 6. **Performance Optimizations**
- Component state management for caching
- Efficient data processing and filtering
- Smooth transitions and animations

## Component Structure

### Main Sections
1. **Header** - Title and last updated timestamp
2. **Key Metrics** - 4-column grid of main stats
3. **Languages & Repository Stats** - 2-column grid with language breakdown and repo statistics
4. **Hourly Commit Heatmap** - Interactive visualization of commits by hour
5. **Daily Commit Chart** - Bar chart showing weekly patterns
6. **Recent Commits List** - Scrollable list of latest commits
7. **Footer** - Refresh controls and last updated info

### Helper Components
- `TrendIndicator()` - Shows up/down arrows with value changes
- `PercentageBar()` - Reusable progress bar component
- `HeatmapCell()` - Individual heatmap cell visualization
- `LoadingSkeleton()` - Animated loading state

## Data Calculations

### Streak Calculation
- Checks activity for the last 365 days
- Calculates current streak (0 if no commit today/yesterday)
- Tracks longest streak across all time

### Language Analytics
- Aggregates languages from all repositories
- Calculates percentage of total languages used
- Displays top 5 with visual percentage bars

### Activity Heatmaps
- **Hourly**: 24-hour array tracking commits per hour
- **Daily**: 7-day array tracking commits per day of week
- Color intensity represents activity level

## Usage

### In Your App.jsx or Router
```jsx
import GitHubActivity from './components/GitHubActivity'

// Add to your component where you want it displayed
<GitHubActivity />
```

## GitHub Username Configuration
Currently configured for: **vijethpoojary**

To change the user, modify line 4 in the component:
```jsx
const GITHUB_USERNAME = 'your-github-username'
```

## API Rate Limits
The GitHub REST API allows:
- **60 requests per hour** (unauthenticated)
- **6000 requests per hour** (authenticated with token)

The component makes 3 API calls per refresh cycle, so you can refresh approximately every 20 seconds without hitting limits.

## Data Visualization Features

### Color Scheme
- **Orange (#FF9900)**: Primary AWS accent, heatmap intensity
- **Blue (#0073BB)**: AWS blue, metrics highlights
- **Green**: Positive trends, healthy status
- **Yellow**: Neutral status, stars
- **Language-Specific Colors**: JavaScript (yellow), TypeScript (blue), Python (blue), etc.

### Interactive Elements
- Hover effects on metric cards
- Heatmap cells show commit counts on hover
- Responsive grid layout for all screen sizes
- Smooth transitions and animations

## Browser Compatibility
- Modern browsers with ES6+ support
- Requires React 16.8+ (Hooks support)
- Requires Tailwind CSS and Lucide React icons

## Performance Notes
- Efficient state management with useEffect
- Minimal re-renders through proper state structure
- Caching of processed data
- Automatic cleanup of intervals on unmount
