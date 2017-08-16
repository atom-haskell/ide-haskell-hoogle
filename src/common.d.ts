interface ISymbol {
  mod: string
  signature: string
  href: string
  doc: string
}

declare module AtomTypes {
  interface TextEditor {
    tokenForBufferPosition(pos: IPoint): {value: string}
  }
}
