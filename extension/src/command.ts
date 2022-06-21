import { parseColors } from '@suger-tdy/color-json-picker'
import type { ExtensionContext } from 'vscode'
import { commands, window, workspace } from 'vscode'

export default function registerCommands(context: ExtensionContext) {
  registerNowTimeCommand(context)
  registerColorPickerCommand(context)
}

function registerNowTimeCommand(context: ExtensionContext) {
  const disposable = commands.registerCommand('author', () => {
    window.showWarningMessage('Extension Author: Tedy (tangdaoyuan)')
  })
  context.subscriptions.push(disposable)
}

const commandWithOptions = {
  'cc.default': {
    alpha: false,
    color: false,
  },
  'cc.all': {
    alpha: true,
    color: true,
  },
  'cc.color': {
    alpha: false,
    color: true,
  },
  'cc.alpha': {
    alpha: true,
    color: false,
  },
}

function registerColorPickerCommand(context: ExtensionContext) {
  for (const command in commandWithOptions) {
    const disposable = commands.registerCommand(command, async() => {
      const activeDoc = window.activeTextEditor?.document
      try {
        if (!activeDoc?.fileName.endsWith('.json')) {
          window.showErrorMessage('Only support json file!')
          return
        }
        await openColorsDoc(
          activeDoc.getText(),
          commandWithOptions[command as keyof typeof commandWithOptions],
        )
      }
      catch (error: unknown) {
        window.showErrorMessage((error as Object).toString())
      }
    })
    context.subscriptions.push(disposable)
  }
}

async function openColorsDoc(text: string, options: { color: boolean; alpha: boolean }) {
  const content = parseColors(JSON.parse(text), options.alpha, options.color)

  const document = await workspace.openTextDocument({
    content: JSON.stringify(content, null, 2),
    language: 'json',
  })
  if (document)
    window.showTextDocument(document)

  else
    window.showInformationMessage('Error!')
}
