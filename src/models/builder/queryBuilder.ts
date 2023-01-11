const whereBuilder = (columnName: string, searchOption: ["LIKE"|"="|"<="|">=", ("AND"|"OR"|"NOT")?], serchValue: string | Number, isFirstWhere: boolean = false) => {
  if (!serchValue && !isFirstWhere) {
    return ``;
  }
  const mainOperator = searchOption[0];
  const subOperator = searchOption[1] || "AND";
  let searchState;
  if (!serchValue) {
    searchState = 'IS NOT NULL';
  } else {
    const isLike = mainOperator == "LIKE";
    const searchTarget = isLike? `'%${serchValue}%'` :`${serchValue}`;
    searchState = `${mainOperator} ${searchTarget}`;
  }
  return `
  ${isFirstWhere? 'WHERE' : subOperator}
    ${columnName} ${searchState}
  `
};

const setBuilder = (pairArray: [string, string, boolean?][]) : [string, any[]]=> {
  const filteredArray = pairArray
          .filter((pair) => pair[1] != undefined);

  const stateArray = filteredArray
    .map((pair, index, arr) => {
      const isLastIndex = index + 1 == arr.length;
      return `
      ${pair[0]} = ? ${isLastIndex ? "" : ","}`;
    });

  const valueArr : string[] = filteredArray.map((pair, index, arr) => {
    const bPropertyOption = pair[2];
    if (bPropertyOption && pair[1] == '') {
      return null;
    }
    return pair[1];
  });

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