import {AiOutlineSearch} from 'react-icons/ai'
import {MdClear} from 'react-icons/md'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import VideoCard from '../VideoCard'
import NavBar from '../NavBar'
import Menucard from '../menucard'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    dataarray: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  onChangesearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    this.getVideos(searchInput)
  }

  onKey = event => {
    if (event.key.toLowerCase() === 'enter') {
      this.onClickSearch()
    }
  }

  onRetry = () => {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.videos.map(eachMovie => ({
        channel: {
          name: eachMovie.channel.name,
          profileImageUrl: eachMovie.channel.profile_image_url,
        },
        id: eachMovie.id,
        publishedAt: eachMovie.published_at,
        thumbnailUrl: eachMovie.thumbnail_url,
        title: eachMovie.title,
        viewsCount: eachMovie.view_count,
      }))

      this.setState({
        dataarray: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {dataarray} = this.state
    const showVideosList = dataarray.length > 0
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const novideos = isDarkTheme ? 'no-results-element' : ''
          return showVideosList ? (
            <ul className="videos-container">
              {dataarray.map(eachItem => (
                <VideoCard videodetails={eachItem} key={eachItem.id} />
              ))}
            </ul>
          ) : (
            <div className="no-videos-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                className="no-video-img"
                alt="no videos"
              />
              <h1 className={novideos}>No Search results Found</h1>
              <p className={novideos}>
                Try different Key words or remove search filter
              </p>
              <button
                type="button"
                onClick={this.onRetry}
                className="retry-button"
                
              >
               
                Retry
              </button>
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
          <div className="loader-container-home" data-testid="loader">
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

  renderBannerSection = () => (
    <div className="banner-section" data-testid="banner">
      <div>
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />

        <p> Buy Nxt Watch Premium</p>
        <button type="button" className="banner-button">
         GET IT NOW
        </button>
      </div>
      <button data-testid="close">
        <MdClear />
      </button>
    </div>
  )

  renderSearchContainer = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {searchInput} = this.state
        const theme = isDarkTheme ? 'search-dark-button' : ''
        const input = isDarkTheme ? 'search-dark-input' : 'search-input'
        const inputbutton = isDarkTheme
          ? 'input-dark-button'
          : 'input-light-button'
        return (
          <div className={theme}>
            <input
              placeholder="search"
              value={searchInput}
              className={input}
              type="search"
              onKeyDown={this.onKey}
              onChange={this.onChangesearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className={inputbutton}
              onClick={this.onClickSearch}
            >
              <AiOutlineSearch />
            </button>
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
            <p>we are having some trouble to complete your request.</p>
            <p> Please try again</p>
            <button
              className="retry-button"
              type="button"
              onClick={this.onRetry}
            >
              {' '}
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
        return this.renderSuccessView()
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
          const theme = isDarkTheme ? 'dark' : 'light'
          return (
            <div className={theme} data-testid="home">
              <NavBar />
              <div className="menu-search-container">
                <Menucard />

                <div className={theme} data-testid="banner">
                  {this.renderBannerSection()}

                  <div>{this.renderSearchContainer()}</div>
                  <div> {this.checkApiStatus()}</div>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
