import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAdd from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export const languageConfig = [
  {
    id: 1,
    name: 'en',
    value: 'en-US',
    image: '/assets/flags/us.png'
  },
  {
    id: 2,
    name: 'es',
    value: 'es-ES',
    image: '/assets/flags/es.png'
  },
  {
    id: 3,
    name: 'de',
    value: 'de-DE',
    image: '/assets/flags/de.png'
  },
  {
    id: 4,
    name: 'cn',
    value: 'zh-CN',
    image: '/assets/flags/cn.png'
  }
];

export const menuConfig = [
  [
    {
      id: 1,
      key: 'dashboard',
      icon: <DashboardIcon />,
      link: '',
    },
    {
      id: 2,
      key: 'addone',
      icon: <PersonAdd />,
      link: '/auth/register'
    },
    {
      id: 3,
      key: 'logout',
      icon: <LogoutIcon />,
      link: ''
    },
  ],
  [
    {
      id: 1,
      key: 'login',
      icon: <LoginIcon />,
      link: '/auth/login'
    },
    {
      id: 2,
      key: 'register',
      icon: <PersonAdd />,
      link: '/auth/register'
    },
  ]
];