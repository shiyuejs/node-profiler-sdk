import { IdefaultConfig } from "../config"

export interface IProfilerOptions extends IdefaultConfig {
	readonly intervalRate?: number
	readonly repotLimit?: number
}