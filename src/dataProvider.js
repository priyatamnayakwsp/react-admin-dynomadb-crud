import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
//import dotenv from 'dotenv';

// Load the environment variables from the .env file
//dotenv.config();
const apiToken = process.env.REACT_APP_API_TOKEN;
const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

// Encrypt the API token using the encryption key
//const encryptedToken = CryptoJS.AES.encrypt(apiToken, encryptionKey).toString();

const apiUrl = process.env.REACT_APP_API_URL;


const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  
  options.headers.set('X-Api-Key', apiToken);
  // Add your custom headers if needed
  // options.headers.set('X-Custom-Header', 'value');

  return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const response = await httpClient(url);
    if (!response.headers.has('content-range')) {
      throw new Error(
        'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination.'
      );
    }
    const total = parseInt(response.headers.get('content-range').split('/').pop(), 10);
    return {
      data: response.json.map(item => ({ ...item, id: item.id })),
      total: total,
    };
  },
  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const response = await httpClient(url);
    return {
      data: { ...response.json, id: response.json.id },
    };
  },
  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const response = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return {
      data: { ...params.data, id: response.json.id },
    };
  },
  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return {
      data: { ...params.data, id: params.id },
    };
  },
  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    await httpClient(url, {
      method: 'DELETE',
    });
    return {
      data: params.previousData,
    };
  },
  getMany: async (resource, params) => {
    const query = {
      filter: { id: params.ids },
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const response = await httpClient(url);
    return {
      data: response.json.map(item => ({ ...item, id: item.id })),
    };
  },
  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter,
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const response = await httpClient(url);
    if (!response.headers.has('content-range')) {
      throw new Error(
        'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination.'
      );
    }
    const total = parseInt(response.headers.get('content-range').split('/').pop(), 10);
    return {
      data: response.json.map(item => ({ ...item, id: item.id })),
      total: total,
    };
  },
  updateMany: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const { ids, data } = params;
    for (const id of ids) {
      const recordUrl = `${url}/${id}`;
      await httpClient(recordUrl, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    }
    return { data: ids };
  },
  deleteMany: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const { ids } = params;
    for (const id of ids) {
      const recordUrl = `${url}/${id}`;
      await httpClient(recordUrl, {
        method: 'DELETE',
      });
    }
    return { data: ids };
  },
};

export default dataProvider;
