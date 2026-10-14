import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import EmailIcon from '@mui/icons-material/Email'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useLanguage } from '../i18n/LanguageContext'
import { profile } from '../data/profile'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Devolve um objeto com as CHAVES dos erros (a tradução é feita na hora de mostrar).
function validate({ name, email, message }) {
  const errors = {}
  if (!name.trim()) errors.name = 'nameRequired'
  if (!email.trim()) errors.email = 'emailRequired'
  else if (!EMAIL_REGEX.test(email.trim())) errors.email = 'emailInvalid'
  if (!message.trim()) errors.message = 'messageRequired'
  else if (message.trim().length < 10) errors.message = 'messageShort'
  return errors
}

const emptyForm = { name: '', email: '', message: '' }

export default function Contact() {
  const { t } = useLanguage()
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  // status: 'idle' | 'sending' | 'success' | 'error' | 'notConfigured'
  const [status, setStatus] = useState('idle')

  const contacts = [
    { label: t.contact.email, detail: profile.email, href: `mailto:${profile.email}`, Icon: EmailIcon },
    { label: 'WhatsApp', detail: null, href: `https://wa.me/${profile.whatsapp}`, Icon: WhatsAppIcon },
    { label: 'LinkedIn', detail: null, href: profile.linkedin, Icon: LinkedInIcon },
    { label: 'GitHub', detail: null, href: profile.github, Icon: GitHubIcon },
  ]

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    // Limpa o erro do campo assim que a pessoa volta a digitar.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey) {
      setStatus('notConfigured')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        serviceId,
        templateId,
        { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() },
        { publicKey },
      )
      setStatus('success')
      setValues(emptyForm)
    } catch (error) {
      console.error('Falha ao enviar e-mail:', error)
      setStatus('error')
    }
  }

  const fieldProps = (field, label) => ({
    label,
    value: values[field],
    onChange: handleChange(field),
    error: Boolean(errors[field]),
    helperText: errors[field] ? t.contact.errors[errors[field]] : ' ',
    fullWidth: true,
    required: true,
  })

  return (
    <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 4, md: 7 } }}>
      <Typography component="h1" variant="h4" align="center" sx={{ mb: { xs: 4, md: 6 }, color: 'primary.dark' }}>
        {t.contact.title}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '400px 1fr' }, gap: 4, alignItems: 'start' }}>
        {/* Ícones clicáveis */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2, color: 'primary.dark' }}>
            {t.contact.reach}
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 2 }}>
            {contacts.map(({ label, detail, href, Icon }) => (
              <li key={label}>
                <Box
                  component="a"
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    color: 'text.primary',
                    textDecoration: 'none',
                    '&:hover .contact-icon': { bgcolor: 'primary.main', color: 'common.white' },
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  <Box
                    className="contact-icon"
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      display: 'grid',
                      placeItems: 'center',
                      transition: 'background-color .15s, color .15s',
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 18, lineHeight: 1.2 }}>{label}</Typography>
                    {detail && (
                      <Typography variant="body2" color="text.secondary">
                        {detail}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </li>
            ))}
          </Box>
        </Paper>

        {/* Formulário */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2, color: 'primary.dark' }}>
            {t.contact.send}
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField {...fieldProps('name', t.contact.name)} autoComplete="name" />
            <TextField {...fieldProps('email', t.contact.email)} type="email" autoComplete="email" sx={{ mt: 1 }} />
            <TextField {...fieldProps('message', t.contact.message)} multiline rows={5} sx={{ mt: 1 }} />

            {status === 'success' && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {t.contact.success}
              </Alert>
            )}
            {status === 'error' && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {t.contact.error}
              </Alert>
            )}
            {status === 'notConfigured' && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                {t.contact.notConfigured}
              </Alert>
            )}

            <Button type="submit" variant="contained" size="large" disabled={status === 'sending'}>
              {status === 'sending' ? t.contact.sending : t.contact.submit}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
