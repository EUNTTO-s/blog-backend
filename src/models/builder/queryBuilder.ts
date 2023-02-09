const whereBuilder = (columnName: string, searchOption: ["LIKE"|"="|"<="|">=", ("AND"|"OR"|"NOT")?, ("QUOTE"|"NO_QUOTE"|"SEARCH")?], serchValue: string | Number, isFirstWhere: boolean = false) => {
  if (!serchValue && !isFirstWhere) {
    return ``;
  }
  const mainOperator = searchOption[0];
  const subOperator = searchOption[1] || "AND";
  const valueWrapOption = searchOption[2] || "QUOTE";
  let searchState = 'IS NOT NULL';

  if (serchValue) {
    const searchTarget = modifyValue(serchValue, valueWrapOption);
    searchState = `${mainOperator} ${searchTarget}`;
  }

  return `
  ${isFirstWhere? 'WHERE' : subOperator}
    ${columnName} ${searchState}
  `
};

const setBuilder = (pairArray: [string, string | number, boolean?][]) : [string, any[]]=> {
  // array 0번쨰: 컬럼명
  // array 1번쨰: 컬럼값
  // array 2번쨰: 컬럼이 ID인지 확인하는 Flag

  // 컬럼값이 undefined일 경우 Client에서 변경요청하지 않은 값이라 판단하고 업데이트 대상에서 제외한다.
  const filteredArray = pairArray
          .filter((pair) => pair[1] != undefined);

  const stateArray = filteredArray
    .map((pair, index, arr) => {
      const isLastIndex = index + 1 == arr.length;
      return `
      ${pair[0]} = ? ${isLastIndex ? "" : ","}`;
    });

  const valueArr : (string|number)[] = filteredArray.map((pair, index, arr) => {
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

const modifyValue = (searchValue: string|Number, valueWrapOption: "QUOTE"|"NO_QUOTE"|"SEARCH") => {
  switch(valueWrapOption){
      case "QUOTE":     return `'${searchValue}'`;
      case "NO_QUOTE":  return searchValue;
      case "SEARCH":    return `'%${searchValue}%'`;
      default:          return `'${searchValue}'`;
  }
}

export {
  whereBuilder,
  setBuilder,
}