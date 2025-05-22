import pino from 'pino';
import { createPinoBrowserSend, createWriteStream } from 'pino-logflare';

const {
  NODE_ENV = 'dev',
  LOGFLARE_API_KEY = '',
  LOGFLARE_SOURCE_TOKEN = '',
} = process.env;

// Shows logs at https://logflare.app/
const getLogflareLogger = () => {
  // create pino-logflare stream
  const logflareStream = createWriteStream({
    apiKey: LOGFLARE_API_KEY,
    sourceToken: LOGFLARE_SOURCE_TOKEN,
  });

  // create pino-logflare browser stream
  const send = createPinoBrowserSend({
    apiKey: LOGFLARE_API_KEY,
    sourceToken: LOGFLARE_SOURCE_TOKEN,
  });

  return pino(
    {
      browser: {
        transmit: {
          send: send,
        },
      },
    },
    logflareStream
  );
};

// Shows logs in console
const getDevLogger = () => {
  return pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  });
};

const logger = NODE_ENV === 'prod' ? getLogflareLogger() : getDevLogger();

export { logger };
