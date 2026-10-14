import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ImageWithFallback from '../components/ImageWithFallback'
import { useLanguage } from '../i18n/LanguageContext'
import { profile } from '../data/profile'

function InfoCard({ title, children, sx }) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderTop: '4px solid', borderTopColor: 'primary.main', ...sx }}>
      <Typography component="h2" variant="h6" sx={{ mb: 1.5, color: 'primary.dark' }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {children}
      </Typography>
    </Paper>
  )
}

export default function About() {
  const { lang, setLang, t, pick } = useLanguage()

  return (
    <>
      {/* Faixa de apresentação: foto, texto e botões de idioma */}
      <Box
        sx={{
          color: 'common.white',
          background: 'linear-gradient(135deg, #0A1F44 0%, #14418A 55%, #1F5FBF 100%)',
        }}
      >
        <Box
          sx={{
            maxWidth: 1180,
            mx: 'auto',
            px: { xs: 2, md: 4 },
            py: { xs: 4, md: 7 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '260px 1fr auto' },
            gap: { xs: 3, md: 5 },
            alignItems: 'start',
          }}
        >
          <ImageWithFallback
            src={profile.photo}
            alt={t.about.photoAlt}
            label="foto"
            sx={{
              width: { xs: 180, md: 260 },
              height: { xs: 180, md: 260 },
              borderRadius: 2,
              border: '4px solid rgba(255,255,255,0.35)',
            }}
          />

          <Box>
            <Typography component="h1" variant="h3" sx={{ fontSize: { xs: 30, md: 40 } }}>
              {t.about.greeting} {profile.name}
            </Typography>
            <Typography variant="h6" component="p" sx={{ mt: 1, fontWeight: 400, color: '#B9D4F5' }}>
              {pick(profile.subtitle)}
            </Typography>
            <Typography sx={{ mt: 3, maxWidth: '65ch', lineHeight: 1.75, fontSize: 18, color: 'rgba(255,255,255,0.92)' }}>
              {pick(profile.intro)}
            </Typography>
          </Box>

          <ToggleButtonGroup
            exclusive
            value={lang}
            onChange={(_, value) => value && setLang(value)}
            aria-label={t.about.language}
            sx={{ order: { xs: -1, md: 0 }, justifySelf: { xs: 'start', md: 'end' } }}
          >
            {['pt', 'en'].map((code) => (
              <ToggleButton
                key={code}
                value={code}
                sx={{
                  px: 3,
                  fontWeight: 700,
                  color: 'common.white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
                  '&.Mui-selected, &.Mui-selected:hover': { bgcolor: 'common.white', color: 'primary.dark' },
                }}
              >
                {code.toUpperCase()}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Cartões: formação, área de atuação, interesses e objetivos */}
      <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          <InfoCard title={t.about.education}>{pick(profile.education)}</InfoCard>
          <InfoCard title={t.about.field}>{pick(profile.field)}</InfoCard>
          <InfoCard title={t.about.interests}>{pick(profile.interests)}</InfoCard>
        </Box>
        <InfoCard title={t.about.goals} sx={{ mt: 3 }}>
          {pick(profile.goals)}
        </InfoCard>
      </Box>
    </>
  )
}
