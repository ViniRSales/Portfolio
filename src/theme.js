import { createTheme } from '@mui/material/styles'

// Paleta em tons de azul. Para mudar a identidade visual, edite só este arquivo.
//   primary.main  = azul principal (links, botões, destaques)
//   primary.dark  = azul-marinho (cabeçalho, rodapé, títulos)
//   primary.light = azul bem claro (chips, ícones, fundos suaves)
const theme = createTheme({
  palette: {
    primary: { main: '#1F5FBF', dark: '#0A1F44', light: '#DCE9F9', contrastText: '#FFFFFF' },
    text: { primary: '#12263F', secondary: '#4A5F7A' },
    background: { default: '#F0F6FD', paper: '#FFFFFF' },
    divider: '#C9D8EC',
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Source Sans 3", system-ui, sans-serif',
    h1: { fontFamily: '"Space Grotesk Variable", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Space Grotesk Variable", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Space Grotesk Variable", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Space Grotesk Variable", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Space Grotesk Variable", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Space Grotesk Variable", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { defaultProps: { elevation: 0 } },
  },
})

export default theme
