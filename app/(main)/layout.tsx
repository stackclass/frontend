import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container mx-auto lg:max-w-screen-lg pt-6 pb-10 px-3">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
