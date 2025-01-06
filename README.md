This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Getting Started

# Please refer to https://gametrees.vercel.app/ for production build.

## Prerequisite:

1. Have node and npm available to run code.
2. MySQL is running with the database setup already.

   - (_OPTIONAL_) _To allow uploading images from MySQL commands (not our project), please follow the correct directions available for your device on the MySQL documentation. This is due to how MySQL has handles privacy and security._

3. Use npm run dev via the terminal in the cloned directory of this project. (Ensure that you are on localhost port 3000, if not there will be conflicts with what is in the `.env` file)
4. Go to the `localhost:3000`

## Install Dependencies (options that are known to work with Node.js)

### Install npm (comes with Node.js)

node -v # Check Node.js is installed

### Install yarn

npm install -g yarn

### Install pnpm

npm install -g pnpm

### Install bun

curl -fsSL https://bun.sh/install | bash

First, run the development server:

```bash
npm i
# or
yarn
# or
pnpm install
# or
bun install

npm run build
# or
yarn build
# or
pnpm build
# or
bun build

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## `.env.local` Setup

Copy the template below into a new `.env.local` file in the root directory of the project and replace the placeholder values with your own local database credentials.

```
# MySQL Local
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database_name

# Next-Auth (API Keys)
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET= CHECK YOUR EMAIL TA/PROFESSOR

# OAuth Providers
GOOGLE_ID= CHECK YOUR EMAIL TA/PROFESSOR
GOOGLE_SECRET= CHECK YOUR EMAIL TA/PROFESSOR

DISCORD_ID= CHECK YOUR EMAIL TA/PROFESSOR
DISCORD_SECRET= CHECK YOUR EMAIL TA/PROFESSOR

GITHUB_ID= CHECK YOUR EMAIL TA/PROFESSOR
GITHUB_SECRET= CHECK YOUR EMAIL TA/PROFESSOR
```

# Create schema and populate local data

Images cannot be shown due to MySQL settings in my.ini and my.cnf

```bash
cd documents\database
MySQL -u root -p
```

```MySQL
source createdb.sql;

-- Optional queries to populate photos
source loadAccPicturesTestMAC.sql;
# or
source loadAccPicturesTest.sql;

source loadGamePicturesTestMAC.sql;
# or
source loadGamePicturesTestWINDOWS.sql;

source loadAccPicturesTestMAC.sql;
# or
source loadAccPicturesTestWINDOWS.sql;

source loadStorePicturesTest.sql;
```

## Please refer to https://gametrees.vercel.app/ to test photo editing features via cloud database.

# Division of Work

## Connor Linville:

- Technical Specs, Functional Specs, Backlogs
- EER Diagram
- Users Authentication / Role Checking / Account Management
- Navbar, Footer
- Game page
- Animation: login and signup
- Admin: add game functionality, Userview page
- Wishlist: UI
- Middleware
- API routes/commands
- Image enhancement
- TailwindCSS Config and Setup
- Data (Details and Photos) uploading
- DBMS Connection
- Schema refactoring
- Backend: Query optimization, image storage, compression and conversion.
- Cloud database management
- Cloud deployment
- Product Deployment and Version control
- Project Management: reminder and track keeper
- Final Report
- Bug fixing and code review

## Steven Lu:

- Functional Specs
- UI mockup
- Frontend: All pages
- Sort and Filter Feature for AllGamesPage
- Trending section (query and frontend)
- Bay Area Stores (query and frontend) for homepage
- Best Discounts table (query and frontend) for homepage
- Edit Games Modal (logic and frontend)
- DaisyUI implementation
- Presentation Slides and record
- Final Report

## Alex Lim:

- Functional specs
- UI mockup
- Frontend: All pages
- Refactoring wishlist button (button can be reuse in any page)
- Wishlist button UI
- Database normalization
- Final Report
- Presentation Slides and Record
- Product demo Record
- Inventory Button (in progress)

## Aman Imran:

- Functional Specs
- Proposal drafting
- Use Case Testing and Quality Control
- Backlog drafting
- Final Report
- Presentation slides and record

## Tuan-Anh Ho:

- Functional specs.
- EER Diagram
- Schema mapping
- Data Diagram
- Database normalization
- Query Optimization
- Wishlist: backend fetching
- Search page: database query, backend and frontend
- Store page: store details, store inventories, store details edit, inventories edit
- Inventory page: stores management, games adding, new store creating 
- Homepage: games and stores fetching
- Wishlist button: add game, remove game logic and queries
- Project Management: Reminder and team engagement
- Final Report
