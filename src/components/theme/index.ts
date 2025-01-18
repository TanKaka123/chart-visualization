import { extendTheme } from '@chakra-ui/react'
import { config } from './config'
import { breakpoints } from './breakpoints'
import { textStyles } from './textStyles'
import { colors } from './colors'
import { styles } from './styles'

import { shadows } from './shadows'
import { fonts } from './fonts'

const overrides = {
  config,
  styles,
  fonts,
  breakpoints,
  colors,
  textStyles,
  shadows,
}

export const theme = extendTheme(overrides)
