import {Box, Link} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React from 'react';
import {NavLink, useRouteMatch} from 'react-router-dom';

const useStyles = makeStyles((them) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3rem',
    gap: '25px',

    '& .active': {
      color: '#2196f3',
    },
  },
}));

const ProductMenu = () => {
  const {url} = useRouteMatch();
  const classes = useStyles();
  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>
          decription
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional`} exact>
          additional
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          review
        </Link>
      </li>
    </Box>
  );
};

export default ProductMenu;
