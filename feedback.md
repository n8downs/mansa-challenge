## The good part:

- Project readme, with an explanation on choices and steps leading to the production of the test
- Use of TypeScript: types and interfaces
- RTL testing utils
- Setting up cypress tests and unit tests with Jest

## The 'to be improved' part:

- No CSS throughout the test, all the styling comes from the default Material UI components
- Limited UI: blank homepage, inconsistent layout (large gaps between transaction dates and amounts)
- No custom components, nor custom hooks
- Integration tests with cypress don't simulate user interaction, only if components render following a mocked request
- No custom fetcher or utils for data flow
- Limited data flow: based on the fetch() API, only at mount and storing retrieved data in local state
- No error handling
- Duplicate keys in lists breaking React's component updates
- The HTML structure isn't semantic: using h3 as top-level homepage title
- Switch case statement with only 1 case
- Formatting util functions solely based on template literals and slices (formatSIRET)
- Unit tests are redundant and overlap (formatMoney)
- One of the components has the following structure: if ( data ) { return content } else { return <> TODO </> }
- Subjective: questionable naming convention, variables are not self-explanatory (ex with the variable last)
- Subjective: App isn't deployed, it's always nice to see the Frontend app without having to run the server

## In a nutshell:

Thank you very much for your time, but we're not sure if we are the best company to support your growth at this time.

We value a lot the growth of our team (That's why each has a personalised Learning Path and scheduled Pair Programming) and I'm not sure if you are only a little rusted and want to deep dive again the frontend because, as you mentioned, in the readme: It's nice to get back to writing actual frontend code, as I've spent the last few years mostly doing infrastructure work

If you think you are a wannabe black magic wizard with K8s, we can switch to this process. If not, don't hesitate to recontact us later for the frontend position, you'll always be welcomed.
