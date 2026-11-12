const Footer = () => {
  return (
    <footer
      className="py-10 border-t relative z-10 glass-effect"
      style={{
        borderColor: "var(--color-line)",
        background: "rgba(10, 10, 16, 0.75)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div
          className="font-inter text-xs tracking-wider font-light flex items-center gap-2"
          style={{ color: "var(--color-muted)" }}
        >
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="font-syne font-bold text-white uppercase tracking-normal">Aarush Rajak</span>
          <span>• All Rights Reserved.</span>
        </div>

        <div className="flex items-center gap-6 text-xs font-space tracking-widest uppercase">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                background: "var(--color-amber)",
                boxShadow: "0 0 10px var(--color-amber)",
              }}
            />
            <span className="text-white font-medium">SYSTEM ONLINE</span>
          </div>

          <a
            href="#home"
            className="hover:text-white transition-colors"
            style={{ color: "var(--color-muted)" }}
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
