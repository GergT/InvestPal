import './home.css';

function Home({ user, setUser }) {

  return (
    
    <div className="Home">
      <main>
        <h1>Welcome to <u><span><u>I</u></span>nvesti<span><u>S</u></span>mart</u></h1>
        <h3>We combine AI analysis and human expertise to provide you with the best investment insights.</h3>

        <h3><a href="/signup">Sign up</a> to get started or read below to find out more.</h3>

        <h1>Our <span><u>3</u></span> pillars</h1>
        <div className="pillarContainer">
          <div className="pillar">
            <h2>AI-Driven Insights</h2>
            <p>Utilizing advanced algorithms to analyze market trends and provide data-driven recommendations.</p>
          </div>
          <div className="pillar">
            <h2>Human Expertise</h2>
            <p>Our team of experienced analysts offers personalized guidance and support.</p>
          </div>
          <div className="pillar">
            <h2>Interactive Analysis</h2>
            <p>Engage with our tools to help bring new light to your current investment strategies.</p>
          </div>
        </div>
      </main>

    </div>
  );
}

export default Home;
