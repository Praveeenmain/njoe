import './index.css'
import { FaMoon, FaSun } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FiLogOut } from 'react-icons/fi'
import Cookies from 'js-cookie'
import { withRouter,Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import ThemeContext from '../../context/ThemeContext'

import 'reactjs-popup/dist/index.css'

const NavBar = (props) => {
  const onClickLogout = () => {
  
  Cookies.remove('jwt_token');


  const { history } = props;
  history.replace('/login');
};
  return (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme, toggleTheme } = value

        const onToggleTheme = () => {
          toggleTheme()
        }
        const container = isDarkTheme ? 'bg-dark' : ''
        const logoutbutton = isDarkTheme ? 'logout-button-dark' : 'logout-button'
        const confirmbutton = isDarkTheme ? 'confirm-dark' : 'confirm-light'
        const pop = isDarkTheme
          ? { backgroundColor: 'transparent' }
          : { backgroundColor: '#ffff' }
        return (
          <div className={container}>
            <div className="NavBar-lg-screen">
              <div className="nxt-watch-logo">
               <Link to="/">
                <img
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />
                </Link>
              </div>
              <div className="nxt-watch-logo-items">
                {isDarkTheme ? (
                  <button
                    type="button"
                    className="button"
                    onClick={onToggleTheme}
                    data-testid="theme"
                  >
                    <FaSun className="sun" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button"
                    onClick={onToggleTheme}
                    data-testid="theme"
                  >
                    <FaMoon className="moon" />
                  </button>
                )}

                <img
                  className="profile-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />

                <div>
                  <Popup
                    overlayStyle={pop}
                    modal
                    trigger={
                      <button type="button" className={logoutbutton}>
                        Logout
                      </button>
                    }
                  >
                    {(close) => (
                      <div>
                        <div>
                          <p>Are you sure, you want to logout</p>
                        </div>
                        <button
                          type="button"
                          className="trigger-button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={onClickLogout}
                          className={confirmbutton}
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            </div>

            <div className="NavBar-small-screen">
              <div className="nxt-watch-logo">
                  <Link to="/">
                <img
                  className="website-logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />
                </Link>
              </div>
              <div className="nxt-watch-logo-sm-items">
                {isDarkTheme && (
                  <button
                    type="button"
                    className="button"
                    onClick={onToggleTheme}
                      data-testid="theme"
                  >
                    <FaSun className="sun" />
                  </button>
                )}

                <GiHamburgerMenu className="menu-dark" />
                <button
                  type="button"
                  className="button"
                  onClick={onClickLogout}
                >
                  <FiLogOut className="logout-dark" />
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(NavBar)
