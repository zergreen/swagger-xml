const winston = require('winston')
const { combine, timestamp, printf } = winston.format;

function handleError(err) {
    if (err) {
        console.error('hello', err);
        return;
    }

    // Continue with the rest of your code or handle the error in a different way.
}

// Set up Winston logger with timestamp
const logger = winston.createLogger({
    level: 'info',
    format: combine(
      timestamp(),
      printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
    transports: [
      new winston.transports.File({ filename: 'logfile.log' }), // Log to a local text file
    ],
  });

// Example usage:
// Replace `yourError` with the actual error variable, and 'John' with the actual name variable.
// handleError(yourError);

module.exports = {handleError, logger}
