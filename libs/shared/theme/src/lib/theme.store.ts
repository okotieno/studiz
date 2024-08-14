import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Preferences } from '@capacitor/preferences';
import { computed } from '@angular/core';

type ThemesState = {
  currentTheme: 'light' | 'dark',
  currentThemeSetBy: 'system' | 'app'
};

const initialState: ThemesState = {
  currentTheme: 'light',
  currentThemeSetBy: 'system'
};

const THEME_STORAGE_KEY = 'theme-storage-key';

const getColor = (color: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(color).trim();

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ currentTheme}) => {

    return {
      primaryColor: computed(() => {
        currentTheme();
        return getColor('--ion-color-primary');
      }),
      secondaryColor: computed(() => {
        currentTheme();
        return getColor('--ion-color-secondary');
      }),
    }
  }),
  withMethods((store) => {
    const getPrimaryColor = () => getColor('--ion-color-primary');
    const getSecondaryColor = () => getColor('--ion-color-secondary');
    const setTheme = async (theme: 'light' | 'dark') => {

      document.documentElement.classList.toggle('ion-palette-dark', theme === 'dark');
      await Preferences.set({
        key: THEME_STORAGE_KEY,
        value: theme
      });
      patchState(store, { currentTheme: theme });
    };
    const toggleTheme = async () => {
      const currentTheme = store.currentTheme && store.currentTheme() === 'dark' ? 'light' : 'dark';
      await setTheme(currentTheme);
    };

    return { toggleTheme, setTheme, getPrimaryColor, getSecondaryColor };
  }),
  withHooks((store) => ({
    async onInit() {
      const { value } = await Preferences.get({ key: THEME_STORAGE_KEY });
      if (value === 'light' || value === 'dark') {
        store.setTheme(value);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDark.addEventListener('change', (mediaQuery) => {
          store.setTheme(mediaQuery.matches ? 'dark' : 'light');
        });
        store.setTheme(value === 'dark' || prefersDark.matches ? 'dark' : 'light');
      }
    }
  }))
);
