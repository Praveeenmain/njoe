import ThemeContext from '../../context/ThemeContext'
import NavBar from '../NavBar'
import Menucard from '../menucard'
import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const imgurl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      const bgColor = isDarkTheme ? 'not-dark' : 'not'
      const cardscontainer = isDarkTheme ? 'dark-card' : ''
      return (
        <div className={cardscontainer}>
          <NavBar />
          <div className="menu-search-container">
            <Menucard />
            <div className={bgColor}>
              <img className="img" src={imgurl} alt="not found" />
              <h1> Page Not Found</h1>
              <p>we are sorry, the page you requested could not be found.</p>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default NotFound
