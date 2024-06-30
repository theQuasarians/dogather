
import ctaSvg from '../../assets/ctaIllustration.svg'
import './CTA.css'

function CTA() {
  return (
    <div id='center-container'>
      <div id='cta-container'>
        <img id='cta-image' src={ctaSvg} alt="CTA Illustration" />
        <h3>Get started with building your ideas</h3>
        <input id='input-email' type='email' placeholder='Enter your email...' />
        <button id='sign-up-button'>sign up</button>
      </div>
    </div>
  )
}

export default CTA
