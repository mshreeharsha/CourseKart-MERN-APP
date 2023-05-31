import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title="About Us">
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          <p>Welcome to our course cart website, the ultimate destination for knowledge seekers and lifelong learners! We are passionate about empowering individuals like you to unlock their full potential through the power of education.
          </p>
          <p>
          At our website, we have curated a vast collection of high-quality courses spanning a wide range of subjects and disciplines. Whether you are looking to acquire new skills, enhance your existing knowledge, or explore a completely new field, we have got you covered.
          </p>
          <p>
          Our team consists of dedicated experts and professionals who are deeply committed to providing you with an enriching learning experience. We meticulously select each course, ensuring that they meet our rigorous standards of quality, relevance, and effectiveness. We collaborate with renowned instructors and industry experts who possess a wealth of practical experience and a passion for teaching.
          </p>
          <p>
          So, embark on your educational journey with us and discover a world of knowledge at your fingertips. Start exploring our course cart today and let us be your trusted companion in your pursuit of lifelong learning.       
          </p>
        </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
