const path = require('path')

const eslintCommand = (filenames) => {
  const files = filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')
  return `next lint --fix --file ${files}`
}

const prettierCommand = 'prettier --write'

// MEMO: tsconfig.json が見つからずエラーになるので bash を差し込む
// https://qiita.com/rpf-nob/items/454ff6cf135cee3dcab4
const typecheckCommand = `bash -c 'tsc --noEmit'`

module.exports = {
  'src/**/*.{ts,tsx}': [eslintCommand, prettierCommand, typecheckCommand],
}
