module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || 'mongodb://127.0.0.1/playoo',
    SECRET: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
};
