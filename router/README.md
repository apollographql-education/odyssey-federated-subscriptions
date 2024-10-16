# Hello! Welcome to the `router` directory

By default, this directory should look pretty empty: we've got just one file currently, called `router-config.yaml`. Take a moment to check it out. It's filled with some router-specific configurations: it's how we can customize the router's behavior.

We'll use this file twice in the course: the first time, when we run `rover dev`, which spins up a locally running router. Toward the end of the course, we will then download the GraphOS Router binary and simulate how you can run the router in production.

## Creating a graph (Enterprise organization required)

Follow the instructions in the course to create a new graph in [GraphOS Studio](http://studio.apollographql.com).

This process will give you two key pieces of data: your `APOLLO_KEY` and your graph's unique `APOLLO_GRAPH_REF`. We'll use these throughout the workshop, so be sure to store them someplace secure: we recommend creating a new `.env` file in this directory and storing them like this:

```
APOLLO_KEY=somethingsomethingsomething
APOLLO_GRAPH_REF=mygraphname@current
```

## Running `rover dev`

Rover is the official command line interface for working with graphs in GraphOS. We'll use one of Rover's features, `rover dev`, to compose a supergraph locally in our own development environment. The course will walk through how to use `rover dev`, but for your reference here's the initial command at a glance:

```
APOLLO_KEY="..." \
APOLLO_GRAPH_REF="..." \
rover dev \
--supergraph-config supergraph.yaml
```

This command uses the `--supergraph-config` flag to provide Rover with a file containing all the details about our subgraph servers. This allows Rover to gather the schema files, compose them together, and generate a supergraph schema. Additionally, Rover spins up a locally running router, which can receive operations and use the supergraph schema to route requests to the underlying subgraphs.

Later on, we'll customize that router process itself, using

## Running the router

Once you've secured your APOLLO_KEY and APOLLO_GRAPH_REF, you can run the router! We do so with the following command.

```
APOLLO_KEY=somethingsomethingsomething  \
APOLLO_GRAPH_REF=mygraphname@current  \
./router  \
--config ./router-config.yaml
```

Note that we've added the backslash (`\`) on each line for legibility. You can, however, run this command all on one line. This command boots up the router binary file, passing in the `router-config.yaml` file to use as its configuration settings. By specifying our `APOLLO_KEY` and our `APOLLO_GRAPH_REF`, we give the router the means to connect to our graph in Studio and pull the latest supergraph schema.

Back in Studio, update your graph's _Connection Settings_ with the router's default URL: `http://127.0.0.1:4000`. The router's ready to be queried!
