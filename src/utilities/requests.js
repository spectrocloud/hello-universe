async function postCounter(url, version, token) {

  const customerHeaders = new Headers();
  customerHeaders.append('Authorization', `Bearer ${token}`);
  customerHeaders.append('Content-Type', 'application/json');
  customerHeaders.append('Accept', '*/*');


    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: customerHeaders,
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

async function getCounter(url, version, token) {

    const customerHeaders = new Headers();
    customerHeaders.append('Authorization', `Bearer ${token}`);
    customerHeaders.append('Content-Type', 'application/json');
    customerHeaders.append('Accept', '*/*');


    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: customerHeaders,
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