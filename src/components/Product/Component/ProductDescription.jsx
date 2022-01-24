import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
ProductDescription.propTypes = {};

function ProductDescription({product}) {
  const saleDesctiption = DOMPurify.sanitize(product.description);

  return (
    <div
      className="style"
      dangerouslySetInnerHTML={{__html: saleDesctiption}}
    />
  );
}

export default ProductDescription;
