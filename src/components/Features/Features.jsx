import icoZoomFeatures from "../../assets/featuresAssets/icoZoomFeatures.svg"
import icoCloseFeatures from "../../assets/featuresAssets/icoCloseFeatures.svg"
import icoMinimizeFeatures from "../../assets/featuresAssets/icoMinimizeFeatures.svg"
import imgSearchBarFeatures from "../../assets/featuresAssets/imgSearchBarFeatures.svg"
import icoShareFeatures from "../../assets/featuresAssets/icoShareFeatures.svg"
import icoAddFeatures from "../../assets/featuresAssets/icoAddFeatures.svg"
import icoHelloFeatures from "../../assets/featuresAssets/icoHelloFeatures.svg"
import imgAppDemoFeatures from "../../assets/featuresAssets/imgAppDemoFeatures.svg"
import imgAppDemoFeaturesPhone from "../../assets/featuresAssets/imgAppDemoFeaturesPhone.svg"
import imgAppDemoFeaturesStatusBarPhone from "../../assets/featuresAssets/imgAppDemoFeaturesStatusBarPhone.svg"
import icoZoomFeaturesPhone from "../../assets/featuresAssets/icoZoomFeaturesPhone.svg"
import icoCloseFeaturesPhone from "../../assets/featuresAssets/icoCloseFeaturesPhone.svg"
import icoMinimizeFeaturesPhone from "../../assets/featuresAssets/icoMinimizeFeaturesPhone.svg"
import imgSearchBarFeaturesPhone from "../../assets/featuresAssets/imgSearchBarFeaturesPhone.svg"
import imgSearchBarFeaturesTablet from "../../assets/featuresAssets/imgSearchBarFeaturesTablet.svg"

import './Features.css'

export default function Features() {
    return(
        <div className="features" id="features">
            <header className="features--header">
                <div className="features--commands">
                    <img src={icoCloseFeatures} alt="command-header" className="md-hidden"></img>
                    <img src={icoMinimizeFeatures} alt="command-header" className="md-hidden"></img>
                    <img src={icoZoomFeatures} alt="command-header" className="md-hidden"></img>
                </div>

                <div className="features--searchBar">
                    <img 
                        srcSet={`${imgSearchBarFeatures} 1440w, ${imgSearchBarFeaturesPhone} 480w`}
                        sizes="(max-width:480px) 480px, (min-width:481px) 1440px"
                        src={imgSearchBarFeatures} alt="command-header"
                    />
                        
                </div>

                <div className="features--extra">
                    <img src={icoShareFeatures} alt="command-header" className="md-hidden"></img>
                    <img src={icoAddFeatures} alt="command-header" className="md-hidden"></img>
                </div>
            </header>

            {/*phone*/}
            <div className="features--headerPhoneTitle">
                <p> Project dashboard </p>
                <div className="features--headerPhoneTitleImg">
                    <img src={icoCloseFeaturesPhone} alt="features-img" />
                    <img src={icoMinimizeFeaturesPhone} alt="features-img" />
                    <img src={icoZoomFeaturesPhone} alt="features-img" />
                </div>
            </div>

            <div role="main" className="features--main">
                <div className="features--mainContainer">
                    <img src={icoHelloFeatures} alt="command-header" className="features--mainImg"></img>
                    <h2 className="features--title"> Get Started in a few minutes </h2>
                    <p className="features--descr">  every tool you need in one place </p>

                    {/*Phone */}
                    <img src={imgAppDemoFeaturesStatusBarPhone} alt="features-img" className="features--imgPhone" />
                    <img 
                        srcSet={`${imgAppDemoFeatures} 1440w, ${imgAppDemoFeaturesPhone} 320w`}
                        sizes="(max-width:320px) 320px, (min-width:321px) 1440px"
                        src={imgAppDemoFeatures} 
                        alt="features-img" 
                        className="features--imgDemo"
                    /> 

               
                </div>
            </div>

        </div>
    )
}

