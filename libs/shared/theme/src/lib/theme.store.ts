import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { Preferences } from '@capacitor/preferences';

type ThemesState = {
  currentTheme: 'light' | 'dark',
  currentThemeSetBy: 'system' | 'app'
};

const initialState: ThemesState = {
  currentTheme: 'light',
  currentThemeSetBy: 'system',
};

const THEME_STORAGE_KEY = 'theme-storage-key';

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
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
      await setTheme(currentTheme)
    };

    return { toggleTheme, setTheme };
  }),
  withHooks((store) => ({
    async onInit() {
      const { value } = await Preferences.get({ key: THEME_STORAGE_KEY });

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      prefersDark.addEventListener('change', (mediaQuery) => {
        store.setTheme(mediaQuery.matches ? 'dark' : 'light');
      })
      store.setTheme(value === 'dark' || prefersDark.matches ? 'dark' : 'light');
    }
  }))
);
