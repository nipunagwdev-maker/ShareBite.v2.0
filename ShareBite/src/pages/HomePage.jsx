import HowItWorks from "../components/HowItWorks.jsx";
import HomeHero from "../components/HomeHero.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";

function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[17px] leading-relaxed text-ink">
      <SiteHeader />
      <main>
        <HomeHero />
        <HowItWorks />
      </main>
      <SiteFooter />
    </div>
  );
}

export default HomePage;
