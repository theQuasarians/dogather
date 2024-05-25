
import image from '/public/CTA Illustration.png'
import './App.css'

function CTA() {

  return (
    <>
      <div id='cointainer'>
        <img id='cta-image' src={image} alt="CTA Illustration" />
        <div id='text-container'>
          <h1>Get started with<br/>building your ideas</h1>

        </div>
        
        <div id='email-form'>
          <input id='input-email' type='email' placeholder='Enter your email...' />
          <button id='sign-up-button'>sign up</button>
        </div>
      </div>
    </>
  )
}

export default CTA
