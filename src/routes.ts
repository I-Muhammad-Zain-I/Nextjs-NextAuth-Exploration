/**
 * An array of routes accessible to public users
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes used for authentication
 * these routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * Prefix for API authentication routes
 * routes that begin with this prefix are used for api authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default route to redirect to after a successful login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
