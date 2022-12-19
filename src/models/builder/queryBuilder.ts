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

export {
  whereBuilder
}