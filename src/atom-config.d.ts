export {}
declare module 'atom' {
  interface ConfigValues {
    'ide-haskell-hoogle.hoogleType':
      | ''
      | 'http://hoogle.haskell.org/'
      | 'https://haskell.org/hoogle/'
    'ide-haskell-hoogle.hooglePath': string
    'ide-haskell-hoogle.webZoomFactor': number
  }
}
