import React from 'react'
import LatestAutoNews from '../components/LatestAutoNews'
import HomepageNews from '../components/HomepageNews'
import Footer from '../components/Footer'
import VideoWall from '../components/VideoWall'
import MarketAnalysis from '../components/MarketAnalysis'
import SalesDataAnalysis from '../components/SalesDataAnalysis'
import Editorials from '../components/Editorials'
import LatestPosts from '../components/LatestPosts'

export default function page() {
  return (
    <div>
      <HomepageNews/>
      {/* <LatestAutoNews /> */}
      <VideoWall/>
      {/* <AutoNewsPage /> */}
      <MarketAnalysis/>
      <SalesDataAnalysis/>
      <Editorials/>
      <LatestPosts/>
      <Footer/>
      </div>
  )
}

