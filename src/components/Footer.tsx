const Footer = () => (
  <footer className="bg-black text-white">
    <div className="flex flex-col justify-center items-center py-4">
      <div>
        <span className="text-lg">Olimpiada de Informática - Quintana Roo</span>
        <span className="text-sm">© 2023</span>
      </div>
      <div>
        <span className="text-sm">Made with ❤️ by</span>{" "}
        <a
          href="https://github.com/imjpfeliciano"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
        >
          @imjpfeliciano
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
