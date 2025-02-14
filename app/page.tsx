import { PropertyHeroWrapper } from "@/components/property-hero-wrapper"
import { IntroductionSection } from "@/components/introduction-section"
import { PopularLocations } from "@/components/popular-locations"
import { HighlightedInfo } from "@/components/highlighted-info"
import { NewAddedPropertiesSection } from "@/components/new-added-properties-section"
import { PopularPropertiesSection } from "@/components/popular-properties-section"
import { MostVisitedPropertiesSection } from "@/components/most-visited-properties-section"
import { NewsArticles } from "@/components/news-articles"
import { SpecialOfferSection } from "@/components/special-offer-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <PropertyHeroWrapper />
      <main>
        <IntroductionSection />
        <PopularLocations />
        <HighlightedInfo />
        <NewAddedPropertiesSection />
        <PopularPropertiesSection />
        <MostVisitedPropertiesSection />
        <SpecialOfferSection />
        <NewsArticles />
      </main>
    </div>
  )
}

