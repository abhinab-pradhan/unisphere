import React from "react";
import "./style.css"; // Ensure this path matches your project structure

const Unisphere = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <div className="logo">
          <i className="fas fa-globe"></i> UniSphere
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div id="menu" className="fas fa-bars"></div>
      </header>

      {/* Home Section */}
      <section className="home" id="home" style={{
        background: `url('https://pplx-res.cloudinary.com/image/private/user_uploads/suYjVCosYKGkpTy/homg-img.jpg') no-repeat`,
        backgroundSize: "140% 85%",
        backgroundPosition: "top"
      }}>
        <div className="image">
          <img
            src="https://pplx-res.cloudinary.com/image/private/user_uploads/POghqfrBCJWqnfM/high_res_transparent_image.jpg"
            alt="Community Network"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="content">
          <h1>Share. Discuss. Discover. Repeat.</h1>
          <p>
            Welcome to <b>UniSphere</b> – your university's dynamic forum bridging academic discourse and campus life. Engage in unfiltered conversations where ideas transform into action. Debate scholarly concepts, address campus matters, exchange creative sparks, or voice personal concerns – every perspective powers our collective growth. Connect across disciplines and shape tomorrow's solutions through today's dialogues.
          </p>
          <button className="btn">Join the Conversation</button>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="image">
          <img
            src="https://pplx-res.cloudinary.com/image/private/user_uploads/GNTsKHybUpGdIBr/home-image.jpg"
            alt="About UniSphere"
          />
        </div>
        <div className="content">
          <h3>About UniSphere</h3>
          <div className="heading">Connecting Minds, Building Futures</div>
          <p>
            UniSphere is more than a forum – it's a vibrant network for students, faculty, and staff to share, discuss, and discover. From academic debates to campus life stories, every voice matters.
          </p>
          <ul>
            <li><i className="fas fa-check-circle"></i> Open to all disciplines</li>
            <li><i className="fas fa-check-circle"></i> Safe, inclusive, and respectful</li>
            <li><i className="fas fa-check-circle"></i> Real-time discussions and feedback</li>
            <li><i className="fas fa-check-circle"></i> Shape your campus experience</li>
          </ul>
        </div>
      </section>

      {/* Community Section */}
      <section className="features" id="community">
        <div className="title">Our Community</div>
        <div className="description">
          UniSphere brings together diverse voices to foster collaboration, creativity, and critical thinking. Explore trending topics, join groups, and make your mark.
        </div>
        <div className="box-container">
          <div className="box">
            <i className="fas fa-users"></i>
            <h3>Connect</h3>
            <p>Meet peers and mentors from across the campus.</p>
          </div>
          <div className="box">
            <i className="fas fa-comments"></i>
            <h3>Discuss</h3>
            <p>Engage in thoughtful discussions on academic and social issues.</p>
          </div>
          <div className="box">
            <i className="fas fa-lightbulb"></i>
            <h3>Discover</h3>
            <p>Find new ideas, events, and opportunities to grow.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="heading">Contact Us</div>
        <div className="title">We'd love to hear from you!</div>
        <form>
          <div className="inputBox">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="inputBox">
            <input type="text" placeholder="Subject" />
            <input type="text" placeholder="Department" />
          </div>
          <textarea placeholder="Your Message"></textarea>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="box-container">
          <div className="box">
            <h3>UniSphere</h3>
            <p>
              Your campus, your voice. Join the conversation and help shape the future of your university community.
            </p>
          </div>
          <div className="box">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#community">Community</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="credit">
          &copy; {new Date().getFullYear()} UniSphere. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Unisphere;
