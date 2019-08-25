# package.json

The interesting thing here is that we are using `scripts.js` instead of the `scripts` property of `package.json` to define our NPM scripts.

```json
"scripts": {
  "start": "node scripts dev",
  "local-prod": "node scripts local-prod",
  "deploy-staging": "node scripts deploy-staging",
  "deploy-prod": "node scripts deploy-prod",
  "check-all": "node scripts check-all"
},
```
