import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { AnnouncementBar } from '@/components/shared/AnnouncementBar';
import { CookieBanner } from '@/components/shared/CookieBanner';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
