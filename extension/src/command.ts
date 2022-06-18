import type { ExtensionContext } from 'vscode'
import { commands, window } from 'vscode'

export default function registerCommands(context: ExtensionContext) {
  registerNowTimeCommand(context)
}

function registerNowTimeCommand(context: ExtensionContext) {
  const disposable = commands.registerCommand('now', () => {
    window.showWarningMessage(`Current Time: ${new Date().toLocaleString()}`)
  })
  context.subscriptions.push(disposable)
}
