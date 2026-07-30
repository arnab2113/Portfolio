import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark',
  activeSection: 'hero',
  isMobileMenuOpen: false,
  isLoaderFinished: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
    setLoaderFinished: (state, action) => {
      state.isLoaderFinished = action.payload;
    },
  },
});

export const {
  setTheme,
  setActiveSection,
  toggleMobileMenu,
  setMobileMenuOpen,
  setLoaderFinished,
} = themeSlice.actions;

export default themeSlice.reducer;
