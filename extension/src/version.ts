import type { ExtensionContext } from 'vscode'
import { gt } from 'semver'

export function updateVersion(context: ExtensionContext) {
  const versionKey = 'shown.version'
  context.globalState.setKeysForSync([versionKey])

  const currentVersion = context.extension.packageJSON.version
  const lastVersionShown = context.globalState.get<string>(versionKey, '0.0.0')
  if (!gt(currentVersion, lastVersionShown))
    return

  context.globalState.update(versionKey, currentVersion)
}
