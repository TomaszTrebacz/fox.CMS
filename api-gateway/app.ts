require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
import CryptoJS from "crypto-js";

const secretKey = process.env.AES_KEY;

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
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        if (context.Authorization) {
          const encryptedJWT = context.Authorization.replace("Bearer ", "");
          const decryptedJWT = CryptoJS.AES.decrypt(
            encryptedJWT,
            "dwjiaodawawdjniwdiu23sa"
          );

          const originalText = decryptedJWT.toString(CryptoJS.enc.Utf8);

          const decryptedHeader = `Bearer ${decryptedJWT}`;

          const decryptedData = decryptedJWT.toString(CryptoJS.enc.Utf8);

          console.log(originalText); // 'my message'

          const chuj = `Bearer ${originalText}`;

          //  console.log("chuj");
          //   console.log(context.Authorization);
          // console.log("end");
          request.http.headers.set("Authorization", chuj);
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
