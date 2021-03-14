export {}
declare module 'atom' {
  interface CommandEvent {
    currentTarget: EventTarget
  }
  interface TextEditor {
    tokenForBufferPosition(pos: PointLike): { value: string }
  }
  interface TextEditorElement extends Element {
    getModel(): TextEditor
  }
  interface PackageManager {
    onDidTriggerActivationHook(hook: string, callback: () => void): Disposable
  }
}
