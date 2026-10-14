import { useState } from 'react'
import Box from '@mui/material/Box'

// Mostra a imagem; se o arquivo não existir (ainda), mostra um espaço reservado com um "X",
// igual ao wireframe.
export default function ImageWithFallback({ src, alt, label, sx }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <Box
        role="img"
        aria-label={alt}
        sx={{
          bgcolor: 'primary.light',
          border: 1,
          borderColor: 'divider',
          display: 'grid',
          placeItems: 'center',
          color: 'primary.main',
          fontSize: 14,
          backgroundImage:
            'linear-gradient(to top right, transparent calc(50% - 1px), #B5CBEA 50%, transparent calc(50% + 1px)), linear-gradient(to bottom right, transparent calc(50% - 1px), #B5CBEA 50%, transparent calc(50% + 1px))',
          ...sx,
        }}
      >
        <Box component="span" sx={{ bgcolor: 'primary.light', px: 1 }}>
          {label}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      sx={{ objectFit: 'cover', display: 'block', ...sx }}
    />
  )
}
