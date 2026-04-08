import Editorials from "./components/Editorials";
import Footer from "./components/Footer";
import Hero from "./components/hero";
import IndustryInsights from "./components/IndustryInsights";
import LatestNews from "./components/LatestNews";
import LatestPosts from "./components/LatestPosts";
import MarketAnalysis from "./components/MarketAnalysis";
import SalesDataAnalysis from "./components/SalesDataAnalysis";
import VideoWall from "./components/VideoWall";

export default function Home() {
  return (
    <>
      <Hero />
      <LatestNews />
      <IndustryInsights />
      <VideoWall />
      <MarketAnalysis />
      <SalesDataAnalysis />
      <Editorials />
      <LatestPosts />
<Footer/>

    </>
  );
}
