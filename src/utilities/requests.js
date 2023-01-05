import { version } from "react";

async function postCounter(url, version) {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
      try {
        const results = await fetch(`${url}/api/v${version}/counter`, requestOptions)
        const data = await results.json()
        return data?.total || 0
      } catch (error) {
        return error
      }
}

async function getCounter(url, version) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      try {
        const results = await fetch(`${url}/api/v${version}/counter`, requestOptions)
        const data = await results.json()
        return data?.total || 0
      } catch (error) {
        return error
      }
}

export { postCounter, getCounter };