const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/5 mt-20 relative z-10 glass-effect">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 font-inter text-sm">
          &copy; {new Date().getFullYear()} Aarush Rajak. All Rights Reserved.
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-space text-gray-500 uppercase">Status:</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse shadow-[0_0_10px_#00f5ff]"></span>
            <span className="text-white font-space text-sm">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
