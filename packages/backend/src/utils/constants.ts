export const PORT = process.env.PORT || 8000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const SESSION_NAME = 'session';
export const SESSION_SECRET = process.env.SESSION_SECRET as string;
export const MAIN_NUTRIENTS = [208, 203, 204, 205];
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const FOOD_SELECT = {
  id: true,
  name: true,
  category: {
    select: { name: true },
  },
  nutrients: {
    where: {
      nutrientId: {
        in: MAIN_NUTRIENTS,
      },
    },
    select: {
      amount: true,
      nutrient: {
        select: {
          symbol: true,
          name: true,
          unit: { select: { name: true } },
        },
      },
    },
  },
};
