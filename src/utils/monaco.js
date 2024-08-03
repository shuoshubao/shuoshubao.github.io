export const MonacoEditorBaseConfig = {
  theme: 'vs-dark',
  autoIndent: true,
  formatOnPaste: true,
  formatOnType: true,
  fontSize: 14,
  automaticLayout: true,
  scrollBeyondLastLine: false
}

export const getMonacoEditor = async () => {
  const { default: MonacoEditorLoader } = await import('@monaco-editor/loader')
  MonacoEditorLoader.config({
    paths: {
      vs: 'https://registry.npmmirror.com/monaco-editor/0.44.0/files/min/vs'
    }
  })
  return await MonacoEditorLoader.init()
}
