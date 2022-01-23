import {useEffect, useState} from 'react';
import productApi from 'api/productApi';

useProduct.propTypes = {};

function useProduct(id) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await productApi.getById(id);
        setProduct(response.data);
      } catch (error) {
        console.log('error: ', error);
      }
    })();
  }, [id]);
  return {product, loading};
}

export default useProduct;
