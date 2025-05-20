import pino from 'pino';
import { createPinoBrowserSend, createWriteStream } from 'pino-logflare';

const { LOGFLARE_API_KEY = '', LOGFLARE_SOURCE_TOKEN = '' } = process.env;

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

// Shows logs at https://logflare.app/
const getLogflareLogger = () => {
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

export { getDevLogger, getLogflareLogger };
