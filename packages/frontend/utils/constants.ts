export const NAV_PATHS = [
  { name: 'search food', path: '/search' },
  { name: 'diet history', path: '/diet-history' },
  { name: 'profile', path: '/profile' },
];
export const DEBOUNCE_TIMEOUT = 750;
export const DEFAULT_QUANTITY = 100;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const INITIAL_NUTRIENTS = [
  {
    amount: 0,
    nutrient: {
      symbol: 'PROT',
      name: 'PROTEIN',
      unit: {
        name: 'g',
      },
    },
  },
  {
    amount: 0,
    nutrient: {
      symbol: 'FAT',
      name: 'FAT (TOTAL LIPIDS)',
      unit: {
        name: 'g',
      },
    },
  },
  {
    amount: 0,
    nutrient: {
      symbol: 'CARB',
      name: 'CARBOHYDRATE, TOTAL (BY DIFFERENCE)',
      unit: {
        name: 'g',
      },
    },
  },
  {
    amount: 0,
    nutrient: {
      symbol: 'KCAL',
      name: 'ENERGY (KILOCALORIES)',
      unit: {
        name: '',
      },
    },
  },
];
