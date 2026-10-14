import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import experiences from '../data/experiences'
import { useLanguage } from '../i18n/LanguageContext'

export default function Experiences() {
  const { t, pick } = useLanguage()

  return (
    <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 4, md: 7 } }}>
      <Typography component="h1" variant="h4" align="center" sx={{ mb: { xs: 4, md: 6 }, color: 'primary.dark' }}>
        {t.experiences.title}
      </Typography>

      <Box sx={{ display: 'grid', gap: 3 }}>
        {experiences.map((item) => (
          <Paper key={item.id} variant="outlined" component="article" sx={{ p: 3, borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                columnGap: 2,
              }}
            >
              <Typography component="h2" variant="h6" sx={{ color: 'primary.dark' }}>
                {pick(item.organization)}
              </Typography>
              <Typography sx={{ color: 'primary.main', fontWeight: 600 }}>{item.period}</Typography>
            </Box>
            <Typography sx={{ mt: 0.5, fontWeight: 600 }}>{pick(item.role)}</Typography>
            <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7, maxWidth: '75ch' }}>
              {pick(item.description)}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}
