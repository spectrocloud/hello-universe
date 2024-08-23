
function IncrementVisitorCount(page) {
    const counterName = 'Spacetastic-'+ page + '-Count';
    const count = localStorage.getItem(counterName);
    if (!count) {
      localStorage.setItem(counterName, 1);
      return;
    }
      
    localStorage.setItem(counterName, parseInt(count) + 1);
}

function GetVisitorCount(page) {
    const counterName = 'Spacetastic-'+ page + '-Count';
    const count = localStorage.getItem(counterName);
    if (!count) {
      localStorage.setItem(counterName, 1);
      return 1;
    }

    return count;
}

export { IncrementVisitorCount, GetVisitorCount };