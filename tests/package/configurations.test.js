/* eslint-disable more/no-then */
import jsonServer from 'json-server';
import { assert } from 'chai';
import axios from 'axios';
import curl from '../entry';

const bodyParser = require('body-parser');

const port = 12653;
const users = [ {
    'id'    : 1,
    'name'  : 'Leigh',
    'email' : 'helvy0@feedburner.com'
}, {
    'id'    : 2,
    'name'  : 'Ancell',
    'email' : 'pancell1@gravatar.com'
} ];

const server = jsonServer.create();
const router = jsonServer.router({ users });

suite('Default configuration');

before(async () => {
    server.use(bodyParser.json());
    server.use(curl);
    server.use(router);
    await new Promise(res => {
        server.listen(port, res);
    });
});

test('Get all users', async function () {
    assert.deepEqual(
        await axios({
            method : 'GET',
            url    : `http://localhost:${port}/users?limit=5`
        }).then(r => r.data),
        users
    );
});
