import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
      light: '#5472d3',
      dark: '#002171',
    },
    secondary: {
      main: '#d50000',
      light: '#ff5131',
      dark: '#9b0000',
    },
  },
  layout: {
    locationTabWidth: 400,
    mobileMiniMapHeight: 200,
  },
  overrides: {
    MuiFormControl: {
      root: {
        marginBottom: 36,
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 40,
      },
    },
  },
})

export default theme
