import React from 'react';
import Header from "./Header.js";
import Footer from './Footer.js';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = (props) => {
  return (
    <div>
        <Header />
        <main style ={{minHeight:"70vH"}}>
          <ToastContainer/>
          {props.children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout