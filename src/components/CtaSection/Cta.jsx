
import ctaIllustration from "../../assets/ctaAssets/ctaIllustration.svg"
import ctaIllustrationPhone from "../../assets/ctaAssets/ctaIllustrationPhone.svg"
import "./Cta.css"

export default function Cta () {
    return(
        <div className="cta--container">
            <div className="cta__img">
                <img 
                    srcSet={`${ctaIllustration} 1440w, ${ctaIllustrationPhone} 450w`}
                    sizes='(max-width:450px) 450px, (min-width:451px) 1440px'
                    src={ctaIllustration}
                    alt="cta-img" 
                    className="cta--img" />                    
            </div>
            <div className="cta__text">
                <h2 className="cta--title">Get started with <br/> building your ideas</h2> 
                <input type="email" className="cta--input" placeholder="Enter your email..."/>
                <button className="cta--btn"> sign up </button>
            </div>
        </div>
    )
}