import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env['MONGO_USERNAME'] || '';
const MONGO_PASSWORD = process.env['MONGO_PASSWORD'] || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.5vd7f.mongodb.net/indian-pincodes`;

const SERVER_PORT = process.env['SERVER_PORT'] ? Number(process.env['SERVER_PORT']) : 3100;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}