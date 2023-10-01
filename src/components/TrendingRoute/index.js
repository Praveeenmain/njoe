import './index.css';
import { Component } from 'react';
import Cookies from 'js-cookie';
import Loader from 'react-loader-spinner';
import { AiFillFire } from 'react-icons/ai';
import NavBar from '../NavBar';
import ThemeContext from '../../context/ThemeContext';
import Menucard from '../menucard';
import TrendingCard from '../TrendingCard';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class Trending extends Component {
  state = {
    trendingData: [],
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.trendingVideos();
  }

  onClickRetry = () => {
    this.trendingVideos();
  };

  trendingVideos = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = 'https://apis.ccbp.in/videos/trending';
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(apiUrl, options);

      if (response.ok) {
        const fetchedData = await response.json();

        const updatedData = fetchedData.videos.map((eachVideo) => ({
          channel: {
            name: eachVideo.channel.name,
            profileImageUrl: eachVideo.channel.profile_image_url,
          },
          id: eachVideo.id,
          publishedData: eachVideo.published_at,
          thumbnailUrl: eachVideo.thumbnail_url,
          title: eachVideo.title,
          viewsCount: eachVideo.view_count,
        }));

        this.setState({
          trendingData: updatedData,
          apiStatus: apiStatusConstants.success,
        });
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        });
      }
    } catch (error) {
      console.error(error);
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  renderTrendingSuccess = () => {
    const { trendingData } = this.state;

    return (
      <ThemeContext.Consumer>
        {(value) => {
          const { isDarkTheme } = value;
          const fireContainer = isDarkTheme
            ? 'card-trending'
            : 'trending-heading-container';
          const iconContainer = isDarkTheme
            ? 'dark-fire-container'
            : 'fire-container';
          const cardsContainer = isDarkTheme ? 'dark-card' : '';
          return (
            <div className={cardsContainer}>
              <div className={fireContainer}>
                <div>
                  <AiFillFire className={`fire ${iconContainer}`} />
                </div>
                <div>
                  <h1> Trending </h1>
                </div>
              </div>
              <ul className="trending-cards-container">
                {trendingData.map((eachVideo) => (
                  <TrendingCard trendingdetails={eachVideo} key={eachVideo.id} />
                ))}
              </ul>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  };

  renderLoader = () => (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme } = value;
        return (
          <div className="loader-container-trending" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={isDarkTheme ? '#ffffff' : '#000000'}
              height={50}
              width={50}
            />
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );

  renderFailure = () => (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme } = value;
       const imageurl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div>
            <img src={imageurl} alt="failure view" />
            <h1>Oops! Something Went Wrong</h1>
            <p>We are having some trouble</p>
            <button onClick={this.onClickRetry}> Retry</button>
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );

  checkApiStatus = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingSuccess();
      case apiStatusConstants.inProgress:
        return this.renderLoader();
      case apiStatusConstants.failure:
        return this.renderFailure();
      default:
        return null;
    }
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => {
          const { isDarkTheme } = value;
          const cardsContainer = isDarkTheme ? 'dark-card' : '';
          return (
            <div className={cardsContainer}>
              <NavBar />
              <div className="menu-search-container">
                <Menucard />
                <div> {this.checkApiStatus()}</div>
              </div>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default Trending;
