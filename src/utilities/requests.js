import { version } from "react";

async function postCounter(url, version) {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };

      let data = ""
      
      try {
        const results = await fetch(`${url}/api/v${version}/counter`, requestOptions)
        const response = await results.json()
        data =  response?.total || 0
      } catch (error) {
        console.log(error)
        return error
      }

      return data;
}

async function getCounter(url, version) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    
      let data = ""
      
      try {
        const results = await fetch(`${url}/api/v${version}/counter`, requestOptions)
        const response = await results.json()
        data =  response?.total || 0
      } catch (error) {
        console.log(error)
        return error
      }

      return data;
}

export { postCounter, getCounter };