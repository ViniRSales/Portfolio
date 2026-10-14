import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import GitHubIcon from '@mui/icons-material/GitHub'
import ImageWithFallback from '../components/ImageWithFallback'
import projects from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'

export default function Projects() {
  const { t, pick } = useLanguage()

  return (
    <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 4, md: 7 } }}>
      <Typography component="h1" variant="h4" align="center" sx={{ mb: { xs: 4, md: 6 }, color: 'primary.dark' }}>
        {t.projects.title}
      </Typography>

      {/* Linha do tempo: lista ordenada, do mais antigo ao mais recente */}
      <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {projects.map((project, index) => {
          const isLast = index === projects.length - 1
          const name = pick(project.name)

          return (
            <Box
              component="li"
              key={project.id}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '24px 1fr', md: '90px 24px 1fr' },
                columnGap: { xs: 2, md: 3 },
                pb: isLast ? 0 : 4,
              }}
            >
              {/* Ano (só em telas grandes; no celular o ano aparece dentro do cartão) */}
              <Typography
                variant="h6"
                component="span"
                sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'right', pt: 2.25, color: 'primary.main' }}
              >
                {project.year}
              </Typography>

              {/* Linha vertical + bolinha */}
              <Box sx={{ position: 'relative' }} aria-hidden="true">
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: 0,
                    bottom: isLast ? 'auto' : -32,
                    height: isLast ? 40 : 'auto',
                    width: 3,
                    bgcolor: 'divider',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: 20,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: 'background.paper',
                    border: '3px solid',
                    borderColor: 'primary.main',
                  }}
                />
              </Box>

              {/* Cartão do projeto */}
              <Paper
                variant="outlined"
                component="article"
                sx={{
                  p: 3,
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '280px 1fr' },
                  gap: 3,
                  alignItems: 'start',
                }}
              >
                <ImageWithFallback
                  src={project.image}
                  alt={`${t.projects.imageAlt}: ${name}`}
                  label="imagem / GIF"
                  sx={{ width: '100%', aspectRatio: '14 / 9', borderRadius: 0.5 }}
                />

                <Box>
                  <Typography
                    variant="subtitle2"
                    component="p"
                    color="text.secondary"
                    sx={{ display: { md: 'none' }, mb: 0.5 }}
                  >
                    {project.year}
                  </Typography>
                  <Typography component="h2" variant="h5" sx={{ color: 'primary.dark' }}>
                    {name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>
                    {pick(project.description)}
                  </Typography>

                  <Box
                    component="ul"
                    aria-label="Tecnologias"
                    sx={{ listStyle: 'none', p: 0, my: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}
                  >
                    {project.technologies.map((tech) => (
                      <li key={tech}>
                        <Chip label={tech} size="small" sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 600 }} />
                      </li>
                    ))}
                  </Box>

                  <Button
                    variant="contained"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<GitHubIcon />}
                  >
                    {t.projects.github}
                  </Button>
                </Box>
              </Paper>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
