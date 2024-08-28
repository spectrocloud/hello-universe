import { postCounter, getCounter} from "./requests";

const connectionError = (uri)=> {
  return new Error(`Error: Unable to connect to the API server on ${uri}. Please try again later. 😢`)
}

async function IncrementVisitorCount({apiConnection, page}) {
    const counterName = 'Spacetastic-'+ page + '-Count';

    // No API set
    if (apiConnection == null || apiConnection.uri === "") {
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
    const counterName = 'Spacetastic-'+ page + '-Count';
    
    // No API set
    if (apiConnection == null || apiConnection.uri === "") {
      const count = localStorage.getItem(counterName);
      if (!count) {
        localStorage.setItem(counterName, 1);
        return [1, null];
      }
      return [count, null]
    }

    // Make server requests
    try {
      const count = await getCounter({apiConnection, page});
      return [count, null];
    } catch (error) {
      return [0, connectionError(apiConnection.uri)];
    }
}

export { IncrementVisitorCount, GetVisitorCount };