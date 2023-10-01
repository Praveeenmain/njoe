import './index.css'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../context/ThemeContext'

const VideoCard = props => {
  const {videodetails} = props
  const {
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewsCount,
    id,
  } = videodetails
  let postedAt = formatDistanceToNow(new Date(publishedAt))
  const postedAtList = postedAt.split(' ')

  if (postedAtList.length === 3) {
    postedAtList.shift()
    postedAt = postedAtList.join(' ')
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const theme = isDarkTheme
          ? 'video-card-dark-details'
          : 'video-card-details'
        const element = isDarkTheme ? 'video-details' : 'video-dark-details'
        return (
          <li className={theme}>
            <Link className="video-link" to={`/videos/${id}`}>
              {' '}
              <div>
                <img
                  className="thumbnail-url"
                  src={thumbnailUrl}
                  alt="video thumbnail"
                />
              </div>
              <div className="profile-details-container">
                <div>
                  <img
                    className="profile-url"
                    src={channel.profileImageUrl}
                    alt="channel logo"
                  />
                </div>
                <div className={element}>
                  <p className="title"> {title}</p>
                  <p className={element}> {channel.name}</p>
                  <div className="views-data">
                    <p className="views">{viewsCount}Views </p>
                    <p className="published">.{postedAt} ago</p>
                  </div>
                </div>
              </div>{' '}
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default VideoCard
