import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpecsGrid from "@/components/SpecsGrid";

export const metadata = {
  title: "iPhone 17 Pro - Technical Specifications",
  description: "Detailed technical specifications for the new iPhone 17 Pro.",
};

export default function SpecsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter">
          Specs.
        </h1>
        <p className="mt-6 text-xl text-white/40 max-w-2xl mx-auto">
          Every detail, engineered to perfection. Explore the full technical breakdown of the most powerful iPhone yet.
        </p>
      </div>
      <SpecsGrid />
      <Footer />
    </main>
  );
}
