import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, JetBrains_Mono, Space_Grotesk, Syne } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const syne = Syne({
  weight: ['700', '800'],
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DIM$PRAT // Official Portal & Underground Hub',
  description:
    'The Sound & Code of the Underground. Official website for DIM$PRAT featuring live events, visual plugins, and cyber-streetwear merchandise.',
  keywords: ['DIM$PRAT', 'Underground Events', 'Visual Plugins', 'Resolume Arena', 'Cyber Streetwear'],
  openGraph: {
    title: 'DIM$PRAT // Official Website',
    description: 'The Sound & Code of the Underground. Live Events, Visual Plugins, and Cyber-Streetwear.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIM$PRAT // Official Portal',
    description: 'The Sound & Code of the Underground.',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${bebasNeue.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${syne.variable}`}
    >
      <body className="bg-black text-white antialiased selection:bg-[#E50914] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
