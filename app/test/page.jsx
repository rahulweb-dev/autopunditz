import React from 'react'
import LatestAutoNews from '../components/LatestAutoNews'
import AutoNewsPage from '../components/AutoNewsPage'
import HomepageNews from '../components/HomepageNews'
import Footer from '../components/Footer'

export default function page() {
  return (
    <div>
      <HomepageNews/>
      <LatestAutoNews />
      {/* <AutoNewsPage /> */}
      <Footer/>
      </div>
  )
}
