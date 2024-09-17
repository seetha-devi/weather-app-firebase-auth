import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-green-200">
        <h1 className="text-center text-3xl font-bold text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-4 rounded-lg border-4 border-green-700 shadow-lg">
          Welcome to My Weather App
        </h1>
      </div>
    </Layout>
  );
}
