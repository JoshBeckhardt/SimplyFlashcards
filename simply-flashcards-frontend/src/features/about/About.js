import React from 'react';

import '../../css/About.css';
import * as constants from  '../../constants';

const About = () => {
  return (
    <div
      className="about"
      style={{ width: `${constants.CONTENT_WIDTH_PERCENT}%` }}
    >
      <div className="main-div">
        <div className="about-title">
          About
        </div>
        <div className="about-section">
          Simply Flashcards was created as a programming project.
          Use it to memorize multiplication tables,
          the periodic table,
          dates of historical events,
          or anything else you could train with flashcards.
        </div>
        <div className="about-section">
          Contact the developer:
          <ul>
            <li>
              <a
                className="about-link"
                href="mailto:joshua.beckhardt@gmail.com"
              >
                joshua.beckhardt@gmail.com
              </a>
            </li>
            <li>
              <a
                className="about-link"
                href="https://github.com/JoshBeckhardt"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="about-link"
                href="https://www.linkedin.com/in/josh-beckhardt-b06455255/"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div className="about-section">
          <a
            className="about-link"
            href="https://github.com/JoshBeckhardt/SimplyFlashcards"
          >
            Source Code
          </a>
        </div>
      </div>
    </div>
  )
};

export default About;
