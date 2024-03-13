import FeaturedSection from '../components/FeaturedSection';
import HeroSection from '../components/HeroSection';
import CollectionSection from '../components/CollectionSection';
import PromoSection from '../components/PromoSection';
import BannerSection from '../components/BannerSection';
import CountdownSection from '../components/CountdownSection';
import NewsletterSection from '../components/NewsletterSection';

export default function Home() {

  return (
    <div className="texture bg-base-100">
      <HeroSection />
      <PromoSection />
      <BannerSection />
      <CountdownSection />
      <CollectionSection />
      <FeaturedSection />
      <NewsletterSection />
    </div>    
  );
}