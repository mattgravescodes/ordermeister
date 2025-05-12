# OrderMeister

A case study project for Reebelo.

## File Structure

This Turborepo includes the following packages/apps:

### Apps and Packages

    .
    ├── apps
    │   ├── api                       # NestJS app (https://nestjs.com).
    │   └── web                       # NextJS app (https://nextjs.org).
    └── packages
        ├── @repo/api                 # Shared `NestJS` resources.
        ├── @repo/eslint-config       # `eslint` configurations (includes `prettier`)
        ├── @repo/jest-config         # `jest` configurations
        ├── @repo/typescript-config   # `tsconfig.json`s used throughout the monorepo
        └── @repo/ui                  # Shareable stub React component library.

Each package and application are 100% [TypeScript](https://www.typescriptlang.org/) safe.

### Running Locally

Run the following command in the root directory to run the development server. Web app runs on `localhost:3001`. Api runs on `localhost:3000`.

```bash
yarn dev
```
I did not get very far on the front end, so I would not run the web app without the api. All the NextJS app is doing is fetchoing the orders & displaying them in a nice list (for now).

----

## Thought Process

I have never used NestJS before, but the case study said **Bonus Points** for using it. Couldn't pass that up! I built the repo as if this was but one of many microservices to come. Shared packages, utils, test suites, clients (I treated the "Customers" & "Inventories" requirements as if they were 3rd party services) - organized to be shared among our future offerings. I think it's important to make a microservice, micro; but, we should never lose sight of the bigger picture. Our architecture may be distributed across dozens of services/systems, but it ultimately needs to work together. And (nearly as important) we need to be *confident* that it will work together. The more we can share, the less cognitive overhead we have to deal with. The User doesn't care *how* the View rendered on their phone, just that it *did*!

Within the service itself, I tried to follow the organizational guidelines laid out by the NestJS documentation. I also kept the exposed endpoints *specific*. I'm not offering a generic `PATCH`, but a `PATCH` to update shipping. I'll allow you to see *all* of the orders or *one* order. It's likely my preference for GraphQL that influences my choices when writing a REST API. Plus, it's just nice when endpoints are semantic (to me). `updateOrderShipping` has a nicer ring to it over `update` or `updateOrder`
(again, to me).

### Deploying to AWS (How Would I Do It)

I thought of a few AWS deployment options, each with their respective pros & cons. Depending on the team goals, each seems viable. Implementing the typeORM & env based postgreSQL db creds would be a prerequisite for each.

##### My ideas:
1. **Fargate with Docker Image + RDS**
   I'm assuming we are looking for scalability with a small team, so "managed" is going to be a recurring theme here. Turbo [provides tools](https://turborepo.com/docs/guides/tools/docker) for using Docker. Containerize & send the api off to [Fargate](https://aws.amazon.com/fargate/), likely through CI/CD (Github runner - for example). PostgreSQL database in RDS (TypeORM, credz in env, etc).
2. **Elastic Beanstalk with EC2 + RDS**
   I heard "EC2" mentioned a few times during my last interview. [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) could be the way to go if we want to stay in an EC2 world. We could Dockerize there as well, if we like. PostgreSQL in RDS (I'm partial to relational in Ecommerce, if you can't tell).
3. **Serverless Framework graphql (AppSync + Lambda + RDS)**
   I haven't used [Serverless](https://www.serverless.com/) in a while, but when I have it was solid. If we don't need constant up-time, & can live with Lambda cold starts (or keep a service running that pings to keep 'em warmed up), we could go this route. Wanted to throw in a GraphQL option, as well. We include the Serverless `yml` file in the repo & let the framework do the rest. AppSync (with [generated schema](https://docs.nestjs.com/techniques/database)), Lambdas, RDS (PostgreSQL, again). The works.

### Future work (If I Had More Time)

1. **TypeORM + PostgreSQL:**
    My original intention was to setup a local DB connection (PostgreSQL) & have env variables for AWS deployment, but I ran out of time (moving Wife to Colorado for Vet School + full time gig deadlines). The Order Entity I setup coudl be refactored into a TypeORM entity pretty easily. Then it's a matter of extending the AppModule with typeORM & db credz. Caching strategies would enter the field after that, no doubt. [This Doc](https://docs.nestjs.com/techniques/database) was the guide I had planned to use. 
2. **More robust Error handling:**
    NestJS has some great Error handling out of the box, but I would have loved to add more granular Errors. As a service scales, more Error types & messages tend to crop up. I would have enjoyed digging further into Nest's [Exception Filters](https://docs.nestjs.com/exception-filters).
3. **Global Logger:**
   Nest comes with a [text-based logger](https://docs.nestjs.com/techniques/logger). I would have included some thoughtful logging (can definitely go overboard with this). Logs combined with DataDog (see next point) make for a powerful combo. 
4. **Observability (DataDog):**
   Observability across the stack would be really nice. RUM sessions tied to APM traces so I can debug & optimize (waterfall, resource timings, etc).
5. **nestjs/swagger Documentation:**
   I found [this article](https://docs.nestjs.com/openapi/introduction). The more I read the Nest docs, the more I like it. Would definitley want to include some documentation swagger if I had more time.
6. **E2E tests using Playwright & Jest:**
   My dream for this (& one of the reasons I set it up as a turborepo) was to have a single test suite (Playwright) shared across the stack. Playwright can output reports (with **Videos!**) & has expanded to include [api testing](https://playwright.dev/docs/api-testing). They support typescript, as well.
7. **Load testing (K6):**
   With the "millions of orders" requirement, I figured some Load Testing *might* be useful. In this serverless, infinitely scalable cloud world we live in, I've mostly seen Load Testing blow up in DevOps faces (boss wants to know why the AWS bill is through the roof), but I'll throw it in anyway.
8. **Authentication:**
   Would love to try out some Auth libraries with this. I figure not just *anyone* should have access to all of the orders in Westeros!
9.  **Better Organized Folders:**
   It's likely fine, but I'm always trying to better organize my directories & files. Given more time, I would have made everything nice, semantic, & repeatable (meaning - more turbo file/directory generator commands).
10. **More Front End functionality:**
   As mentioned above, I did not get very far on the front end portion. It's really just a glorified list. Given more time, I would have utilized the ui package & finished the basic CRUD abilities (likely using `react-hook-form` + `axios` against the api in a series of modals). I've been working with `react-email` lately, as well. Would have been fun to setup some emails for order confirmation & send them using `resend`!