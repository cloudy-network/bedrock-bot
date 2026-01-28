import { ping } from 'bedrock-protocol';

/**
 * Server utility module
 * Provides server information and ping functionality
 */

/**
 * Pings the server and displays server information
 * @param {Object} config - Configuration object with host and port
 * @returns {Promise<Object|null>} Server info object or null if failed
 */
export async function pingServer(config) {
  const { host, port } = config;

  try {
    const serverInfo = await ping({ host, port });

    console.log(`> Host: ${host}:${port}`);
    console.log(`> MOTD: ${serverInfo.motd || 'N/A'} ${'(' + serverInfo.levelName + ')' || 'N/A'}`);
    console.log(`> Version: ${serverInfo.version || 'N/A'}`);
    console.log(`> Players: ${serverInfo.playersOnline || 0}/${serverInfo.playersMax || 0}\n`);

    return serverInfo;
  } catch (err) {
    console.log(`[warn] Failed to connect: ${host}:${port}`);
    return null;
  }
}
