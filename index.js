import Fastify from 'fastify';
import fs from 'fs';

const port = process.env.PORT || 3000;
const data = await fs.promises.readFile('jokes.json', 'utf8');
const jokesObj = JSON.parse(data);

const schemaConfig = {
    schema: {
        description: 'This returns lawyer jokes',
        tags: ['LAWYER_JOKE'],
        summary: 'This returns a different lawyer joke every time this is called',
        response: {
            200: {
                description: 'Successful Response',
                type: 'object',
                properties: {
                    joke: { type: 'string' }
                }
            }
        }
    }
};

const app = Fastify({
    logger: true
});

app.get('/', schemaConfig, (req, reply) => {
    const randomInteger = Math.floor(Math.random() * 20);
    const joke = jokesObj.jokes[randomInteger];
    reply.code(200).send({ joke: joke });
});

async function main() {
    try {
        await app.listen({
            port: port,
            host: '0.0.0.0'
        });
    } catch (error) {
        console.error(error);
    }
}
main();
