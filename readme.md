## Cloud Functions PubSub-Puppeteer-TypeScript Boilerplate

### Usage

- Development
  - Modify `handler` function in `src/functions.ts`.

- Build
  ```bash
  npm run build
  ```

- Deploy
  - Deploys `handler` exported in `build/functions.js` to Google Cloud Functions.
  ```bash
  npm run deploy
  ```
  - You must [set up Cloud SDK](https://cloud.google.com/sdk/docs/initializing) before deploy to Cloud Functions.
  - If you want to change topic name or deployment name settings, modify the `deploy` command in `package.json`.

- Test Deployment
  ```bash
  gcloud pubsub topics publish your-topic-name --message '{\"keywords\": [\"Puppeteer\", \"usage\"]}'
  gcloud functions logs read --limit 20
- ```
