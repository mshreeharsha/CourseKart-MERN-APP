import React from 'react';
import Header from "./Header.js";
import Footer from './Footer.js';
import {Toaster} from 'react-hot-toast'
import {Helmet} from 'react-helmet'

const Layout = ({children,title}) => {
  return (
    <div style={{backgroundColor:'#ECF8F9'}}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
        <Header />
        <main style ={{minHeight:"70vH"}}>
          <Toaster/>
          {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout