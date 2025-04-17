import '@/styles/global.css';
import Layout from '@/components/layouts/MainLayout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
