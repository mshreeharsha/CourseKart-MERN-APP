import React from 'react'
import Layout from '../components/Layout/Layout'
import '../styles/Homepage.css'

import { useAuthContext } from '../context/auth'
const HomePage = () => {
  const [auth,setAuth]=useAuthContext()
  return (
    <Layout>
        <div className="homepage">Home Page</div>
        <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default HomePage