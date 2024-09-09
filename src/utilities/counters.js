import { postCounter, getCounter} from "./requests";

const connectionError = (uri)=> {
  return new Error(`Error: Unable to connect to the API server on ${uri}. Please try again later. 😢`)
}

async function IncrementVisitorCount({apiConnection, page}) {  
  // No API set
  if (apiConnection === undefined || apiConnection.uri === "") {
      const counterName = 'Spacetastic-'+ page + '-Count';
      const count = localStorage.getItem(counterName);
      if (!count) {
        localStorage.setItem(counterName, 1);
        return;
      }
      localStorage.setItem(counterName, parseInt(count) + 1);
      return;
    }
    
    // Make server requests
    try {
      await postCounter({apiConnection, page});
    } catch (error) {
      console.log(connectionError(apiConnection));
    }
}

async function GetVisitorCount({apiConnection, page}) {
  // No API set
  if (apiConnection === undefined || apiConnection.uri === "") {
      const counterName = 'Spacetastic-'+ page + '-Count';
      const count = localStorage.getItem(counterName);
      if (!count) {
        localStorage.setItem(counterName, 1);
        return [1, null];
      }
      return [count, null]
    }

    // Make server requests
    const [count, err] = await getCounter({apiConnection, page});
    if (err !== null) {
      return [0, connectionError(apiConnection.uri)];
    }
    
    return [count, null]
}

export { IncrementVisitorCount, GetVisitorCount };