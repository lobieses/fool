import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger({
  collapsed: true,
  duration: true,
});

export default loggerMiddleware;
