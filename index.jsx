import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const collectData = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, subject, message })
      });

      const result = await response.json();
      console.log(result);

      // Redirect to home after successful submission
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/home");

      // Optional: Smooth scroll to home section
      document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="contact-form">
      <form onSubmit={collectData}>
        <input
          type="email"
          placeholder="Enter Your Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Your Subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Enter Your Message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <input type="submit" value="Submit" className="send" />
      </form>
    </div>
  );
};

export default Signup;
