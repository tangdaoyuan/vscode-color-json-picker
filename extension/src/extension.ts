import type { ExtensionContext } from 'vscode'
import registerCommands from './command'
import { updateVersion } from './version'

export function activate(context: ExtensionContext) {
  registerCommands(context)
  updateVersion(context)
}

export function deactivate() {}
