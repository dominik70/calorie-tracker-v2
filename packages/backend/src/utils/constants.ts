export const PORT = process.env.PORT || 8000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const SESSION_NAME = 'session';
export const SESSION_SECRET = process.env.SESSION_SECRET as string;
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
