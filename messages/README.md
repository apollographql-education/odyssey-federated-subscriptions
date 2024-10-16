# The Messages subgraph

Hello and welcome to the `messages` subgraph. We're happy you're here!

## What's `messages` all about?

In this course, we'll bring realtime data capabilities into our `messages` subgraph server.

`messages` is one of two subgraphs we'll investigate as part of building our course project, Airlock. Airlock is an intergalactic travel booking app that lets you view listings, make bookings, and (coming up shortly!) chat with hosts and ask questions.

In our time together, we will:

- Set up federated subscriptions, using the router and HTTP callbacks
- Configure the `Subscription` type, and define its resolver
- Utilize the `PubSub` class to both _publish_ and _subscribe_ to particular events
- Tackle a whole lot of optimizations for subscribing to data _across_ our graph!

So, let's get going!

## Prerequisites

To run this repository, you'll need Node and a terminal. You should already have [Rover](https://www.apollographql.com/docs/rover/) downloaded, along with the Router binary. You'll also have created a graph in [Studio](https://studio.apollographql.com), which will give you the graph credentials we need, `APOLLO_KEY` and `APOLLO_GRAPH_REF`.

## Get started

1. First, set up the project by installing dependencies with `npm install`.
1. As part of the `postinstall` script, the database will be automatically seeded.
1. Next, launch the project with `npm run dev`!

As we proceed through the course, we'll install additional dependencies and eventually walk through how to publish our schema changes to Studio.

### Using Prisma

This repository contains a database built with Prisma. It's set up to run the migration that seeds the database right after you run `npm install`. However, if you need to make updates subsequent to the initial install, follow these instructions.

Run the following command to generate a migration that updates and seeds the database.

```
npx prisma migrate dev
```

This will create our SQLite database. Optionally, you can provide a name for this migration. If it completes successfully, you should see the following output:

```
Running seed command `ts-node src/datasources/prisma/seed.ts` ...
{
  wardy: { id: 1, name: 'Wardy', role: 'guest' },
  eves: { id: 2, name: 'Eves', role: 'host' },
  jackenn: { id: 3, name: 'Jackenn', role: 'guest' },
  brise: { id: 4, name: 'Brise', role: 'guest' },
  chat: { id: "wardy-eves-chat", openedTime: 2024-10-07:... }
}

🌱 The seed command has been executed.
```

We can also use **Prisma Studio** to inspect our database on a local port.

```
npx prisma studio
```

Then open up [http://localhost:5555](http://localhost:5555). This will allow you to browse the records in your database.

This will start us with four entries in the `User` table, and one entry in the `Conversation` table. By default, no messages have yet been sent in the conversation.

#### Alternate route of setting up DB

There is also a seed command in `package.json` that you can run to set up the database.

```
npm run db:seed
```

However you will also need to run the `db:generate` command.

```
npm run db:generate
```

### Launching Sandbox

When you run `npm run dev` the server will begin running on port 4001. Open up [http://localhost:4001](http://localhost:4001) to access Sandbox. Sandbox is an environment where we can write and execute GraphQL operations.

In Sandbox, open up the _Headers_ panel at the bottom of the _Operation_ workspace. Add a new header called "Authorization", and provide a value of "Bearer eves" (or any other ID that currently exists in the database).

```
"Authorization" "Bearer eves"
```

And run the following query:

```
query GetConversation($recipientId: ID!) {
  conversation(recipientId: $recipientId) {
    id
    createdAt
    messages {
      id
      text
    }
  }
}
```

With the following _Variables_:

```
{
  "recipientId": "wardy"
}
```

And get a response containing the conversation's `id` and `createdAt` time. Though be aware that `messages` (at this point) _should_ be `null`! We'll fix that shortly.

If you run the query with a different conversation `id`, you'll see an error. This is because there is currently just one conversation in our database.

To create a new conversation, we can run a `createConversation` mutation, providing the ID of the person we want to start a chat with (`recipientId`). To run this mutation, we'll still need to include an auth header indicating our own ID: you can use the Header from the last query.

```
mutation CreateNewConversation($recipientId: ID!) {
  createConversation(recipientId: $recipientId) {
    id
    messages {
      id
    }
  }
}
```

And in the _Variables_ panel, a different recipient ID:

```
{
  "recipientId": "brise"
}
```

> Please note: This is a simulacrum of auth with federated subscriptions - anyone providing the right user ID can access the conversation and its messages. Please refer to more robust examples to bulletproof the authentication in your applications.

If a conversation already exists between the two provided IDs, an error will be thrown.

### Having trouble?

If you're struggling with any part of this course, please reach out! Leave a comment at the bottom of one of the course lessons, or click on the _Get Help_ button in any Odyssey course. We're standing by to help you troubleshoot.
