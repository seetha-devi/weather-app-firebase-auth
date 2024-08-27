import { useState } from 'react';
import { auth, database } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential)
      const user = userCredential.user;

      await set(ref(database, 'users/' + user.uid), {
        name: name,
        email: email,
        password: password
      });

      router.push('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <div className=" py-10 flex justify-center items-center bg-gradient-to-br from-green-100 via-blue-100 to-green-200">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mx-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Register</h2>
          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
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
              Register
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">Email is already used</p>}
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-green-700 hover:text-green-900 font-semibold">
              Please login
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
