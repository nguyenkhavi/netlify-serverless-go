'use client';
//SHARED
import HomeIcon from '_@shared/icons/HomeIcon';
import MailIcon from '_@shared/icons/MailIcon';
import UserProfileIcon from '_@shared/icons/UserProfileIcon';

export const menuData = [
  { label: 'Feed', path: '/community', icon: <HomeIcon /> },
  { label: 'Message', path: '/community/message', icon: <MailIcon /> },
  { label: 'Profile', path: '/community/profile', icon: <UserProfileIcon /> },
];

// Will create default avatar for user and store in DB in when user signup // implement in another commit
export const DEFAULT_AVATAR = 'https://getstream.imgix.net/images/random_svg/A.png';
