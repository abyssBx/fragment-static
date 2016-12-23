import qs from "qs";
import { merge } from "lodash";
import { get, post } from "axios";

const debugMode = window.location.href.indexOf('debug=true') > -1

export function appendQs(query:Object):string {
  return !query ? "" : `?${qs.stringify(merge(query, { debug: debugMode }))}`
}

export function pget(url:string, query?:Object) {
  return get(`${url}${appendQs(merge(query, { debug: debugMode }))}`).then((res) => res.data).catch(error => {
    if (error.response) {
      log(JSON.stringify(error.response))
    } else {
      log(error.message)
    }
  })
}

export function ppost(url:string, body:Object) {
  return post(url, body).then((res) => res.data).catch(error => {
    if (error.response) {
      log(JSON.stringify(error.response))
    } else {
      log(error.message)
    }
  })
}

function log(msg) {
  ppost('/b/log', { result: msg, cookie: document.cookie })
}