import { Box, makeStyles } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import categoryApi from 'api/categoryApi';
import React, { useEffect, useMemo, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'row-warp',
    margin: theme.spacing(1, 0),
    '& > li': {
      margin: theme.spacing(0, 0, 0, 1),
      listStyle: 'none',
    },
  },
}));

function FilterViewer({filters, onChange}) {
  const [categoryList, setCategoryList] = useState([]);

  const visibleFilters = useMemo(() => {
      return FILTER_LIST.filter(x => x.isVisible(filters))
  }, [filters])

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        const list = response.data.map((x) => ({
          id: x.id,
          name: x.name,
        }));

        setCategoryList(list);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const FILTER_LIST = [
    {
      id: 1,
      getLabel: (filters) => 'Giao hàng miễn phí',
      isActive: (filters) => filters.isFreeShip,
      isVisible: (filters) => true,
      isRemovable: false,
      onRemove: (filters) => {},
      onToggle: (filters) => {
        const newFilters = {...filters};
        newFilters.isFreeShip
          ? (newFilters.isFreeShip = false)
          : (newFilters.isFreeShip = true);
        return newFilters;
      },
    },
    {
      id: 2,
      getLabel: (filters) => 'Có khuyến mãi',
      isActive: (filters) => true,
      isVisible: (filters) => {
        console.log('filters: ', filters);
        console.log('List: ', categoryList);
        return filters.isPromotion;
      },
      isRemovable: true,
      onRemove: (filters) => {
        const newFilters = {...filters};
        newFilters.isPromotion = false;

        return newFilters;
      },
      onToggle: (filters) => {},
    },
    {
      id: 3,
      getLabel: (filters) =>
        `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
      isActive: (filters) => true,
      isVisible: (filters) =>
        Object.keys(filters).includes('salePrice_gte') &&
        Object.keys(filters).includes('salePrice_lte') &&
        filters.salePrice_gte !== undefined,
      isRemovable: true,
      onRemove: (filters) => {
        const newFilters = {...filters};
        newFilters.salePrice_gte = undefined;
        newFilters.salePrice_lte = undefined;

        return newFilters;
      },
      onToggle: (filters) => {},
    },
    {
      id: 4,
      getLabel: (filters) => {
        const id = filters['category.id'];
        return categoryList[id - 1]?.name;
      },
      isActive: (filters) => true,
      isVisible: (filters) => filters['category.id'],
      isRemovable: true,
      onRemove: (filters) => {
        const newFilters = {...filters};
        newFilters['category.id'] = undefined;

        return newFilters;
      },
      onToggle: (filters) => {},
    },
  ];

  const 



  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {FILTER_LIST.map((x) => (
        <li>
          <Chip
            label={x.getLabel(filters)}
            onClick={x.isRemovable ? null : () => onChange(x.onToggle(filters))}
            clickable={!x.isRemovable}
            onDelete={
              x.isRemovable
                ? () => {
                    return onChange(x.onRemove(filters));
                  }
                : null
            }
            color={x.isActive(filters) ? 'primary' : 'default'}
            deleteIcon={<HighlightOffIcon />}
            variant="outlined"
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
