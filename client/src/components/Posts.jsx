import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

export default function SideBar(props) {
  console.log(props);
  return (
    <section
      id="news"
      className="content-window rich-text">
      <header>
        <div className="content-window-title txt-condensed">Latest News</div>
        <div className="section-window-title-description">
        </div>
      </header>
      <section>
        <article className="block">
          <figure>
            <img src="#" alt="" />
          </figure>
          <div>
            <time dateTime="Fri, 30 Apr 2021 20:34:29 +0000">2 days ago</time>
            <h2><a href="#">Global WASH Cluster (GWC) Annual Meeting Satellite</a></h2>
            <div><p>Check out a recent presentation made during one of the events.</p></div>
          </div>
        </article>
        <article className="block">
          <figure>
            <img src="https://www.theglobeandmail.com/resizer/7GtDjOvVq7XmAxufC7TZpAqjssw=/620x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/tgam/3Y4SNA4XKRGBNCXRG2MGV43YCM.JPG" alt="" />
          </figure>
          <div>
            <time dateTime="Fri, 30 Apr 2021 20:34:29 +0000">November 25, 2020</time>
            <h2><a href="#">Stepping Up: Sanitation specialist develops system to ensure refugee camps anywhere can have healthy drinking water</a></h2>
            <div><p>This is part of Stepping Up, a series introducing Canadians to their country’s new sources of inspiration and leadership. - <a href="https://www.theglobeandmail.com/canada/article-sanitation-specialist-develops-system-to-ensure-refugee-camps-anywhere/">Read More</a></p></div>
          </div>
        </article>
      </section>
      <footer>
        <Link to="/blog" className="txt-icon button yellow">
          <i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill="none" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10" d="M3.3 20.1h20M18.5 13.9l4.8 6.2-4.8 6.1" /><path fill="none" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" d="M12.5 11.6V6.9l19.4 1v25.2l-19.4-1v-4.5" /></svg></i>
          <span>More News</span>
        </Link>
      </footer>
    </section>
  );
}
