import { STAGE, S3_BUCKET_STAGING, S3_BUCKET_PROD } from '@sharyn/env'

export const staticBaseUrl =
  STAGE === 'dev'
    ? 'http://localhost:8090'
    : STAGE === 'local-prod'
    ? 'http://localhost:8091'
    : STAGE === 'staging'
    ? `https://${S3_BUCKET_STAGING}.s3.amazonaws.com/static`
    : STAGE === 'prod'
    ? `https://${S3_BUCKET_PROD}.s3.amazonaws.com/static`
    : ''

export const bundleUrl =
  STAGE === 'dev' ? 'http://localhost:8080/bundle.js' : `${staticBaseUrl}/js/bundle.js`
