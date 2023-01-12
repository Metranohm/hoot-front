import { useState, useEffect } from 'react'
import styles from './Profiles.module.css'
import * as profileService from '../../services/profileService'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfiles(profileData)
    }
    fetchProfiles()
  }, [])

  if (!profiles.length) return <p>No Profiles</p>

  return (
    <main className={styles.container}>
      <ul>
        {profiles.map(profile => (
          <li>{profile.name}</li>
        ))}
      </ul>
    </main>
  )
}

export default Profiles