# webpack.server.config.js

## Description

This is the Webpack configuration file for our serverless lambda functions. Because we write them in TypeScript, we need to bundle them just like a webapp into a file to upload to AWS.

## Notes

### tsconfig-paths-webpack-plugin

[`tsconfig-paths-webpack-plugin`](https://github.com/dividab/tsconfig-paths-webpack-plugin) is a plugin to allow TypeScript files compiled by Webpack to understand absolute imports `import Profile from 'user/Profile'` instead of things like `import Profile from '../../user/Profile'`. It uses the `baseUrl` of `tsconfig.json`.

### process.env.STAGE

`DefinePlugin` does not seem to correctly add `STAGE` to `process.env`. Probably because we are running in a Node environment, something weird happens as of webpack `4.39.2` and serverless-webpack `5.3.1`. When using `DefinePlugin` I get this kind of weird behavior:

```js
const { STAGE, OTHER_ENV_VARS } = process.env

console.log(STAGE) // undefined         <-- wtf
console.log(process.env.STAGE) // ok    <-- wtf

console.log(OTHER_ENV_VARS) // ok
```

So in this file I am setting `process.env.STAGE = slsw.lib.options.stage` instead of using `DefinePlugin`.
