import 'whatwg-fetch';
import { getEnvironments } from './src/helpers/getEnvironments';
import { TextEncoder, TextDecoder } from 'util';

require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}));

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;