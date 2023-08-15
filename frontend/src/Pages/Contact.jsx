import React, {useRef} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import emailjs from "@emailjs/browser"

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_0mayegg', 'template_jaizpe5', form.current, '17JuDtF5fDuMizYnZ')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
  }

  return (
    <div className='contact'>
      <Navbar option3 />

      <div className="contact-page rise">
        <h1>Contact Me</h1>
        <div className="contact-container shadow">
          <form ref={form} onSubmit={sendEmail}>
            <input type="email" placeholder='Enter Email' name='user_email' />
            <input type="text" placeholder='Enter Name' name='user_name' />
            <textarea name="message" placeholder='Enter Message'></textarea>
            <input className='submit' type="submit" value="submit" />
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact