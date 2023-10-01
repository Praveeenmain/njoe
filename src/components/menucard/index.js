import './index.css'
import {Link} from 'react-router-dom'
import {
  AiFillHome,
  AiFillFire,
  AiTwotoneHeart,
  AiOutlineCarryOut,
} from 'react-icons/ai'
import ThemeContext from '../../context/ThemeContext'

const MenuCard = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const theme = isDarkTheme ? 'darktheme' : 'light'
      const itemColor = isDarkTheme ? 'darkHome' : 'Home'
      const menuOption = isDarkTheme ? 'darkmenuOption' : 'menu-option'
      return (
        <div className="menu-container">
          <div className={`menu-card-container ${theme}`}>
            <div>
              <Link className="Link" to="/">
                {' '}
                <div className="Home-button">
                  <div>
                    <AiFillHome className={itemColor} />
                  </div>
                  <div>
                    <h1 className={menuOption}> Home</h1>
                  </div>
                </div>
              </Link>

              <Link className="Link" to="/trending">
               
                <div className="trending">
                  <div>
                    <AiFillFire className={itemColor} />
                  </div>
                  <div>
                    <h1 className={menuOption}> Trending</h1>
                  </div>
                </div>
              </Link>

              <Link className="Link" to="/gaming">
              
                <div className="gaming">
                  <div>
                    <AiTwotoneHeart className={itemColor} />
                  </div>
                  <div>
                    <h1 className={menuOption}> Gaming</h1>
                  </div>
                </div>
              </Link>

              <Link className="Link" to="/saved-videos">
              
                <div className="saved">
                  <div>
                    <AiOutlineCarryOut className={itemColor} />
                  </div>
                  <div>
                    <h1 className={menuOption}> Saved Videos</h1>
                  </div>
                </div>
              </Link>
            </div>
            <div className="icons-con-bg">
              <p> CONTACT US</p>
              <div className="icons-container">
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                  alt="twitter logo"
                />
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <p className="end-msg">
               
               Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default MenuCard
