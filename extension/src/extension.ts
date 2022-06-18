import type { ExtensionContext } from 'vscode'
import registerCommands from './command'

export function activate(context: ExtensionContext) {
  registerCommands(context)
}

export function deactivate() {}
