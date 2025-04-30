import GeoRedirect from '@/components/GeoRedirect';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Geo-Based Redirect</h1>
      <p>We are detecting your country to serve the correct domain...</p>
      <GeoRedirect />
    </main>
  );
}
