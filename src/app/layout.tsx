import type { Metadata } from "next";
import { lora } from "./ui/fonts";
import "./ui/globals.css";
export const metadata: Metadata = {
  title: {
    template: '%s | PaniieHeal ',
    default: 'Paniieheal Truth Store',
   // absolute: ''
  },
  authors: [{ name: '17moonup' }, { name: '17moonup', url: 'https://paniieheal.org/about' }],
  metadataBase: new URL('https://paniieheal.org'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'zh-Hant': '/zh-Hant',
    },
  },
  openGraph: {
    title: 'Paniieheal Truth Store',
    description: 'Sales nothing.',
    url: 'https://paniieheal.org',
    siteName: 'Paniieheal Truth Store',
    images: [{
      url: '/icon.png',
      width: 800,
      height: 600,
    }],
    type: 'website',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  twitter: {
    title: 'Paniieheal Truth Store',
    description: 'Sales nothing.',
    creator: '@17moonup',
    images: {
      url: 'https://paniieheal.org/icon.png',
      alt: 'Paniie Logo',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.className}`}>
        {children}
      </body>
    </html>
  );
}
