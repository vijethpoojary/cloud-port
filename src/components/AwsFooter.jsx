const AwsFooter = ({ isCloudShellOpen, onCloudShellToggle }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      className={`fixed bottom-0 left-0 right-0 h-9 bg-[#232F3E] border-t border-[#1a232e] z-50 flex items-center justify-between px-4 text-xs text-gray-300 transition-all duration-300 ${
        isCloudShellOpen ? 'hidden' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <span>© {currentYear} Vijeth Poojary</span>
        <span className="text-gray-500">Inspired by AWS Management Console</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={onCloudShellToggle}
          className={`text-gray-300 hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-[#2C3E50] ${
            isCloudShellOpen ? 'bg-[#2C3E50] text-white' : ''
          }`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>CloudShell</span>
        </button>
        
        <a
          href="#"
          className="text-gray-300 hover:text-white hover:underline transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          Privacy
        </a>
        
        <a
          href="#"
          className="text-gray-300 hover:text-white hover:underline transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          Terms
        </a>
        
        <a
          href="#"
          className="text-gray-300 hover:text-white hover:underline transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          Cookie Preferences
        </a>
        
        <a
          href="#"
          className="text-gray-300 hover:text-white hover:underline transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          Feedback
        </a>
      </div>
    </footer>
  )
}

export default AwsFooter

