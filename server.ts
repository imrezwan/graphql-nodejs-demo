import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const demoData = {
    users: [
        { id: "001", name: "John Doe", skill: "Flutter, Dart" },
        { id: "002", name: "Rezwan Al Kaoser", skill: "Typescript, Angular, Javascript, Node.Js" },
    ],
};

const typeDefs = `type User {
  id: ID!
  name: String!
  skill: String!
}

type Query {
    users: [User]
}
`
const resolvers = {
    Query: {
        users: (obj: any, args: any, context: any, info: any) => context.users,
    },
};

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    '/graphql',
    graphqlHTTP({
        schema: executableSchema,
        context: demoData,
        graphiql: true
    })
)


app.listen(port, () => {
    console.log(`Running a server at http://localhost:${port}`);
});
