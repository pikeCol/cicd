# Run instructions
To install dependancies: `npm i` \
To run: `npm run start`\
To run in watch mode: `npm run start:dev` 

# Structure Overview
- Auth - handles all authentication tasks including managing sessions and logins
- Users - handles all user interaction such as creating users or saving their playlists to the database
- Common - area for things used by many modules
- Playlist-Processing - Handles crawler requests for now. To be changed

# Local Database Setup (PostgreSQL + Prisma)

## 1. Install PostgreSQL

**Mac Users (Recommended)**
Avoid installing PostgreSQL from the official website, as it may cause conflicts with Homebrew-managed services.

Use Homebrew (instructions: (https://formulae.brew.sh/formula/postgresql@14) ) to install PostgreSQL (recommended to avoid setup issues):
`brew install postgresql@14
brew services start postgresql`

Windows & Linux Users:
- Download and install PostgreSQL from the official site (https://www.postgresql.org/download/)
- Ensure you remember the database credentials you set up.

Ubuntu:
`sudo apt install postgresql postgresql-contrib`

## 2. Verify PostgreSQL is Running
Linux:
- Check if PostgreSQL is running:
`systemctl status`
- If PostgreSQL isn't running, start it:
`sudo systemctl start postgresql.service`

Mac:
- Check if PostgreSQL is running:
`pg_ctl -D /Library/PostgreSQL/17/data status`
- If PostgreSQL isn't running, start it:
`pg_ctl -D /Library/PostgreSQL/17/data start`

## 3. Create a Local Database:
Linux:
- Sign is as Postgres user:
`sudo -i -u postgres`
- Enter postgres shell:
`psql`
- Enter this with your own password
`ALTER USER postgres PASSWORD 'mynewpassword';`


- Connect to PostgreSQL:
`psql -U postgres`
- Then create the database:
`CREATE DATABASE PGLtest;`

## 4. Install `uuid-ossp` Extension
Prisma requires the uuid-ossp extension for UUID generation.

Check if the extension is available:
`SELECT * FROM pg_available_extensions WHERE name = 'uuid-ossp';`

If it's missing, install it:
`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

**Important: **

If you get errors about missing uuid-ossp.control, you may have to go to the extensions folder and make sure that there are duplicates of all the uuid_ossp and uuid-ossp so that there is at least one of each that corresponds to eachother (e.g. if there is uuid-ossp.control but no uuid_ossp.control, then duplicate uuid-ossp.control and rename it to uuid_ossp.control **you must have both _ and - for all files**) 

Go to the PostgreSQL extensions folder and ensure you have copy versions of the extension files (with - and _ variations). Example:
`/Library/PostgreSQL/17/share/postgresql/extension/uuid-ossp.control
/Library/PostgreSQL/17/share/postgresql/extension/uuid_ossp.control`

Copy by running:
 `cp /Library/PostgreSQL/17/share/postgresql/extension/uuid-ossp.control /Library/PostgreSQL/17/share/postgresql/extension/uuid_ossp.control`

 Can be found at `/usr/share/postgresql/14/extension` on linux
for **all** "uuid-ossp" prefixed files!

## 5. Configure Prisma
Update .env File
Instead of hardcoding database credentials in prisma/schema.prisma, store them securely in a .env file.

Create a .env file in the backend directory:
`cd backend`
`touch .env`
`nano .env`
and add for e.g:
`DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/PGLtest"`
then save your changes (For mac: click Ctrl+X , Y  and hit enter)

Modify schema.prisma if it doesn't use an environment variable,
and to Ensure your schema.prisma file uses the environment variable:
`
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // IMPORTANT
  extensions = [uuid_ossp]
}
`
## 6. Apply Prisma Migrations
Run the following commands:
 `npx prisma migrate dev`
 
 (on the backend), and make sure all URLs are correct for your machine.

## 7. Adding test data
After setting up the database, you can populate it with test data using a seed file.

Examnple `prisma/seed.ts` file:
```
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'testuser',
      password: 'hashedpassword',
      email: 'test@example.com',
      provider: 'local',
      expiresAt: new Date(),
    },
  });

  console.log('User created:', user);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

```

Ensure `package.json` contains: 
`"prisma": {
  "seed": "ts-node prisma/seed.ts"
}`

Install required dependencies:
`npm i -D ts-node typescript @types/node`


Seeding the Database:
`npx prisma db seed`

The expected output:
```
Environment variables loaded from .env
Running seed command ts-node prisma/seed.ts ...
User created: {
  id: 'acda8f86-6d6d-4f56-86b3-c6d157b1eebb',
  username: 'testuser',
  password: 'hashedpassword',
  spotifyId: null,
  email: 'test@example.com',
  spotifyAccessToken: null,
  spotifyRefreshToken: null,
  expiresAt: 2025-02-20T11:15:08.492Z,
  provider: 'local'
}

🌱  The seed command has been executed.
```

## 8. Testing Database Queries
After setting up the database and seeding data, you can run test queries to verify everything works correctly.

To list all users (or our test-user) in the database, run:
`npx ts-node -e "import { PrismaClient } from '@prisma/client'; const prisma = new PrismaClient(); (async () => { console.log(await prisma.user.findMany()); prisma.$disconnect(); })();"`

Expected output:
```
  {
    "id": "acda8f86-6d6d-4f56-86b3-c6d157b1eebb",
    "username": "testuser",
    "password": "hashedpassword",
    "spotifyId": null,
    "email": "test@example.com",
    "spotifyAccessToken": null,
    "spotifyRefreshToken": null,
    "expiresAt": "2025-02-20T11:15:08.492Z",
    "provider": "local"
  }
```
If the array is empty [], make sure the seed file ran successfully.

ALTERNATIVELY,

You can also create a simple test file `backend/checkDB.ts` to check the database manually.

```
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
```

Run the query:
`npx ts-node checkDB.ts`

and the expected output is similar to the one above.

## Troubleshooting Guide (Database setup)

1. If the `uuid-ossp` Extension Not Found then run:
`psql -U postgres -d <database_name> -c "CREATE EXTENSION IF NOT EXISTS uuid-ossp;"`

If still failing, manually check and duplicate the extension files.


2. If 'migration failed to apply'

   Try deleting the prisma/migrations folder:
   `rm -rf prisma/migrations`
   
   and reapply the migrations:
   `npx prisma migrate reset`
   **WARNING**: Running `npx prisma migrate reset` deletes all data in your local database and applies migrations again from scratch.
   **Use this only when you need a clean slate!**

# Guarded Endpoints
## Setup
Create a .env file in the backend directory and add a variable :`JWT_PGL_SECRET='PUT SOME RANDOM SET OF CHARACTERS HERE. IT SHOULD NOT BE SHARED'`

## Testing example guarded endpoint
1. Run backend: `npm run start:dev`
2. Ensure you have registered a user (just do it through the frontend)
3. Check that you cannot access endpoint when not logged in: `curl http://localhost:3000/api/auth/secure_message`
4. Login curl -X POST http://localhost:3000/api/auth/login -d '{"username": "changeme", "password": "changeme"}' -H "Content-Type: application/json"
5. Copy the returned JWT
6. Access the endpoint with your given JWT: `curl http://localhost:3000/api/auth/secure_message -H "Authorization: Bearer PASTE_YOUR_JWT_HERE"`
   
# Further NPM instructions

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
