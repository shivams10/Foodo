import { useRef } from "react";
import emailjs from "emailjs-com";

import "./index.css";
import Logo from "../../assets/images/contact.jpeg";
import PageHeading from "../../components/pageHeading";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          alert("SUCCESS!");
          console.log(result);
        },
        (error) => {
          alert("FAILED...", error);
        }
      );
  };
  return (
    <>
      <PageHeading>Contact</PageHeading>
      <div className="form">
        <div className="form-image">
          <img src={Logo} alt="form image" />
        </div>
        <form ref={form} onSubmit={sendEmail} className="form-container">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              required
              placeholder="Enter Your Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              name="email"
              className="form-control"
              id="email"
              required
              placeholder="Enter Your Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              className="form-control"
              id="subject"
              required
              placeholder="Enter Email Subject"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_body">Message</label>
            <textarea
              type="text"
              name="message"
              className="form-control"
              id="message"
              required
              rows="5"
            ></textarea>
          </div>

          <button type="submit" className="contact-button" value="Send">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
