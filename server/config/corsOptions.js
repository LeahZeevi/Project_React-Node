const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8000',
  'http://localhost:7000',
  'http://localhost:5000',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
  'http://localhost:5178'

];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS '));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
module.exports = corsOptions;
