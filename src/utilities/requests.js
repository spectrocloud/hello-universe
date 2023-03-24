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
    customerHeaders.append("Access-Control-Allow-Origin", "*");
    customerHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


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
        alert(`Error: Could not fetch the data from the API_URI. Error thrown during the fetch() call in the getCounter() method definition. ${error}`)
        console.log(error)
        return error
      }

      return data;
}

export { postCounter, getCounter };