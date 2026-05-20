import { defineThemes } from '../theme/theme.models';

export const { useTheme } = defineThemes({
  dark: {
    backgroundColor: 'var(--maple-surface)',
    borderColor: 'var(--maple-border)',
  },
  light: {
    backgroundColor: 'var(--maple-surface)',
    borderColor: 'var(--maple-border)',
  },
});
