import axiosCilent from './axiosCilent';

const categoryApi = {
  getAll(params) {
    const url = '/categories';
    return axiosCilent.get(url, {params});
  },
};

export default categoryApi;
