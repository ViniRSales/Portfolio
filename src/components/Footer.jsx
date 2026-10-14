import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import { useLanguage } from '../i18n/LanguageContext'
import { profile } from '../data/profile'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const socials = [
    { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedInIcon, external: true },
    { label: 'GitHub', href: profile.github, Icon: GitHubIcon, external: true },
    { label: 'E-mail', href: `mailto:${profile.email}`, Icon: EmailIcon, external: false },
  ]

  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'common.white' }}>
      <Box
        sx={{
          maxWidth: 1180,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
          © {year} {profile.name}. {t.footer.rights}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {socials.map(({ label, href, Icon, external }) => (
            <IconButton
              key={label}
              component="a"
              href={href}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              sx={{ border: 1, borderColor: 'rgba(255,255,255,0.35)', color: 'common.white', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}
            >
              <Icon fontSize="small" />
            </IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
