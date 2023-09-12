require('dotenv').config();
require('express-async-errors');

//extra security
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')


const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const jobsRouter = require('./routes/jobs')
const authRouter = require('./routes/auth');
const connectDB = require('./db/connect');
const auth = require('./middleware/authentication');

app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minuten
  max: 100 // limit each IP to 100 requests per windowMs
}))
app.use(express.json());
// extra packages
app.use(helmet())
app.use(cors())
app.use(xss())
// routes
app.get('/', (req, res)=> {
  res.send('<h1>HOMEPAGE</<h1>')
})
app.use('/api/v1/jobs', auth, jobsRouter);
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
