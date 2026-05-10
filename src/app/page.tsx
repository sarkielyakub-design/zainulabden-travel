import Navbar from "@/src/components/layout/navbar";
import Hero from "@/src/components/home/hero";
import Destinations from "@/src/components/home/destinations";
import PackagesSection from "@/src/components/home/packages";
import TicketSection from "@/src/components/home/ticket-section";
import Footer from "@/src/components/layout/footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Destinations />
      <PackagesSection />
      <TicketSection />
     <Footer />

    </main>
  );
}