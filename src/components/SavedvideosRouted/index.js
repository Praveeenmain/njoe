import {Component} from 'react'
import './index.css'
import NavBar from '../NavBar'
import Menucard from '../menucard'
import ThemeContext from '../../context/ThemeContext'
import VideoCard from '../VideoCard'

class SavedVideos extends Component {
  renderNovideosSaved = () => (
    <div className="no-saved-videos">
      <img
        className="no-save-image"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h1> No saved videos found</h1>
      <p>Save your videos by clicking a button</p>
    </div>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, savedVideos} = value

          const cardscontainer = isDarkTheme ? 'dark-card' : ''
          return (
            <div className={cardscontainer} data-testid="savedVideos">
              <NavBar />
              <div className="menu-search-container">
                <Menucard />

                <div>
                  {savedVideos.length === 0 ? (
                    this.renderNovideosSaved()
                  ) : (
                    <>
                      <ul className="save-cards-container">
                        {savedVideos.map(each => (
                          <VideoCard videodetails={each} key={each.id} />
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default SavedVideos
