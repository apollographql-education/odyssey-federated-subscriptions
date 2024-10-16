# The Accounts subgraph

Hello and welcome to the `accounts` subgraph. We're happy you're here!

## What's `accounts` all about?

In this course, we'll bring realtime data capabilities to our GraphQL API. And the only thing you'll need to do with the `accounts` subgraph is... run it!

## Prerequisites

To run this repository, you'll need Node and a terminal. You should already have [Rover](https://www.apollographql.com/docs/rover/) downloaded, along with the Router binary. You'll also have created a graph in [Studio](https://studio.apollographql.com), which is where you get your graph credentials (`APOLLO_KEY` and `APOLLO_GRAPH_REF`).

## Get started

1. First, set up the project by installing dependencies with `npm install`.
1. As part of the `postinstall` script, the database will be automatically seeded.
1. Next, launch the project with `npm run dev`!

### Using Prisma

This repository contains a database built with Prisma. It's set up to run the migration that seeds the database right after you run `npm install`. However, if you need to make updates subsequent to the initial install, follow these instructions.

Run the following command to generate a migration that updates and seeds the database.

```
npx prisma migrate dev
```

This will create our SQLite database. Optionally, you can provide a name for this migration. If it completes successfully, you should see the following output:

We can also use **Prisma Studio** to inspect our database on a local port.

```
npx prisma studio
```

Then open up [http://localhost:5555](http://localhost:5555). This will allow you to browse the records in your database.

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

When you run `npm start` the server will begin running on port 4002. Open up [http://localhost:4002](http://localhost:4002) to access Sandbox. Sandbox is an environment where we can write and execute GraphQL operations.

If your database is setup correctly, you can set up the following "Authorization" header and run the query below. (To send headers, look for the panel at the bottom of the _Operation_ input: you should see _Variables_, _Headers_, etc.)

```
Authorization: Bearer eves
```

```
query GetMe {
  me {
    id
    isLoggedIn
    name
    lastActiveTime
    profileDescription
  }
}
```

This should return the details associated with the user you authenticated as ("eves").

You can also toggle the user's logged-in or -out status, which we'll be doing later to test out some of our `messages` capabilities.

```
mutation ToggleUserLoggedIn {
  changeLoggedInStatus {
    time
    success
    message
  }
}
```

That's it!

### Having trouble?

If you're struggling with any part of this course, please reach out! Leave a comment at the bottom of one of the course lessons, or click on the _Get Help_ button in any Odyssey course. We're standing by to help you troubleshoot.
