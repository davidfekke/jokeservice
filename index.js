import Fastify from 'fastify';
import fs from 'fs';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';

const port = process.env.PORT || 3000;
const data = await fs.promises.readFile('jokes.json', 'utf8');
const jokesObj = JSON.parse(data);

const schemaConfig = {
    schema: {
        description: 'This returns Lawyer jokes',
        tags: ['LAWYER_JOKE'],
        summary: 'This returns a different lawyer joke every time this is called',
        operationId: 'get-lawyer-joke',
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

const fastify = Fastify({
    logger: true
});

await fastify.register(Swagger);
await fastify.register(SwaggerUI);

fastify.get('/', schemaConfig, async (req, reply) => {
    const randomInteger = Math.floor(Math.random() * 20);
    const joke = jokesObj.jokes[randomInteger];
    reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ joke: joke });
});

const start = async () => {
    try {
        await fastify.listen({
            port: port,
            host: '0.0.0.0'
        });
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
start();
