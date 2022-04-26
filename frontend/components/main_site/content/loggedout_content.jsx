import React from 'react';
import { NavLink } from 'react-router-dom';

const LoggedoutContent =  ({demoLogin}) => {
  return(
    <div className='main-content'>
      <section className='billboard-section'>
        <div className='billboard-content'>
          <header>
            <h1 className='headline jumbo'>Relay is your digital HQ</h1>
            <p className='header-copy'>Transform the way you work with one place for everyone and everything you need to get stuff done.</p>
            <div className='billboard-btn-container'>
              <NavLink className='btn primary-btn full-width-btn' to='/signin'>Sign in</NavLink>
              <span onClick={demoLogin} className='btn secondary-btn full-width-btn'>Demo Login</span>
            </div>
          </header>
          <img className="campaign-hero-img" src={window.images.campaignHero}/>
        </div>
        <section className='companies-container'>
          <a href="#">
            <img src={window.images.fox} />
          </a>
          <a href="#">
            <img src={window.images.lonelyPlanet} />
          </a>
          <a href="#">
            <img src={window.images.intuit} />
          </a>
          <a href="#">
            <img src={window.images.carvana} />
          </a>
          <a href="#">
            <img src={window.images.kiva} />
          </a>
          <a href="#">
            <img src={window.images.target} />
          </a>
          <a href="#">
            <img src={window.images.devaCurl} />
          </a>
        </section>
      </section>

      <section className='featured-section peach-bg'>
        <div className='featured-content-nongif'>
          <img src={window.images.videoThumbnail} alt="video-thumbnail" />
          <div className='featured-text-container'>
            <h2 className='headline large'>Now is your moment to build a better tomorrow</h2>
            <p className='header-copy'>We’ve seen what the future can be. Now it’s time to decide what it will be.</p>
          </div>
        </div>

      </section>

      <section className='featured-section'>
        <div className='featured-content-inverse'>
          <img className='featured-gif show-image' src={window.images.threadspools} alt="thread-spool-gif" />
          <div className='featured-text-container'>
            <h2 className='headline large'>Move faster by organizing your work life</h2>
            <p className='header-copy'>The key to productivity in Slack is organized spaces called 
              channels—a different one for everything you’re working on. 
              With all the people, messages and files related to a topic in one place, 
              you can move a whole lot faster.
            </p>
          </div>
        </div>
      </section>

      <section className='featured-section'>
        <div className='featured-content'>
          <img className='featured-gif show-image' src={window.images.folders} alt="folders-gif" />
          <div className='featured-text-container'>
            <h2 className='headline large'>Focus your time, on your own terms</h2>
            <p className='header-copy'>Give yourself the flexibility to work when, where and how you work best. 
              Take control of notifications, collaborate live or on your own time, 
              and find answers in conversations from across your company.
            </p>
          </div>
        </div>
      </section>

      <section className='featured-section'>
        <div className='featured-content-inverse'>
          <img className='featured-gif show-image' src={window.images.fistbump} alt="fist-bump-gif" />
          <div className='featured-text-container'>
            <h2 className='headline large'>Simplify teamwork for everyone</h2>
            <p className='header-copy'>Give everyone you work with—inside and outside your company—a more 
              productive way to stay in sync. Respond faster with emoji, keep 
              conversations focused in channels, and simplify all your communication 
              into one place.
            </p>
          </div>
        </div>
      </section>

      <section className='featured-section peach-bg'>
        <div className='getting-started-container'>
          <h2 className='headline larger'>Get started with Slack</h2>
          <div className='getting-started-grid'>
            <div className='get-started-grid-item'>
              <span className='get-started-num'>1</span>
              <h3>Sign up</h3>
              <p>Create a new Slack workspace in just a few moments. 
                It’s free to try for teams of any size.
              </p>
            </div>
            <div className='get-started-grid-item'>
              <span className='get-started-num'>2</span>
              <h3>Invite your coworkers</h3>
              <p>Slack is better together (no, really, it’s a bit underwhelming 
                by yourself), and it’s easy to invite your team.
              </p>
            </div>
            <div className='get-started-grid-item'>
              <span className='get-started-num'>3</span>
              <h3>Try it out</h3>
              <p>Run a project, coordinate with your team, or just talk it out. 
                Slack is a blank canvas for teamwork.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoggedoutContent;