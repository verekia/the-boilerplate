import {
  DEV_STATIC_PORT,
  LOCAL_PROD_STATIC_PORT,
  S3_BUCKET_STAGING,
  S3_BUCKET_PROD,
} from '@sharyn/env'

import { run, runAsync, scripts } from '@sharyn/run-cmd'

const webpackDevServer = 'webpack-dev-server'
const serverlessOffline = (stage: string) => `serverless offline -s ${stage}`

const devStaticServer = `http-server public -p ${DEV_STATIC_PORT}`
const localProdStaticServer = `http-server dist -p ${LOCAL_PROD_STATIC_PORT}`

const uploadServerless = (stage: string) => `serverless deploy -s ${stage}`
const uploadDistToS3 = (bucket: string) => `aws s3 cp --recursive dist s3://${bucket}/static/`

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
    runAsync(devStaticServer)
  },
  'local-prod': () => {
    prepareProd()
    runAsync(serverlessOffline('local-prod'))
    runAsync(localProdStaticServer)
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
