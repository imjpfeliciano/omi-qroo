const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 shadow-lg">
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span className="text-base font-medium text-gray-900">
            Olimpiada de Informática - Quintana Roo
          </span>
          <span className="text-sm text-gray-600">© {currentYear}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Made with</span>
          <span className="text-red-500" aria-label="love">
            ❤️
          </span>
          <span>by</span>
          <a
            href="https://github.com/imjpfeliciano/omi-qroo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 ease-in-out hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            @cancun-devs
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
