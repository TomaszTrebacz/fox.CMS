require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: "user",
      url: `http://localhost:${process.env.USER_PORT}/graphql`,
    },
    {
      name: "blog",
      url: `http://localhost:${process.env.BLOG_PORT}/graphql`,
    },
  ],
});

(async () => {
  const server = new ApolloServer({
    gateway,
    engine: false,
    subscriptions: false,
  });

  server.listen(process.env.APP_PORT).then(({ url }) => {
    console.log(`Api gateway listening at ${url}`);
  });
})();
