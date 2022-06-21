import { parseColors } from '@suger-tdy/color-json-picker'
import type { ExtensionContext } from 'vscode'
import { commands, window, workspace } from 'vscode'

export default function registerCommands(context: ExtensionContext) {
  registerNowTimeCommand(context)
  registerColorPickerCommand(context)
}

function registerNowTimeCommand(context: ExtensionContext) {
  const disposable = commands.registerCommand('author', () => {
    // eslint-disable-next-line no-console
    console.log(window.activeTextEditor?.document.getText())
    window.showWarningMessage('Extension Author: Tedy (tangdaoyuan)')
  })
  context.subscriptions.push(disposable)
}

function registerColorPickerCommand(context: ExtensionContext) {
  const disposable = commands.registerCommand('cc.default', async() => {
    const activeDoc = window.activeTextEditor?.document
    try {
      if (!activeDoc?.fileName.endsWith('.json')) {
        window.showErrorMessage('Only support json file!')
        return
      }

      const content = parseColors(JSON.parse(activeDoc.getText()))

      const document = await workspace.openTextDocument({
        content: JSON.stringify(content, null, 2),
        language: 'json',
      })
      if (document)
        window.showTextDocument(document)

      else
        window.showInformationMessage('Error!')
    }
    catch (error: unknown) {
      window.showErrorMessage((error as Object).toString())
    }
  })
  context.subscriptions.push(disposable)
}
