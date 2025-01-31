import '@fortawesome/fontawesome-free/css/all.css'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

import { aliases, fa } from 'vuetify/iconsets/fa'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})

export default vuetify
