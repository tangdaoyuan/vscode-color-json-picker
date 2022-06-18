import type { ExtensionContext } from 'vscode'
import { commands, window } from 'vscode'

export default function registerCommands(context: ExtensionContext) {
  registerHelloWorldCommand(context)
  registerNowTimeCommand(context)
}

function registerHelloWorldCommand(context: ExtensionContext) {
  const disposable = commands.registerCommand('tedystarter.helloTedy', () => {
    window.showInformationMessage('HelloTedy from TedyStarter!')
  })
  context.subscriptions.push(disposable)
}

function registerNowTimeCommand(context: ExtensionContext) {
  const disposable = commands.registerCommand('tedystarter.now', () => {
    window.showWarningMessage(`Current Time: ${new Date().toLocaleString()}`)
  })
  context.subscriptions.push(disposable)
}
