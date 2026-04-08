import React from 'react'
import LatestAutoNews from '../components/LatestAutoNews'
import AutoNewsPage from '../components/AutoNewsPage'
import HomepageNews from '../components/HomepageNews'

export default function page() {
  return (
    <div>
      <HomepageNews/>
      <LatestAutoNews />
      {/* <AutoNewsPage /> */}
      </div>
  )
}
