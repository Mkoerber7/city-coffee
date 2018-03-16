const PAYMENT_SERVER_URL = process.envNODE.ENV === 'production'
    ? 'http://localhost:3210'
    : 'http://localhost:8080';

export default PAYMENT_SERVER_URL;