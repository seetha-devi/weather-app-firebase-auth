import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase/firebase';
import WeatherComponent from '../components/weatherComponent';
import Layout from '@/components/Layout';

export default function Weather() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <Layout>
      <div className="flex flex-col items-center py-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Get Weather details here...</h2>
        <WeatherComponent />
      </div>
    </Layout>
  );
}
