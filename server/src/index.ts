require('dotenv').config({ path: `./.${process.env.NODE_ENV}.env` });
const { ApolloServer } = require('apollo-server');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
const { sequelize } = require('./db/models');
const context_middleware = require('./middleware/context_middleware');


const server = new ApolloServer(
{ 
    typeDefs, 
    resolvers,
    context: context_middleware,
    //subscriptions: { path: '/' }
});


const start = async () => {

    try
    {
        let retries: number = parseInt(process.env.RETRIERS || '5');

        while (retries)
        {
            try
            {
                await sequelize.authenticate();
                console.log('Database connected!');
                break;
            }
            catch (err)
            {
                console.log(err);
                retries--;
                console.log(`Retries left: ${retries}`);
                await new Promise(res => setTimeout(res, 5000));
            }
        }

        // await sequelize
        //         .authenticate()
        //         .then(() => console.log('Database connected!'))
        //         .catch((e: any) => console.log(e));
        
        if (process.env.NODE_ENV = 'development') await sequelize.sync({ alter: true });

        server.listen().then(({ url/*, subscriptionsUrl*/ }: any)/*(server: any)*/ => 
        {
            console.log(`🚀 Server ready at ${url /*server.url*/}`);
            //console.log(`🚀 Subscriptions ready at ${server.subscriptionsUrl}`)
        });
    }
    catch (err) { console.log(err); }
}

start();