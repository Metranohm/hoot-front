import styles from './Logout.module.css'
import Toodles from '../../assets/branding/toodles.svg'

const Logout = () => {
  return (
    <main className={styles.container}>
      <img src={Toodles} alt="A cute owl" />
    </main>
  )
}

export default Logout