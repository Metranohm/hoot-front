import { useState } from 'react'
import styles from './Signup.module.css'
import SignupForm from '../../components/SignupForm/SignupForm'
import SignupIcon from '../../assets/branding/signup.svg'

const Signup = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <main className={styles.container}>
      <section>
        <img src={SignupIcon} alt="An owl sitting on a sign" />
      </section>
      <section>
        <SignupForm
          {...props}
          message={message}
          updateMessage={updateMessage}
        />
      </section>
    </main>
  )
}

export default Signup