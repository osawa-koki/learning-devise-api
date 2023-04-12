import Env from './next.config.js';
const isProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:8000',
  title: '🥨 Leaning Devise(API) 🥨',
  smallWaitingTime: 100,
  waitingTime: 5000,
};

export default setting;
