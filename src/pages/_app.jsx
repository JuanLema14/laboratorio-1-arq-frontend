import "@/styles/global.css";
import Layout from "@/components/layouts/MainLayout";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-fondo min-h-full">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
