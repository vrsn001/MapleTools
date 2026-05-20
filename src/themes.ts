import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#e85d04FF',
    primaryColorHover: '#f97316FF',
    primaryColorPressed: '#c2410cFF',
    primaryColorSuppl: '#f97316FF',
    borderRadius: '10px',
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
  },

  Menu: {
    itemHeight: '36px',
    borderRadius: '8px',
  },

  Layout: { color: '#f4f6f9', siderColor: '#ffffff', siderBorderColor: '#e2e8f0' },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#f97316FF',
    primaryColorHover: '#fb923cFF',
    primaryColorPressed: '#ea580cFF',
    primaryColorSuppl: '#fb923cFF',
    borderRadius: '10px',
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
  },

  Notification: {
    color: '#333333',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#1e1e1e' },
    },
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: '#0f1117',
    siderColor: '#181b24',
    siderBorderColor: '#2d3348',
  },

  Card: {
    color: '#1c1f28',
    borderColor: '#2d3348',
  },

  Table: {
    tdColor: '#232323',
    thColor: '#353535',
  },
};
