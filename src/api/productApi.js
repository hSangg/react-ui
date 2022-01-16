import axiosClient from './axiosCilent';

const productApi = {
  async getAll(params) {
    const newParams = {...params};

    newParams._start =
      !params._page || params._page < 1
        ? 0
        : (newParams._page - 1) * (newParams._limit || 20);

    delete newParams._page;

    // Fetch product list + count
    const productList = await axiosClient.get('/products', {params: newParams});

    const count = await axiosClient.get('/products/count', {params: newParams});
    console.log('count: ', count.data);

    return {
      data: productList.data,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count.data,
      },
    };
  },
  getById(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  update(id, data) {
    const url = `/products/${id}`;
    return axiosClient.patch(url, data);
  },
  add(data) {
    const url = '/products';
    return axiosClient.put(url, data);
  },
  delete(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
