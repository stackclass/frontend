export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto lg:max-w-screen-lg md:px-6 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">Codecraft</h3>
          <p className="text-gray-400">
            Programming challenges for developers.
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-4">SUPPORT</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Documentation</li>
            <li>Community</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-gray-400">
            <li>About</li>
            <li>Changelog</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">LEGAL</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
