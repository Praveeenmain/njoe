import './index.css'
import ReactPlayer from 'react-player'
import {AiTwotoneLike, AiFillDislike} from 'react-icons/ai'
import {BiSave} from 'react-icons/bi'
import {formatDistanceToNow} from 'date-fns'
import {Component} from 'react'
import ThemeContext from '../../context/ThemeContext'

class DisplayVideo extends Component {
  state = {
    liked: false,
    disliked: false,
    saved: false,
  }

  onSaved = () =>
    this.setState(prevState => ({
      saved: !prevState.saved,
    }))

  isDisliked = () => {
    const {liked, disliked} = this.state
    if (liked) {
      this.setState({liked: false})
    }
    if (disliked) {
      this.setState({disliked: false})
    } else {
      this.setState({disliked: true})
    }
  }

  isLiked = () => {
    const {liked, disliked} = this.state
    if (disliked) {
      this.setState({disliked: false})
    }
    if (liked) {
      this.setState({liked: false})
    } else {
      this.setState({liked: true})
    }
  }

  render() {
    const {saved} = this.state
    console.log(saved)
    const {videoItem, channelDataObj} = this.props

    const {name, profileImageUrl, subscriberCount} = channelDataObj
    const {title, viewCount, publishedAt, description, videoUrl} = videoItem
    let postedAt = formatDistanceToNow(new Date(publishedAt))
    const postedAtList = postedAt.split(' ')

    if (postedAtList.length === 3) {
      postedAtList.shift()
      postedAt = postedAtList.join(' ')
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {addSavedVideos} = value
          const onSave = () => {
            this.onSaved()
            addSavedVideos(videoItem)
          }
          const {liked, disliked} = this.state
          const iconColor = liked ? 'iconcolor' : ''
          const dislikeColor = disliked ? 'disiconColor' : ''

          return (
            <div className="video-player-container">
              <div>
                <ReactPlayer
                  className="video-player"
                  url={videoUrl}
                  controls
                  width={1200}
                  height={500}
                />
                <p> {title}</p>
              </div>
              <div className="views-likes-containers">
                <div className="views-publish">
                  <p> {viewCount}views</p>
                  <p> .{postedAt}</p>
                </div>
                <div className="Like-dislike-save-buttons">
                  <div className="icon-item">
                   <AiTwotoneLike className={iconColor} />
                    <button type="button" onClick={this.isLiked} className={iconColor}>
                      Like
                    </button>
                 
                  </div>
                  <div className="icon-item">
                   <AiFillDislike className={dislikeColor} />
                    <button type="button" onClick={this.isDisliked} className={dislikeColor}>
                     
                      Dislike
                    </button>
                    
                  </div>
                  <div className="icon-item">
                   <BiSave />
                    <button type="button" onClick={onSave}>
                     Save
                    </button>
                   
                  </div>
                </div>
              </div>
              <hr />
              <div className="icon-logo-container">
                <div>
                  <img
                    className="profile-logo"
                    src={profileImageUrl}
                    alt="channel logo"
                  />
                </div>
                <div>
                  <p className="name">{name}</p>
                  <p>{subscriberCount} subscribers</p>
                </div>
              </div>
              <p> {description}</p>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default DisplayVideo
