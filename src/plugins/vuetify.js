/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'system',
    themes: {
      light: {
        colors: {
          background: '#f2f5f8',
          surface: '#ffffff',
          // cyan-darken-1
          primary: '#0C35DF',
          // deep-orange-lighten-1
          secondary: '#ECCE3B',
          // grey-darken-2
          tertiary: '#616161',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',

          // green-lighten-1
          downy: '#66BB6A',
          // red-darken-2
          torch: '#D32F2F'
        },
        variables: {
          'border-color': '#000000',
          'border-opacity': 0.12,
          'high-emphasis-opacity': 0.87,
          'medium-emphasis-opacity': 0.60,
          'disabled-opacity': 0.38,
          'idle-opacity': 0.04,
          'hover-opacity': 0.04,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'activated-opacity': 0.12,
          'pressed-opacity': 0.12,
          'dragged-opacity': 0.08,
          'theme-kbd': '#212529',
          'theme-on-kbd': '#FFFFFF',
          'theme-code': '#F5F5F5',
          'theme-on-code': '#000000'
        }
      },
      dark: {
        colors: {
          background: '#212121',
          surface: '#424242',
          // cyan-darken-1
          primary: '#0C35DF',
          // deep-orange-lighten-1
          secondary: '#ECCE3B',
          // grey-darken-2
          tertiary: '#BDBDBD',
          error: '#ffffff',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',

          // green-lighten-1
          downy: '#66BB6A',
          // red-darken-2
          torch: '#EF5350'
        },
        variables: {
          'border-color': '#000000',
          'border-opacity': 0.12,
          'high-emphasis-opacity': 0.87,
          'medium-emphasis-opacity': 'none',
          'disabled-opacity': 0.38,
          'idle-opacity': 0.04,
          'hover-opacity': 0.04,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'activated-opacity': 0.12,
          'pressed-opacity': 0.12,
          'dragged-opacity': 0.08,
          'theme-kbd': '#212529',
          'theme-on-kbd': '#FFFFFF',
          'theme-code': '#F5F5F5',
          'theme-on-code': '#000000'
        }
      }
    }
  }
});
