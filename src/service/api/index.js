const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/${VERSION}/auth/login`,
    profile: `${API}/${VERSION}/auth/profile`,
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
    getEmployees: (limit, offset) =>
      `${API}/${VERSION}/employees?limit=${limit}&offset=${offset}`,
    getEmployee: (id) => `${API}/${VERSION}/employees/${id}`,
    addEmployee: `${API}/${VERSION}/employees`,
    updateEmployee: (id, update) =>
      `${API}/${VERSION}/employees/${id}?update=${update}`,
    deleteEmployee: (id) => `${API}/${VERSION}/employees/${id}`,
  },
  rawMaterials: {
    getRawMaterials: (limit, offset, filter) =>
      `${API}/${VERSION}/raw-materials?limit=${limit}&offset=${offset}&filter=${filter}`,
    getAllRawMaterials: (query) =>
      `${API}/${VERSION}/raw-materials?filter=${query}`,
    getRawMaterial: (id) => `${API}/${VERSION}/raw-materials/${id}`,
    addRawMaterial: `${API}/${VERSION}/raw-materials`,
    updateRawMaterial: (id) => `${API}/${VERSION}/raw-materials/${id}`,
    disableRawMaterial: (id) => `${API}/${VERSION}/raw-materials/${id}`,
  },
  rawMaterialBatch: {
    getAll: (limit, offset, order, type) =>
      `${API}/${VERSION}/raw-material-batches?limit=${limit}&offset=${offset}&order=${order}&type=${type}`,
    addRawMaterialBatch: `${API}/${VERSION}/raw-material-batches`,
    getById: (id) => `${API}/${VERSION}/raw-material-batches/${id}`,
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
    getProduct: (id) => `${API}/${VERSION}/products/${id}`,
    addProduct: `${API}/${VERSION}/products`,
    updateProduct: (id) => `${API}/${VERSION}/products/${id}`,
    disableProduct: (id) => `${API}/${VERSION}/products/${id}`,
  },
};

export default endPoints;
