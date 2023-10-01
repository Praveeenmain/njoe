import './index.css'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../context/ThemeContext'

const TrendingCard = props => {
  const {trendingdetails} = props
  const {
    channel,
    publishedData,
    thumbnailUrl,
    title,
    viewsCount,
    id,
  } = trendingdetails
  let postedAt = formatDistanceToNow(new Date(publishedData))
  const postedAtList = postedAt.split(' ')

  if (postedAtList.length === 3) {
    postedAtList.shift()
    postedAt = postedAtList.join(' ')
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const trendingdetail = isDarkTheme ? 'dark-element' : ''
        return (
          <Link className="video-link" to={`/videos/${id}`}>
            <li className="trending-card">
              <div>
                <img
                  className="thumb-nail"
                  src={thumbnailUrl}
                  alt="video thumbnail"
                />
              </div>
              <div className={trendingdetail}>
                <p className="title"> {title}</p>
                <p> {channel.name}</p>
                <div className="publish-count">
                  <p className="views">{viewsCount} views </p>
                  <p className="published">.{postedAt}</p>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default TrendingCard
