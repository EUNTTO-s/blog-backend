const whereBuilder = (columnName: string, serchValue: string | Number, isFirstWhere: boolean = false) => {
  const NOT_NULL_STATE = 'IS NOT NULL';
  if (!serchValue && !isFirstWhere) {
    return ``;
  }
  return `
  ${isFirstWhere? 'WHERE' : 'AND'}
    ${columnName} ${serchValue? '=\''+ serchValue + '\''  : NOT_NULL_STATE}
  `
};

const setBuilder = (pairArray: [string, string][]) : [string, any[]]=> {
  console.log("pairArray: ", pairArray);
  const filteredArray = pairArray
          .filter((pair) => pair[1] != undefined);

  const stateArray = filteredArray
    .map((pair, index, arr) => {
      const isLastIndex = index + 1 == arr.length;
      return `
      ${pair[0]} = ? ${isLastIndex ? "" : ","}`;
    });

  const valueArr : string[] = filteredArray.map((pair, index, arr) => pair[1]);

  const state = stateArray.reduce(
    (acc, state) => acc + state,
    ''
  );
  return [state, valueArr];
};

export {
  whereBuilder,
  setBuilder,
}