import {Link} from 'react-router-dom'
import './index.css'
import ThemeContext from '../../context/ThemeContext'

const GameCard = props => {
  const {gamedetails} = props
  const {thumbnailUrl, title, viewsCount, id} = gamedetails
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const elements = isDarkTheme ? 'para' : ''
        return (
         
            <li className="game-card">
             <Link className="video-link" to={`/videos/${id}`}>
              <img className="thumbnail" src={thumbnailUrl} alt="video thumbnail" />
              <p className={elements}>{title} </p>
              <p className={elements}>{viewsCount} Watching Worldwide</p>
               </Link>
            </li>
         
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default GameCard
