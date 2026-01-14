const VPLogo = ({ className = "w-24 h-8" }) => {
  // logo
  return (
    <img 
      src="/logo.png" 
      alt="Logo" 
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}

export default VPLogo

