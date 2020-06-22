import {SocialMediaIconsReact} from 'social-media-icons-react';

export default function SocialLinks({socialMediaProfiles}: {socialMediaProfiles:{ socialMedia: string, url: string }[]}) {
  return (
    <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
      {socialMediaProfiles.map(profile => (
        <div style={{marginLeft: '5px', marginRight: '5px'}}>
          <SocialMediaIconsReact
            borderColor="rgba(0,0,0,0)"
            icon={profile.socialMedia}
            iconColor="rgba(0,0,0,1)"
            backgroundColor="rgba(0,0,0,0)"
            iconSize="10"
            url={profile.url}
            size="20"
          />
        </div>
      ))}
    </div>
  )
}
