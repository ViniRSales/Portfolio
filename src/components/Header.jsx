import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useLanguage } from '../i18n/LanguageContext'
import { profile } from '../data/profile'

const links = [
  { to: '/', key: 'about' },
  { to: '/projetos', key: 'projects' },
  { to: '/experiencias', key: 'experiences' },
  { to: '/contato', key: 'contact' },
]

export default function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ bgcolor: 'primary.dark', color: 'common.white' }}
    >
      <Toolbar sx={{ maxWidth: 1180, width: '100%', mx: 'auto', px: { xs: 2, md: 4 }, minHeight: 70 }}>
        <Typography
          component={NavLink}
          to="/"
          variant="h5"
          sx={{ color: 'common.white', textDecoration: 'none', flexGrow: 1 }}
        >
          {profile.name}
        </Typography>

        {/* Menu para telas grandes */}
        <Box component="nav" aria-label="principal" sx={{ display: { xs: 'none', md: 'flex' }, gap: 5 }}>
          {links.map(({ to, key }) => (
            <Box
              key={key}
              component={NavLink}
              to={to}
              end
              sx={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                fontSize: 17,
                py: 0.5,
                borderBottom: '3px solid transparent',
                '&:hover': { color: 'common.white' },
                '&.active': { fontWeight: 700, color: 'common.white', borderBottomColor: '#8DB8F0' },
              }}
            >
              {t.nav[key]}
            </Box>
          ))}
        </Box>

        {/* Botão de menu para celular */}
        <IconButton
          edge="end"
          aria-label={t.menu}
          color="inherit"
          onClick={() => setOpen(true)}
          sx={{ display: { xs: 'inline-flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260 }} role="presentation">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton aria-label={t.close} onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List component="nav" aria-label="principal">
            {links.map(({ to, key }) => (
              <ListItemButton
                key={key}
                component={NavLink}
                to={to}
                end
                onClick={() => setOpen(false)}
                sx={{ '&.active': { bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 700 } }}
              >
                <ListItemText primary={t.nav[key]} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}
