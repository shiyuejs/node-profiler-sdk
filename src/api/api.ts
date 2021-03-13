import { IAPISendHeapReq } from "../model/api"
import { Http } from "./http"

export const ApiSendHeap = (data: IAPISendHeapReq) => new Http<IAPISendHeapReq>(data)