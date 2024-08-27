import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../../public/images/logo.jpg';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

// Large Screen Header
function LargeScreenHeader({ handleLogout }) {
  return (
    <nav className="hidden md:flex items-center justify-between py-4 px-8 bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <Image src={logo} width={50} height={50} alt="Weather Logo" className="rounded-full" />
        <span className="text-white text-2xl font-bold tracking-wide">WeatherApp</span>
      </div>

      {/* Menu Items */}
      <ul className="flex items-center space-x-6 text-white font-semibold">
        <li className="hover:text-gray-200 transition-colors duration-200">
          <a href="/weather" className="block px-4 py-2">Weather</a>
        </li>
        {auth.currentUser ? (
          <li className="hover:text-gray-200 transition-colors duration-200">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-all duration-200"
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="hover:text-gray-200 transition-colors duration-200">
              <a href="/login" className="block px-4 py-2">Login</a>
            </li>
            <li className="hover:text-gray-200 transition-colors duration-200">
              <a href="/register" className="block px-4 py-2">Register</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

// Small Screen Header
function SmallScreenHeader({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="md:hidden flex items-center justify-between py-4 px-6 bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image src={logo} width={50} height={50} alt="Weather Logo" className="rounded-full" />
        <span className="text-white text-xl font-bold tracking-wide">WeatherApp</span>
      </div>

      {/* Menu Icon for Mobile */}
      <button
        className="text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <AiOutlineClose /> : <FiMenu />}
      </button>

      {/* Slide-In Menu Items */}
      <ul className={`fixed inset-0 bg-green-800 h-40 bg-opacity-95 p-8 flex flex-col space-y-4 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
        <li className="hover:text-gray-300">
          <a href="/weather" className="block text-white text-lg">Weather</a>
        </li>
        {auth.currentUser ? (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-all duration-200"
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="hover:text-gray-300">
              <a href="/login" className="block text-white text-lg">Login</a>
            </li>
            <li className="hover:text-gray-300">
              <a href="/register" className="block text-white text-lg">Register</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

// Main Header Component
export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header>
      {/* Render Large Screen Header */}
      <LargeScreenHeader handleLogout={handleLogout} />

      {/* Render Small Screen Header */}
      <SmallScreenHeader handleLogout={handleLogout} />
    </header>
  );
}
