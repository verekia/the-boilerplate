const stage = process.env.STAGE || ''

export const staticBaseUrl =
  stage === 'dev'
    ? 'http://localhost:8090'
    : stage === 'local-prod'
    ? 'http://localhost:8091'
    : `https://${process.env.S3_BUCKET}.s3.amazonaws.com/static`

export const bundleUrl =
  stage === 'dev' ? 'http://localhost:8080/bundle.js' : `${staticBaseUrl}/js/bundle.js`
