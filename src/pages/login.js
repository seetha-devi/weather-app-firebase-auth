import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/weather');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-10 flex justify-center items-center bg-gradient-to-br from-green-100 via-blue-100 to-green-200 py-10">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mx-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold rounded-lg hover:bg-green-500 transition duration-300"
            >
              Login
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">Invalid Credential</p>}
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-green-700 hover:text-green-900 font-semibold">
              Register here
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
