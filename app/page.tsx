import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero/index";
import InfoSection from "@/components/InfoSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000]">
      <Navbar />
      <HeroSection />
      
      {/* Product Content Sections */}
      <InfoSection 
        id="modes"
        subtitle="The New Design"
        title="Forged in Titanium."
        description="A beautiful, fine-brushed finish on the titanium bands. And new contoured edges make it even more comfortable to hold."
        imageSrc="/images/titanium.png"
      />

      <InfoSection 
        id="specs"
        subtitle="Performance"
        title="A19 Pro Chip. A monster win for gaming."
        description="The A19 Pro chip with a 6-core GPU delivers our best graphics performance by far. Mobile games will look and feel so immersive, with incredibly detailed environments and more realistic characters."
        imageSrc="/images/chip.png"
        reverse
      />

      <InfoSection 
        id="camera"
        subtitle="Pro Camera System"
        title="Camera that captures your wildest imagination."
        description="With the power of the A19 Pro chip, the new Pro camera system pushes the boundaries of photography even further. 48MP Main camera. 5x Telephoto."
        imageSrc="/images/camera.png"
      />

      <CTASection />
      <Footer />
    </main>
  );
}
