import { FILTER_PATTERNS } from '../config/constants.js';

/**
 * Logger utility module for filtering noisy console logs
 */

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

/**
 * Checks if a message should be filtered
 * @param {string} message - Message to check
 * @returns {boolean} True if message should be filtered
 */
function shouldFilter(message) {
  if (typeof message !== 'string') return false;

  return FILTER_PATTERNS.some((pattern) => pattern.test(message));
}

/**
 * Override console methods to filter noisy logs
 */
export function setupConsoleFilters() {
  console.log = (...args) => {
    const msg = args[0];
    if (shouldFilter(msg)) return;
    originalLog.apply(console, args);
  };

  console.warn = (...args) => {
    const msg = args[0];
    if (shouldFilter(msg)) return;
    originalWarn.apply(console, args);
  };

  console.error = (...args) => {
    const msg = args[0];
    if (shouldFilter(msg)) return;
    originalError.apply(console, args);
  };
}

/**
 * Restores original console methods
 */
export function restoreConsole() {
  console.log = originalLog;
  console.warn = originalWarn;
  console.error = originalError;
}
