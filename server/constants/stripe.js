const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
    ? 'pk_live_REACT_APP_STRIPE_PUBLIC_KEY'
    : 'pk_test_REACT_APP_STRIPE_PUBLIC_KEY';

export default STRIPE_PUBLISHBLE;