const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  modules: {
    getAllModules: `${API}/${VERSION}/modules`,
  },
  auth: {
    login: `${API}/${VERSION}/auth/login`,
    profile: `${API}/${VERSION}/auth/profile`,
    recovery: `${API}/${VERSION}/auth/recovery`,
    resetPassword: `${API}/${VERSION}/auth/reset-password`,
  },
  apiaries: {
    getApiaries: (limit, offset, filter) =>
      `${API}/${VERSION}/apiaries?limit=${limit}&offset=${offset}&filter=${filter}`,
    getAllApiaries: (query) => `${API}/${VERSION}/apiaries?filter=${query}`,
    getApiary: (id) => `${API}/${VERSION}/apiaries/${id}`,
    addApiary: `${API}/${VERSION}/apiaries`,
    updateApiary: (id) => `${API}/${VERSION}/apiaries/${id}`,
    disableApiary: (id) => `${API}/${VERSION}/apiaries/${id}`,
  },
  employees: {
    getEmployees: (limit, offset, filter) =>
      `${API}/${VERSION}/employees?limit=${limit}&offset=${offset}&filter=${filter}`,
    getEmployee: (id) => `${API}/${VERSION}/employees/${id}`,
    addEmployee: `${API}/${VERSION}/employees`,
    updateEmployee: (id, update) =>
      `${API}/${VERSION}/employees/${id}?update=${update}`,
    updatePassword: (id) => `${API}/${VERSION}/employees/${id}/password`,
    disableEmployee: (id) => `${API}/${VERSION}/employees/${id}`,
  },
  typeOfEmployees: {
    getTypesOfEmployee: (limit, offset, filter) =>
      `${API}/${VERSION}/types-of-employee?limit=${limit}&offset=${offset}&filter=${filter}`,
    getAllTypesOfEmployee: (query) =>
      `${API}/${VERSION}/types-of-employee?filter=${query}`,
    getTypeOfEmployee: (id) => `${API}/${VERSION}/types-of-employee/${id}`,
    getAllModules: (id) => `${API}/${VERSION}/types-of-employee/${id}/modules`,
    addTypeOfEmployee: `${API}/${VERSION}/types-of-employee`,
    updateTypeOfEmployee: (id) => `${API}/${VERSION}/types-of-employee/${id}`,
    deleteTypeOfEmployee: (id) => `${API}/${VERSION}/types-of-employee/${id}`,
  },
  rawMaterials: {
    getRawMaterials: (limit, offset, filter) =>
      `${API}/${VERSION}/raw-materials?limit=${limit}&offset=${offset}&filter=${filter}`,
    getAllRawMaterials: (query) =>
      `${API}/${VERSION}/raw-materials?filter=${query}`,
    getRawMaterial: (id) => `${API}/${VERSION}/raw-materials/${id}?type=id`,
    getRawMaterialByCode: (id) =>
      `${API}/${VERSION}/raw-materials/${id}?type=code`,
    addRawMaterial: `${API}/${VERSION}/raw-materials`,
    updateRawMaterial: (id) => `${API}/${VERSION}/raw-materials/${id}`,
    deleteRawMaterial: (id) => `${API}/${VERSION}/raw-materials/${id}`,
  },
  rawMaterialBatch: {
    getAll: (limit, offset, order, type, rawMaterialId) =>
      `${API}/${VERSION}/raw-material-batches?limit=${limit}&offset=${offset}&order=${order}&type=${type}&rawMaterialId=${rawMaterialId}`,
    addRawMaterialBatch: `${API}/${VERSION}/raw-material-batches`,
    updateRawMaterialBatch: (id) =>
      `${API}/${VERSION}/raw-material-batches/${id}`,
    getById: (id) =>
      `${API}/${VERSION}/raw-material-batches/${id}?isPacking=false`,
    getByIdForPacking: (id) =>
      `${API}/${VERSION}/raw-material-batches/${id}?isPacking=true`,
    deleteRawMaterialBatch: (id) =>
      `${API}/${VERSION}/raw-material-batches/${id}`,
  },
  warehouses: {
    getWarehouses: (limit, offset, filter) =>
      `${API}/${VERSION}/warehouses?limit=${limit}&offset=${offset}&filter=${filter}`,
    getAllWarehouses: (query) => `${API}/${VERSION}/warehouses?filter=${query}`,
    getWarehouse: (id) => `${API}/${VERSION}/warehouses/${id}`,
    addWarehouse: `${API}/${VERSION}/warehouses`,
    updateWarehouse: (id) => `${API}/${VERSION}/warehouses/${id}`,
    disableWarehouse: (id) => `${API}/${VERSION}/warehouses/${id}`,
  },
  countries: {
    getAll: (query) => `${API}/${VERSION}/countries?query=${query}`,
    getAllProvincesById: (id, query) =>
      `${API}/${VERSION}/countries/${id}/provinces?query=${query}`,
  },
  products: {
    getProducts: (limit, offset, filter) =>
      `${API}/${VERSION}/products?limit=${limit}&offset=${offset}&filter=${filter}`,
    getAllProducts: (query) => `${API}/${VERSION}/products?filter=${query}`,
    getProduct: (id) => `${API}/${VERSION}/products/${id}?type=id`,
    getAllProductBatchesByBarcode: (id) =>
      `${API}/${VERSION}/products/${id}/batches?type=barcode`,
    getProductByBarcode: (id) =>
      `${API}/${VERSION}/products/${id}?type=barcode`,
    addProduct: `${API}/${VERSION}/products`,
    updateProduct: (id) => `${API}/${VERSION}/products/${id}`,
    deleteProduct: (id) => `${API}/${VERSION}/products/${id}`,
  },
  productBatch: {
    getAll: (limit, offset, order, type, productId) =>
      `${API}/${VERSION}/product-batches?limit=${limit}&offset=${offset}&order=${order}&type=${type}&productId=${productId}`,
    addProductBatch: `${API}/${VERSION}/product-batches`,
    updateProductBatch: (id) => `${API}/${VERSION}/product-batches/${id}`,
    getById: (id) => `${API}/${VERSION}/product-batches/${id}?isOutput=false`,
    getByIdForOutput: (id) =>
      `${API}/${VERSION}/product-batches/${id}?isOutput=true`,
    deleteProductBatch: (id) => `${API}/${VERSION}/product-batches/${id}`,
  },
  productOutput: {
    getAll: (limit, offset, isPaid, type) =>
      `${API}/${VERSION}/product-outputs?limit=${limit}&offset=${offset}&isPaid=${isPaid}&typeOfSale=${type}`,
    addProductOutput: `${API}/${VERSION}/product-outputs`,
    updateProductOutput: (id) => `${API}/${VERSION}/product-outputs/${id}`,
    cancelOutput: (id) => `${API}/${VERSION}/product-outputs/${id}`,
  },
};

export default endPoints;
