/**
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import MUIDataTable from 'mui-datatables';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import makeSelectHomePage, {
  makeGetListBook,
  makeGetLoading,
  makeLoadingListBook,
  makeTotalBook,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getListBook,
  getTotalBook,
  setPublish,
  setPublishMuilti,
} from './actions';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Switch,
} from '@material-ui/core';
import { config, GET_LIST, LOAD_MORE } from './constants';

export function HomePage(props) {
  const {
    listBook,
    totalBook,
    isLoading,
    statusFlag,
    triggerListBook,
    triggerTotalBook,
    triggerSwitch,
    triggerChangePublishMuilti,
  } = props;
  const { isLoadingListBook } = statusFlag;
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const [selected, setSelected] = useState([]);
  const checkAllBook = e => {
    if (e.target.checked) {
      const newSelected = listBook.reduce((arr, item) => {
        arr.push(item._id);
        return arr;
      }, []);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleCheckBook = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  const isCheckedBook = id => selected.indexOf(id) !== -1;
  useEffect(() => {
    triggerListBook(GET_LIST);
    triggerTotalBook();
  }, []);
  const columns = [
    {
      name: '',
      label: '',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <Checkbox
              color="primary"
              checked={isCheckedBook(value)}
              onChange={e => handleCheckBook(e, value)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          );
        },
        customHeadLabelRender: () => {
          return (
            <Checkbox
              checked={
                selected.length > 0 && selected.length === listBook.length
              }
              onChange={checkAllBook}
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          );
        },
      },
    },
    {
      name: 'stt',
      label: 'STT',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'price',
      label: 'Price',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'type',
      label: 'Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'author',
      label: 'Author',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'publish',
      label: 'Publish',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, row) => {
          return (
            <Switch
              checked={value}
              onChange={() => triggerSwitch(row.rowData[0])}
              color="primary"
              name="published"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          );
        },
      },
    },
  ];
  const data = [];
  listBook.forEach((item, index) => {
    const { _id, name, price, type, author, published } = item;
    data.push([_id, index + 1, name, price, type, author, published]);
  });
  const handleChangePublishMuilti = (arr, bool) => {
    triggerChangePublishMuilti(arr, bool);
    setSelected([]);
  };
  return isLoading ? (
    <Box>
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    <div>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Box mt={20}>
        <Box mb={2}>
          <Button
            onClick={() => handleChangePublishMuilti(selected, true)}
            variant="contained"
            color="primary"
          >
            On
          </Button>
          <Box mx={1} component="span" />
          <Button
            onClick={() => handleChangePublishMuilti(selected, false)}
            variant="contained"
            color="primary"
          >
            Off
          </Button>
        </Box>
        {isLoadingListBook ? (
          <Box>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <MUIDataTable
            title="List Book"
            columns={columns}
            data={data}
            options={config}
          />
        )}
        <Box mt={5} textAlign="center">
          {statusFlag.isLoadMore ? (
            <Box>
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            totalBook > listBook.length && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => triggerListBook(LOAD_MORE)}
              >
                Load More
              </Button>
            )
          )}
        </Box>
      </Box>
    </div>
  );
}

HomePage.propTypes = {
  listBook: PropTypes.array,
  isLoading: PropTypes.bool,
  totalBook: PropTypes.number,
  triggerListBook: PropTypes.func,
  handleChangePunlishMuilti: PropTypes.func,
  statusLoading: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  isLoading: makeGetLoading(),
  listBook: makeGetListBook(),
  totalBook: makeTotalBook(),
  statusFlag: makeLoadingListBook(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerListBook: type => dispatch(getListBook(type)),
    triggerTotalBook: () => dispatch(getTotalBook()),
    triggerSwitch: id => dispatch(setPublish(id)),
    triggerChangePublishMuilti: (arr, bool) =>
      dispatch(setPublishMuilti(bool, arr)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
