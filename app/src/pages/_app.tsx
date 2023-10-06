import "@/styles/global.css";
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/src/context/authentication/Provider';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  </>
}
