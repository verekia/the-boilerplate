const stage = process.env.STAGE || ''

export const staticBaseUrl = ({
  dev: 'http://localhost:8090',
  'local-prod': 'http://localhost:8091',
  staging: 'http://s3-staging',
  prod: 'http://s3-prod',
} as any)[stage]

export const bundleUrl =
  stage === 'dev' ? 'http://localhost:8080/bundle.js' : `${staticBaseUrl}/js/bundle.js`
