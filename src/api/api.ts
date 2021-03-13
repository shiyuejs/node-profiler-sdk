import { IAPISendHeapReq } from "../model/api"
import { Http } from "./http"

export const ApiSendHeap = (data: ReadonlyArray<IAPISendHeapReq>) => {
	return new Http<ReadonlyArray<IAPISendHeapReq>>().post('http://127.0.0.1:7304/demo/v1/demo', data)
}

// export const ApiUploadFile = (data: ReadonlyArray<IAPISendHeapReq>) => {
// 	return new Http<ReadonlyArray<IAPISendHeapReq>>().uploadFile('http://127.0.0.1:7304/demo/v1/demo', data)
// }