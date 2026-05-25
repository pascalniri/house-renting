export function Footer() {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <footer className="bg-linear-to-t from-blue-50/50 to-[#f8fafc] border border-slate-100 rounded-2xl py-8 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="text-blue-800 font-bold mb-4 md:mb-0 text-lg">
          Estates
        </div>
        <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
          <a href="#" className="hover:text-blue-800 transition-colors">
            Projects
          </a>
          <a href="#" className="hover:text-blue-800 transition-colors">
            Properties
          </a>
          <a href="#" className="hover:text-blue-800 transition-colors">
            Help
          </a>
          <a href="#" className="hover:text-blue-800 transition-colors">
            Privacy
          </a>
        </div>
        <div className="text-xs font-medium text-slate-400 mt-4 md:mt-0">
          © 2026 Estates
        </div>
      </footer>
    </div>
  );
}
