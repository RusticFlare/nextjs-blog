import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import utilStyles from 'styles/utils.module.css'

export default function SocialLinks({socialMediaProfiles}: {socialMediaProfiles:{ socialMedia: string, url: string }[]}) {
  return (
    <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
      {socialMediaProfiles.map(profile => (
        <div style={{marginLeft: '5px', marginRight: '5px'}}>
          <a href={profile.url} className={utilStyles.colorInherit} target="_blank">
            <FontAwesomeIcon icon={["fab", profile.socialMedia as IconName]}/>
          </a>
        </div>
      ))}
    </div>
  )
}
