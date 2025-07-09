import pino from 'pino';
import type { LokiOptions } from 'pino-loki';

const {
  NODE_ENV = 'dev',
} = process.env;

const getLokiLogger = () => {
  const transport = pino.transport<LokiOptions>({
    target: "pino-loki",
    options: {
      batching: true,
      interval: 5,

      host: 'http://localhost:3100',
      basicAuth: {
        username: "username",
        password: "password",
      },
    },
  });

  return pino(transport);
}

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

const logger = NODE_ENV === 'prod' ? getLokiLogger() : getDevLogger();

export { logger };
