export default function Footer() {
  return (
    <footer className="py-6 text-gray-600 z-50">
      <div className="container lg:max-w-screen-lg mx-auto px-3">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="flex items-center flex-col md:flex-row space-x-4 mb-4 md:mb-0">
            <div className="text-lg font-bold">StackClass</div>
            <div>Programming challenges for developers.</div>
          </div>
          <div className="flex space-x-4">
            <a href="/terms">Terms and Conditions</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
