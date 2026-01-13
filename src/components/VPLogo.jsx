const VPLogo = ({ className = "w-24 h-8" }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      
      {/* Letter V - Dark blue, sharp angular */}
      <path 
        d="M4 24 L4 8 L10 8 L14 16 L18 8 L24 8 L24 24 L20 24 L20 14 L16 20 L12 20 L8 14 L8 24 Z" 
        fill="#1E3A8A"
      />
      
      {/* Letter P - Blue gradient, rounded form, overlapping V */}
      <path 
        d="M28 8 L28 24 L32 24 L32 16 L38 16 Q42 16 42 12 Q42 8 38 8 Z M32 12 L38 12 Q40 12 40 12 Q40 12 38 12 L32 12 Z" 
        fill="url(#pGradient)"
      />
      
      {/* Circuit board lines with nodes - Light blue, emerging from P */}
      <g stroke="#60A5FA" strokeWidth="1.2" fill="#60A5FA">
        {/* Main line from lower-left curve of P */}
        <line x1="28" y1="20" x2="20" y2="26" />
        <circle cx="20" cy="26" r="1.8" />
        
        {/* Branch lines */}
        <line x1="20" y1="26" x2="16" y2="28" />
        <circle cx="16" cy="28" r="1.2" />
        
        <line x1="20" y1="26" x2="24" y2="28" />
        <circle cx="24" cy="28" r="1.2" />
        
        <line x1="20" y1="26" x2="18" y2="30" />
        <circle cx="18" cy="30" r="1.2" />
      </g>
    </svg>
  )
}

export default VPLogo

