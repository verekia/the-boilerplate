const path = require('path')

const cmpPath = (folder, cmpName) => path.resolve(`src/${folder}/cmp-page/${cmpName}.tsx`)

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  await createPage({ path: '/', component: cmpPath('app', 'IndexPage') })
  await createPage({
    path: '/note',
    matchPath: '/note/:id',
    component: cmpPath('note', 'NotePage'),
  })
}
