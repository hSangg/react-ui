import {STATIC_HOST, THUMBNAIL_PLACEHOLDER} from 'Constant/common';
import React from 'react';

ProductThumbnail.propTypes = {};

function ProductThumbnail({product}) {
  const thumbnail = product?.thumbnail?.url
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;

  return (
    <div>
      <img src={thumbnail} alt="" />
    </div>
  );
}

export default ProductThumbnail;
