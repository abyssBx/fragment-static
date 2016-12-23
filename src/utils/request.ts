import qs from "qs";
import { merge } from "lodash";
import { get, post } from "axios";

const debug = getQueryString('debug')

export function appendQs(query:Object):string {
  return !query ? "" : `?${qs.stringify(merge(query, { debug: debug }))}`
}

export function pget(url:string, query?:Object) {
  return get(`${url}${appendQs(merge(query, { debug: debug }))}`).then((res) => res.data).catch(error => {
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

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return undefined;
}