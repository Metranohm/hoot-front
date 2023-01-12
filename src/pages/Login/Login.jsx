import { useState } from 'react'
import styles from './Login.module.css'
import LoginForm from '../../components/LoginForm/LoginForm'
import LoginIcon from '../../assets/branding/login.svg'

const LoginPage = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <main className={styles.container}>
      <section>
        <img src={LoginIcon} alt="An owl sitting on a sign" />
      </section>
      <section>
        <LoginForm
          message={message}
          updateMessage={updateMessage}
          handleSignupOrLogin={props.handleSignupOrLogin}
        />
      </section>
    </main>
  )
}

export default LoginPage
