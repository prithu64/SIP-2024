import {Inter} from 'next/font/google';
import './globals.css';
import {Providers} from '../../redux/provider';
import Head from 'next/head';

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: 'Internship 2024',
  description:
    'Welcome to our portal dedicated to exploring the impact of screen time on language development in Indian children aged 2-5 years.',
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
