interface CompanyPostFormInput {
  companiesId: string,
  companyName?: string,
  level2CategoriesId?: string,
  companyImgUrl?: string,
  companyShortDesc?: string,
  homepageUrl?: string,
  mainBussinessTags?: string,
  companyLongDesc?: string,
  fastfiveBenefitDesc?: string,
  companyContactAddress?: string,
  companyInfoUrl?: string,
  fastfiveBranchesId?: string,
  usersId: string
}
interface PostFormSearchOption {
  usersId?: string,
  companiesId?: string,
  id?: string,
  limit?: number,
}

interface CompanyPostInput extends CompanyPostFormInput {
}

interface PostSearchOption extends PostFormSearchOption {
  locationsId?: string,
  categoriesLv1Id?: string,
  categoriesLv2Id?: string,
  page?: number,
  offset?: number,
  ourGruop?: boolean,
}