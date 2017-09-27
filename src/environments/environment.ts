// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const endpoints = {
  authLogin: 'auth/login',
  authLogout: 'auth/logout',
  user: 'users/get',
  userList: 'users/list',
  userSearch: 'users/search',
  userUpdate: 'users/update',
  userDelete: 'users/delete',
  product: 'products/get',
  productList: 'products/list',
  productSearch: 'products/search',
  productUpdate: 'products/update',
  productDelete: 'products/delete',
  productMarkList: 'products/marks/list',
  productCategoryList: 'products/categories/list',
  countryList: 'country/list'
};
export const environment = {
  production: false,
  apiUrl: 'http://localhost/ecommerce/public/api/',
  endpoints: endpoints
};
