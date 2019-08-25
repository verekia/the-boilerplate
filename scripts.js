require('dotenv/config')
const { run, runAsync, scripts } = require('@sharyn/run-cmd')

const { DEV_STATIC_PORT, LOCAL_PROD_STATIC_PORT, S3_BUCKET_STAGING, S3_BUCKET_PROD } = process.env

const webpackDevServer = 'webpack-dev-server'
const serverlessOffline = stage => `serverless offline -s ${stage}`
const staticServer = port => `http-server public -p ${port}`

const uploadServerless = stage => `serverless deploy -s ${stage}`
const uploadDistToS3 = bucket => `aws s3 cp --recursive dist s3://${bucket}/static/`

const clean = 'shx rm -rf dist .webpack'
const copyPublic = 'shx cp -r public dist'
const webpackAppProd = 'webpack -p'

const lint = 'echo TODO lint'
const typeCheck = 'tsc --noEmit'
const test = 'echo TODO test'

const prepareProd = () => {
  run(clean)
  run(copyPublic)
  run(webpackAppProd)
}

const checkAll = () => {
  run(lint)
  run(typeCheck)
  run(test)
}

scripts({
  dev: () => {
    runAsync(webpackDevServer)
    runAsync(serverlessOffline('dev'))
    runAsync(staticServer(DEV_STATIC_PORT))
  },
  'local-prod': () => {
    prepareProd()
    runAsync(serverlessOffline('local-prod'))
    runAsync(staticServer(LOCAL_PROD_STATIC_PORT))
  },
  'deploy-staging': () => {
    prepareProd()
    run(uploadServerless('staging'))
    run(uploadDistToS3(S3_BUCKET_STAGING))
  },
  'deploy-prod': () => {
    prepareProd()
    run(uploadServerless('prod'))
    run(uploadDistToS3(S3_BUCKET_PROD))
  },
  'check-all': checkAll,
})
