import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="container d-flex justify-content-between">
        <div className="col-md-4" style={{marginTop:'50px'}}>
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{width:'500px',height:'300px'}}
          />
        </div>
        <div className="col-md-6" style={{marginTop:'50px'}}>
        <p>          
                At Course-Cart, we prioritize the protection of your personal information. This brief Privacy Policy highlights how we collect, use, and safeguard your data when you use our website.
        </p>  
        <p>
                <strong>Information Collection:</strong> We may collect personally identifiable information like your name, email address, and phone number when you create an account or make a purchase.
        </p>
        <p>
                <strong>Information Usage:</strong> We use the collected information to process transactions, provide customer support, personalize your experience, and send relevant updates if you give us consent.
        </p>
        <p>
                <strong>Information Sharing:</strong> We share your information with trusted third-party service providers who assist us in delivering our services, but we don't sell or rent your personal information for marketing purposes.
        </p>
        <p>
                Data Security: We employ appropriate security measures to protect your information from unauthorized access, but no method is 100% secure.
        </p>
       </div>
      </div>
    </Layout>
  );
};

export default Policy;
