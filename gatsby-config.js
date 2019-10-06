module.exports = {
  siteMetadata: {
    title: 'Title from siteMetadata zzz',
  },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-graphql',
      options: { typeName: 'NoteAPI', fieldName: 'noteAPI', url: 'http://localhost:4000' },
    },
  ],
}
