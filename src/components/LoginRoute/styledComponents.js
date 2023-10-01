import styled from 'styled-components'

export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-size: cover;
`
export const LoginBgContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 10px 10px 10px 10px #e2e8f0;
  padding: 20px;
  padding-bottom: -45px;
  @media screen and (max-width: 577px) {
    flex-direction: column;
    box-shadow: 5px 5px 5px 5px #e2e8f0;
    padding: 10px;
  }
`
export const ImageLogo = styled.img`
  height: 85px;
  width: 180px;
  @media screen and (max-width: 577px) {
    height: 65px;
    width: 130px;
  }
`
export const UserInput = styled.input`
  width: 450px;
  height: 40px;
  margin-bottom: 20px;
  font-size: 20px;
  @media screen and (max-width: 577px) {
    width: 250px;
    height: 30px;
    font-size: 15px;
  }
`
export const InputsContainer = styled.form`
  height: 350px;
  width: 500px;
  display: flex;
  flex-direction: column;
  padding-top: 95px;
  padding: 20px;
  @media screen and (max-width: 577px) {
    height: 280px;
    width: 300px;
  }
`
export const Label = styled.label`
  font-family: 'Roboto';
  font-size: 18px;
  margin-bottom: 9px;
  @media screen and (max-width: 577px) {
    font-size: 15px;
  }
`
export const CheckBox = styled(UserInput)`
  height: 20px;
  width: 20px;
`
export const CheckBoxContainer = styled.div`
  display: flex;
`

export const LoginButton = styled.button`
  height: 35px;
  width: 450px;
  background-color: #3b82f6;
  border: 0px;
  border-radius: 8px;
  color:#ffffff;
  font-size: 15px;
  @media screen and (max-width: 577px) {
    height: 25px;
    width: 250px;
  }
`
export const Errormessage = styled.p`
  color: red;
  font-size: 18px;
  font-family: 'roboto';
`
