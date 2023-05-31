import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
        <p>          
                At Course-Cart, we prioritize the protection of your personal information. This brief Privacy Policy highlights how we collect, use, and safeguard your data when you use our website.
        </p>  
        <p>
                Information Collection: We may collect personally identifiable information like your name, email address, and phone number when you create an account or make a purchase.
        </p>
        <p>
                Information Usage: We use the collected information to process transactions, provide customer support, personalize your experience, and send relevant updates if you give us consent.
        </p>
        <p>
                Information Sharing: We share your information with trusted third-party service providers who assist us in delivering our services, but we don't sell or rent your personal information for marketing purposes.
        </p>
        <p>
                Data Security: We employ appropriate security measures to protect your information from unauthorized access, but no method is 100% secure.
        </p>
        <p>
                Cookies and Tracking Technologies: We may use cookies to enhance your browsing experience and gather demographic information.
        </p>
        <p>
                Third-Party Links: We are not responsible for the privacy practices or content of third-party websites.
        </p>


       </div>
      </div>
    </Layout>
  );
};

export default Policy;
