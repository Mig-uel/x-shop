/**
 * Constants for API URLs and base URL.
 *
 * @module Constants
 */

/**
 * The base URL for making API requests.
 * If the environment is set to development, the base URL is 'http://localhost:5000'.
 * If the environment is not set to development, the base URL is an empty string.
 *
 * @constant {string}
 */
export const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : ''

/**
 * The URL for the products API.
 *
 * @constant {string}
 */
export const PRODUCTS_URL = '/api/products'

/**
 * The URL for the users API.
 *
 * @constant {string}
 */
export const USERS_URL = '/api/users'

/**
 * The URL for the orders API.
 *
 * @constant {string}
 */
export const ORDERS_URL = '/api/orders'

/**
 * The URL for the PayPal configuration API.
 *
 * @constant {string}
 */
export const PAYPAL_URL = '/api/config/paypal'
