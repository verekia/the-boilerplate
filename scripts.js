require('dotenv/config')

const { run, runSync } = require('./run-cmd')

const { DEV_STATIC_PORT, LOCAL_PROD_STATIC_PORT, STAGING_S3_BUCKET, PROD_S3_BUCKET } = process.env

const webpackDevServer = 'webpack-dev-server'
const serverlessDevServer = 'serverless offline -s dev'
const staticDevServer = `http-server public -p ${DEV_STATIC_PORT}`

const serverlessLocalProdServer = 'serverless offline -s local-prod'
const staticLocalProdServer = `http-server dist -p ${LOCAL_PROD_STATIC_PORT}`

const uploadServerlessStaging = 'serverless deploy -s staging'
const uploadServerlessProd = 'serverless deploy -s prod'

const uploadDistToS3Staging = `aws s3 cp --recursive dist s3://${STAGING_S3_BUCKET}/static/`
const uploadDistToS3Prod = `aws s3 cp --recursive dist s3://${PROD_S3_BUCKET}/static/`

const clean = 'shx rm -rf dist .webpack'
const copyPublic = 'shx cp -r public dist'
const webpackAppProd = 'webpack -p'

const lint = 'echo TODO lint'
const typeCheck = 'tsc --noEmit'
const test = 'echo TODO test'

const prepareProd = () => {
  runSync(clean)
  runSync(copyPublic)
  runSync(webpackAppProd)
}

const validate = () => {
  runSync(lint)
  runSync(typeCheck)
  runSync(test)
}

const scripts = {
  dev: () => {
    run(webpackDevServer)
    run(serverlessDevServer)
    run(staticDevServer)
  },
  'local-prod': () => {
    prepareProd()
    run(serverlessLocalProdServer)
    run(staticLocalProdServer)
  },
  'deploy-staging': () => {
    prepareProd()
    runSync(uploadServerlessStaging)
    runSync(uploadDistToS3Staging)
  },
  'deploy-prod': () => {
    prepareProd()
    runSync(uploadServerlessProd)
    runSync(uploadDistToS3Prod)
  },
  'validate': () => {
    validate()
  }
}

scripts[process.argv[2]]()
