import './home.css';

function Home() {

  return (
    
    <div className="Home">
      <main>
        <section className="hero-image">
          
          <div className="overlay">
            <h1>Welcome to <u><span><u>I</u></span>nvesti<span><u>S</u></span>mart</u></h1>
            <h3>We combine AI analysis and human expertise to provide you with the best investment insights.</h3>
            <h3><a id="big-signup-link" href="/signup">Sign up</a> to get started or read below to find out more.</h3>
          </div>
        </section>

        <div className="info-section">
        <h1>Our <span><u>3</u></span> pillars</h1>
        <div className="pillarContainer">
          <div className="pillar">
            <h2>AI-Driven Insights</h2>
            <p>Utilizing advanced algorithms to analyze market trends and provide data-driven recommendations.</p>
          </div>
          <div className="pillar">
            <h2>Human Expertise</h2>
            <p>Our team of experienced analysts offer interesting articles and investment decisions weekly.</p>
          </div>
          <div className="pillar">
            <h2>Interactive Analysis</h2>
            <p>Engage with our tools to help bring new light to your current investments.</p>
          </div>
        </div>
      </div>
      <div id="how-we-roll" className="info-section">
      <h1 id="roller">How we <span>roll...</span></h1>
      <p>Hargreaves Lansdown user? We feel your pain.</p>
      <p>Use our AI investment analysis tools to gain deeper insights into your portfolio and pick up some tips as to where to invest next.</p>
      </div>
      <h1> THIS IS NOT FINANCIAL ADVISE. Please conduct your own research before making any investment decisions.</h1>
      </main>

    </div>
  );
}

export default Home;
