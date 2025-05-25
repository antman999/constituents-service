# constituents-service

## Installation

1. To get started with running the service locally clone the repo by running `git clone git@github.com:antman999/constituents-service.git` on your terminal/cli.
2. Open a duplicate terminal window once you `cd` into the repo. Next cd into the backend service, install dependencies and start the service `cd backend && npm i && npm run dev`.
3. In the other terminal do the same for the frontend `cd frontend && npm i && npm run dev`
4. You should now be up and running with both services.

## Next steps & Improvements

Some next steps to make this service scale are:

**Backend:**

1. Create a test suite for our endpoints and logic especially the CSV export.
2. Handle auth, this should be not only for users but for elected officials to see who is actually part of the newsletter and handle analytics.
3. Think of a DB choice. We can expand into a discussion of using a key/value table or a traditional relational DB.
4. Handle our pagination better. We can think of supporting cursor based pagination.
5. Caching our constituents requests better.
6. Admin tools to delete, update constituents better.

**Frontend:**

1. Translations, constituents can come from many different backgrounds so we should support all used languages.
2. A11Y, this should always be a top priority especially making sure our form is accessible to everyone. (color contrast, table screen readers.)
3. Mobile friendly: As of now our mobile support for this web app is functional but we could expand this for all screen sizes especially tablets and our table.
4. Elected official branding and customization. This is a crucial client side feature that can help elected officials add their touch and branding to this web app. As of now I tried to mimic Indigovs UI colors to make it stand out.
5. Better filtering tools for getting the right user information quicker.
6. SSR vs CSR, could be a good conversation.
