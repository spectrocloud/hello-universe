function IncrementVisitorCount({apiConnection, page}) {
    const counterName = 'Spacetastic-'+ page + '-Count';

    // No API set
    if (apiConnection == null || apiConnection.uri === "") {
      const count = localStorage.getItem(counterName);
      if (!count) {
        localStorage.setItem(counterName, 1);
      }

      localStorage.setItem(counterName, parseInt(count) + 1);
    }
}

function GetVisitorCount({apiConnection, page}) {
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

    return [0, null];
}

export { IncrementVisitorCount, GetVisitorCount };