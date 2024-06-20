import Hero from "../../components/Hero/Hero"
import FaqSection from "../../components/FaqSection/FaqSection"
import Features from "../../components/Features/Features"
import CtaSection from "../../components/CtaSection/Cta"
import Footer from "../../components/Footer/Footer"
const Landing = () => {
  return (
    <div>
      <Hero />
      <Features />
      <CtaSection />
      <FaqSection />
      <Footer />
    </div>
  )
}

export default Landing
