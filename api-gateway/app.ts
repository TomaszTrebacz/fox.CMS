require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: "user",
      url: process.env.USER_URL,
    },
    {
      name: "blog",
      url: process.env.BLOG_URL,
    },
  ],
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        if (context.Authorization) {
          request.http.headers.set("Authorization", context.Authorization);
        }
      },
    });
  },
});

(async () => {
  const server = new ApolloServer({
    gateway,
    engine: false,
    subscriptions: false,
    context: ({ req }) => {
      return {
        Authorization: req.headers.authorization || null,
      };
    },
  });

  server.listen(process.env.APP_PORT).then(({ url }) => {
    console.log(`Api gateway listening at ${url}`);
  });
})();
