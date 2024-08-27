export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white py-6 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left Section */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold">WeatherApp</h3>
          <p className="text-gray-200 mt-1">Your reliable source for weather updates.</p>
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right">
          <p>&copy; 2024 WeatherApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

  