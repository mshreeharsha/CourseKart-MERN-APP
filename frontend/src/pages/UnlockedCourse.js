import React from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'

const UnlockedCourse = () => {
    const params=useParams()
    const courseName=params.slug
  return (
    <Layout>
        <div>{courseName}</div>
    </Layout>
  )
}

export default UnlockedCourse
