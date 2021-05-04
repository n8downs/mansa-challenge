# Mansa Coding Challenge

Hi there! This is a small demo repository whose purpose is to respond to the coding challenge found [here](https://github.com/MansaGroup/kanedama/tree/master/frontend). I also used it to spin up on new-to-me technologies like TypeScript, React Testing Library, Cypress, Material UI. As such, it's been the source of a lot of learning. It's also nice to get back to writing actual frontend code, as I've spent the last few years mostly doing infrastructure work to support a frontend team. Sometimes, making a button appear in the browser is more satisfying than digging in to an obscure performance problem in a production service.

I've taken the approach to let the work be driven by pretending this was a real live project that I was planning to support for a while. This way, I could get a sense of how I might want to structure a React app if I were building one from scratch today. So, while it's probably overkill with things like git hooks, linting and routing, it reflects the more-or-less real journey I'd take. There's plenty that's missing or still todo for this app. I'd imagine tech-centric things like CI, deploy, an API/caching layer. Further, I'd expect to spend time on user-centric things like fleshing out the transactions list to be more real (currently, it uses a placeholder algorithm of walking backwards 90 days at a time until we have least 10 transactions). However, I feel that it's hit a point that feels like a good balance of learning and (hopefully) demonstrating an ability to build a web app. So, I'll stop here.

### Setup

```
git clone https://github.com/n8downs/mansa-challenge.git
cd mansa-challenge
yarn install
yarn setup
```

## Scripts

Since I bootstrapped this project with [Create React App](https://github.com/facebook/create-react-app), it has the usual scripts that you're probably familiar with from that ecosystem.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the Jest test runner in the interactive watch mode. Use `yarn test --watchAll=false` to run all tests.

### `yarn lint`

Runs Eslint and Prettier against the codebase to enforce programatic style rules.

### `yarn smokes`

Runs the (tiny) Cypress integration test suite.
