import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import Menucard from '../menucard'

import DisplayVideo from '../DisplayVideoItem'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoDetails extends Component {
  state = {
    videodetail: {},
    channelDataObj: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.homevideoDetails()
  }

  onClickRetry=()=>{
      this.homevideoDetails()
  }
  homevideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const responseData = await response.json()
      const data = responseData.video_details
      const convertedData = {
        channel: data.channel,
        description: data.description,
        id: data.id,
        publishedAt: data.published_at,
        thumbnailUrl: data.thumbnail_url,
        title: data.title,
        videoUrl: data.video_url,
        viewCount: data.view_count,
      }
      const channelData = {
        name: data.channel.name,
        profileImageUrl: data.channel.profile_image_url,
        subscriberCount: data.channel.subscriber_count,
      }
      this.setState({
        videodetail: convertedData,
        channelDataObj: channelData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessVideo = () => {
    const {videodetail, channelDataObj} = this.state

    return (
      <>
        <DisplayVideo
          videoItem={videodetail}
          channelDataObj={channelDataObj}
          key={videodetail.id}
        />
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container-details" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )
  renderfailure=()=>(
      <ThemeContext.Consumer>
     {
      value=>{
        const {isDarkTheme}=value
        const imageurl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
       return(
        <div>
          <img src={imageurl} alt="failure view"/>
          <h1>Oops! Something Went Wrong</h1>
          <p>We are having some trouble to complete your request. Please try again.</p>
          <button onClick={this.onClickRetry}> Retry</button>
        </div>
       )
      
      
      }
     }
 

     
    </ThemeContext.Consumer>
  )

  checkApiStatus = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessVideo()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
       return this.renderfailure()

      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const cardscontainer = isDarkTheme ? 'video-dark-card' : ''

          return (
            <div className={cardscontainer} data-testid="videoItemDetails">
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
export default VideoDetails
