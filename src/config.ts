export const config = {
  hoogleType: {
    order: 10,
    type: 'string',
    default: 'http://hoogle.haskell.org/',
    enum: [
      {value: '', description: 'Local hoogle. Will try to start Hoogle server from Path'},
      {value: 'http://hoogle.haskell.org/', description: 'Remote hoogle. Uses new http://hoogle.haskell.org/'},
      {value: 'https://haskell.org/hoogle/', description: 'Remote hoogle. Uses old https://haskell.org/hoogle/'},
    ],
  },
  hooglePath: {
    type: 'string',
    default: 'hoogle',
    description: 'Path to hoogle executable',
    order: 20,
  },
  webZoomFactor: {
    type: 'integer',
    description: 'Zoom factor for web view, in %',
    default: 100,
    minimum: 50,
    maximum: 300,
    order: 30,
  },
}
