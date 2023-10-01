import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  LoginPageContainer,
  LoginButton,
  CheckBoxContainer,
  CheckBox,
  InputsContainer,
  ImageLogo,
  LoginBgContainer,
  UserInput,
  Label,
  Errormessage,
} from './styledComponents'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    isPasswordChecked: false,
    errormsg: '',
    showSubmitError: false,
  }

  onSuccessLogin = jwttoken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwttoken, {expires: 30})
    history.replace('/')
  }

  onSubmitfailure = errormsg => {
    console.log(errormsg)
    this.setState({
      errormsg,
      showSubmitError: true,
    })
  }

  submitform = async event => {
    console.log('Hello')
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onSubmitfailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChecked = event => {
    this.setState({
      isPasswordChecked: event.target.checked,
    })
  }

  render() {
    const {
      username,
      password,
      isPasswordChecked,
      showSubmitError,
      errormsg,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return isDarkTheme ? (
            <LoginPageContainer className="login-container">
              <LoginBgContainer className="login-bg-container form">
               <ImageLogo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="website logo" 
                 />
                <InputsContainer className="form" onSubmit={this.submitform}>
                  <Label className="label" htmlFor="username">
                    USERNAME
                  </Label>
                  <UserInput
                    value={username}
                    id="username"
                    placeholder="Username"
                    type="text"
                    onChange={this.onChangeUsername}
                  />
                  <Label className="label" htmlFor="password">
                    {' '}
                    PASSWORD
                  </Label>

                  {isPasswordChecked && (
                    <UserInput
                      value={password}
                      id="password"
                      placeholder="Password"
                      type="text"
                      onChange={this.onChangePassword}
                    />
                  )}
                  {!isPasswordChecked && (
                    <UserInput
                      value={password}
                      id="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.onChangePassword}
                    />
                  )}

                 <CheckBoxContainer>
  <CheckBox
    id="checkBox"
    type="checkbox"
    onClick={this.onChecked}
  />
  <Label className="label" htmlFor="checkBox">
    Show Password 
  </Label>
</CheckBoxContainer>
                  <LoginButton type="submit"> Login</LoginButton>
                  {showSubmitError && <Errormessage> *{errormsg}</Errormessage>}
                </InputsContainer>
              </LoginBgContainer>
            </LoginPageContainer>
          ) : (
            <LoginPageContainer>
              <LoginBgContainer>
                <ImageLogo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="website logo" 
                />
                <InputsContainer onSubmit={this.submitform}>
                  <Label htmlFor="username"> USERNAME</Label>
                  <UserInput
                    value={username}
                    id="username"
                    placeholder="Username"
                    type="text"
                    onChange={this.onChangeUsername}
                  />
                  <Label htmlFor="password"> PASSWORD</Label>

                  {isPasswordChecked && (
                    <UserInput
                      value={password}
                      id="password"
                      placeholder="Password"
                      type="text"
                      onChange={this.onChangePassword}
                    />
                  )}
                  {!isPasswordChecked && (
                    <UserInput
                      value={password}
                      id="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.onChangePassword}
                    />
                  )}

                  <CheckBoxContainer>
                    <CheckBox
                      id="checkBox"
                      type="checkbox"
                      onClick={this.onChecked}
                    />
                    <Label htmlFor="checkBox"> Show Password</Label>
                  </CheckBoxContainer>
                  <LoginButton type="submit"> Login</LoginButton>
                  {showSubmitError && <Errormessage> *{errormsg}</Errormessage>}
                </InputsContainer>
              </LoginBgContainer>
            </LoginPageContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default LoginRoute
