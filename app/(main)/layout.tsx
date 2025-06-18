import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container mx-auto lg:max-w-screen-lg pt-6 md:pt-10 pb-10 md:pb-48 px-3 md:px-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
