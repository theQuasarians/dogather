import ctaIllustration from "../../assets/ctaAssets/ctaIllustration.svg"
import "./Cta.css"

export default function Cta() {
  return (
    <div className="cta">
      <div className="cta__container">
        <div className="cta__contImg">
          <img
            src={ctaIllustration}
            alt="cta-illustration"
            className="cta__img"
          />
        </div>

        <h2>Get started with <br/> building your ideas</h2>

        <div className="cta__signup">
          <input type="text" placeholder="Enter your email..." />
          <button> Sign up</button>
        </div>
      </div>
    </div>
  );
}
