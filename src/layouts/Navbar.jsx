import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Avatar, Typography, Menu, MenuItem, Tooltip } from '@mui/material';
import { setLanguage } from '../store/actions/env.action';
import { languageConfig, menuConfig } from '../utils/config';

export default function Navbar() {
  const dispatch = useDispatch();
  const { language } = useSelector(({ environment }) => environment);

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchorElement, setMenuAnchorElement] = useState(null);
  const [languageAnchorElement, setlanguageAnchorElement] = useState(null);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation('common');

  const openMenu = (event) => {
    setMenuAnchorElement(event.currentTarget);
    setMenuOpen(true);
  }

  const closeMenu = () => {
    setMenuAnchorElement(null);
    setMenuOpen(false);
  }

  const openLanguage = (event) => {
    setlanguageAnchorElement(event.currentTarget);
    setLanguageOpen(true);
  }

  const closeLanguage = () => {
    setlanguageAnchorElement(null);
    setLanguageOpen(false);
  }

  const selectLanguage = (lang) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang.name);
    closeLanguage();
  }

  return (
    <div className="flex justify-between items-center relative w-full px-8 py-6 shadow-2xl shadow-gray-200 text-gray-500">
      <div className='relative'>
        <img
          alt="logo"
          src={'/assets/logos/long_primary.png'}
          width={105}
          height={35}
          className='cursor-pointer'
          onClick={() => navigate('/')}
        />
      </div>

      <div className='flex items-center'>
        <h1 className='font-semibold mx-2'>Code Crafts</h1>

        <Tooltip title="Select language">
          <img
            src={language.image}
            width={30}
            height={20}
            className='mx-2 cursor-pointer'
            onClick={openLanguage}
          />
        </Tooltip>

        <Menu
          open={languageOpen}
          anchorEl={languageAnchorElement}
          onClose={closeLanguage}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 16px rgba(0,0,0,0.1))',
              mt: 6,
              ml: -3,
              // ml: -17,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          {
            languageConfig.map((lang) => (
              <MenuItem key={lang.id} onClick={() => selectLanguage(lang)}>
                <Typography color='primary' className='flex items-center w-full text-left normal-case p-2'>
                  <img alt={lang.image} src={lang.image} width={24} height={16} className='mx-2' />
                  <span className='mx-2'>{t(`navbar.language.${lang.name}`)}</span>
                </Typography>
              </MenuItem>
            ))
          }
        </Menu>

        {/* <Avatar className='cursor-pointer' onClick={openMenu} /> */}
      </div>

      <Menu
        open={menuOpen}
        anchorEl={menuAnchorElement}
        onClose={closeMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 16px rgba(0,0,0,0.1))',
            mt: 6,
            ml: -2,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        {
          isLoggedin ?
            menuConfig[0].map(item => (
              <a key={item.id} href={item.link}>
                <MenuItem>
                  <Typography color='primary' className='flex items-center w-full text-left normal-case p-2'>
                    {item.icon}
                    <span className='mx-2'>{t(`navbar.menu.${item.key}`)}</span>
                  </Typography>
                </MenuItem>
              </a>
            )) : menuConfig[1].map(item => (
              <a key={item.id} href={item.link}>
                <MenuItem>
                  <Typography color='primary' className='flex items-center w-full text-left normal-case p-2'>
                    {item.icon}
                    <span className='mx-2'>{t(`navbar.menu.${item.key}`)}</span>
                  </Typography>
                </MenuItem>
              </a>
            ))
        }
      </Menu>
    </div>
  )
}