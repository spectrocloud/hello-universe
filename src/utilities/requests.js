async function postCounter({apiConnection, page}) {

  const customerHeaders = new Headers();
  customerHeaders.append('Authorization', `Bearer ${apiConnection.token}`);
  customerHeaders.append('Content-Type', 'application/json');
  customerHeaders.append('Accept', '*/*');


    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: customerHeaders,
      };

      let data = ""
      
      try {
        const results = await fetch(`${apiConnection.uri}/api/v${apiConnection.version}/counter/${page}`, requestOptions)
        const response = await results.json()
        data =  response?.total || 0
      } catch (error) {
        console.log(error)
        return error
      }

      return data;
}

async function getCounter({apiConnection, page}) {

    const customerHeaders = new Headers();
    customerHeaders.append('Authorization', `Bearer ${apiConnection.token}`);
    customerHeaders.append('Content-Type', 'application/json');
    customerHeaders.append('Accept', '*/*');


    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: customerHeaders,
      };
    
      let data = ""
      
      try {
        const results = await fetch(`${apiConnection.uri}/api/v${apiConnection.version}/counter/${page}`, requestOptions)
        const response = await results.json()
        data =  response?.total || 0
      } catch (error) {
        console.log(error)
        return [0, error]
      }

      return [data, null];
}

export { postCounter, getCounter };