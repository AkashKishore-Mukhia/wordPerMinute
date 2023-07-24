import React from 'react'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'



library.add(faGithub, faInstagram, faTwitter, faFacebook )

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <div className="github">
            <a title='Github' href="https://github.com/AkashKishore-Mukhia/wordPerMinute" target='_blank'>
              <FontAwesomeIcon className='icon' icon="fa-brands fa-github" />
            </a>
          </div>
          <div className="facebook">
            <a title='facebook' href="" target='_blank'>
              <FontAwesomeIcon className='icon' icon="fa-brands fa-facebook" />
            </a>
          </div>
          <div className="instagram">
            <a title='instagram' href="" target='_blank'>
              <FontAwesomeIcon className='icon' icon="fa-brands fa-instagram" />
            </a>
          </div>
          <div className="twitter">
            <a title='twitter' href="" target='_blank'>
              <FontAwesomeIcon className='icon' icon="fa-brands fa-twitter" />
            </a>
          </div>
        </div>

        <div className="powered-by">
          <span>Power By</span>
          <div className='brand-name'>Word Per Minute</div>
          <div className="llc">
            <p>© {new Date().getFullYear()} Word Per Minute</p>
          </div>
        </div>
      </div>
    </div>
  )
}
