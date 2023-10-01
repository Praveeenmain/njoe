import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import {AiTwotoneHeart} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import Menucard from '../menucard'
import GameCard from '../GameCard'
import ThemeContext from '../../context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Gaming extends Component {
  state = {
    gamesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.gaming()
  }
  onClickRetry=()=>{
     this.gaming()
  }
  gaming = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedData = fetchedData.videos.map(eachMovie => ({
        id: eachMovie.id,
        thumbnailUrl: eachMovie.thumbnail_url,
        title: eachMovie.title,
        viewsCount: eachMovie.view_count,
      }))
      this.setState({
        gamesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderGamingSuccess = () => {
    const {gamesData} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const fireContainer = isDarkTheme
            ? 'card-trending'
            : 'trending-heading-container'
          return (
            <div>
              <div className={fireContainer}>
                <div>
                  <AiTwotoneHeart className="Heart Heart-container" />
                </div>
                <div>
                  <h1> Games</h1>
                </div>
              </div>
              <div>
                <ul className="game-cards-container">
                  {gamesData.map(eachgame => (
                    <GameCard gamedetails={eachgame} key={eachgame.id} />
                  ))}
                </ul>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderLoader = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <div className="loader-container-gaming" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={isDarkTheme ? '#ffffff' : '#000000'}
              height="50"
              width="50"
            />
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
  renderfailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const imgurl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        const failurepagecontainer = isDarkTheme
          ? 'failure-dark-page'
          : 'failure-page-container'
        return (
          <div className={failurepagecontainer}>
            <img className="failure-image" src={imgurl} alt="failure view" />
            <h1> Oops! Something Went Wrong</h1>
            <p>We are having some trouble </p>
            <p> Please try again</p>
            <button
              className="retry-button"
              type="button"
              onClick={this.onClickRetry}
            >
             
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  checkApiStatus = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingSuccess()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
      return this.renderfailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const cardscontainer = isDarkTheme ? 'dark-card' : ''
          return (
            <div className={cardscontainer} data-testid="gaming">
              <NavBar />
              <div className="menu-search-container">
                <Menucard />

                <div> {this.checkApiStatus()}</div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Gaming
