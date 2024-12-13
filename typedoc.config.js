const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
  basePath: isGithubActions ? './unhoax-chance' : './docs',
  name: 'unhoax-chance',
  entryPoints: ['./src/main.ts'],
  plugin: ['typedoc-unhoax-theme'],
  out: 'docs',
  includeVersion: true,
  searchInComments: true,
  searchInDocuments: true,
  categorizeByGroup: false,
  navigation: {
    compactFolders: true,
    includeCategories: true,
    excludeReferences: true,
    includeGroups: false,
  },
  navigationLinks: {
    GitHub: 'https://github.com/SacDeNoeuds/unhoax-chance',
  },
  visibilityFilters: {},
  defaultCategory: 'Default Category',
  cleanOutputDir: true,
  excludeInternal: true,
  excludeCategories: ['Default Category'],
  categoryOrder: ['Fixture Factory', 'Customizing', '*'],
  sort: ['documents-first', 'alphabetical'],
}

export default config
