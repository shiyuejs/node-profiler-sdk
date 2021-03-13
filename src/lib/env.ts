
export const __win = process.platform === 'win32'
export const __darwin = process.platform === 'darwin'
export const __version = process.versions.node
export const isNodeRunTime = false
export const isElectronRunTime = true
export const pid = process.pid