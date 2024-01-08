const swaggerConfig = {
    openapi: {
        info: {
          title: 'Lawyer Joke Service',
          description: 'This is an API serving up lawyer jokes.',
          version: '0.1.0'
        },
        servers: [{
          url: 'https://joke.fekke.com'
        }]
    },
    hideUntagged: true,
    exposeRoute: true
};

export default swaggerConfig;
