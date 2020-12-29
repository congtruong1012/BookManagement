/**
 *
 * HomePage
 *
 */

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Switch,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ModalBook from '../../components/ModalBook';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import {
  createBook,
  deleteBook,
  deleteMuiltiBook,
  getBook,
  getListBook,
  getTotalBook,
  setPublish,
  setPublishMuilti,
  updateBook,
} from './actions';
import { config, GET_LIST, LOAD_MORE } from './constants';
import reducer from './reducer';
import saga from './saga';
import makeSelectHomePage, {
  makeGetBook,
  makeGetListBook,
  makeGetLoading,
  makeLoadingListBook,
  makeTotalBook,
} from './selectors';
import { get } from 'lodash';

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
    triggerAddBook,
    triggerDeleteBook,
    triggerUpdateBook,
    triggerDeleteMuilti,
  } = props;
  const { isLoadingListBook } = statusFlag;
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const initState = {
    open: false,
    title: '',
    book: {
      _id: '',
      name: '',
      price: 0,
      type: '',
      author: '',
      published: false,
    },
  };
  const [info, setInfo] = useState(initState);
  const handleOpen = () => {
    setInfo({ ...info, open: true, title: 'Thêm mới' });
  };
  const handleClose = () => {
    setInfo(initState);
  };
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
    {
      name: 'action',
      label: 'Action',
      options: {
        customBodyRender: value => (
          <React.Fragment>
            <Box>
              <IconButton color="primary" onClick={() => handleGetBook(value)}>
                <EditIcon />
              </IconButton>
              <Box mx={1} component="span" />
              <IconButton
                color="primary"
                onClick={() => {
                  if (confirm('Do you want to delete this book')) {
                    triggerDeleteBook(value);
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </React.Fragment>
        ),
      },
    },
  ];
  const data = [];
  listBook.forEach((item, index) => {
    const { _id, name, price, type, author, published } = item;
    data.push([_id, index + 1, name, price, type, author, published, _id]);
  });
  const handleChangePublishMuilti = (arr, bool) => {
    triggerChangePublishMuilti(arr, bool);
    setSelected([]);
  };
  const handleDeleteMuilti = arr => {
    if (arr.length > 0 && confirm('Do you want to delete these book')) {
      triggerDeleteMuilti(arr);
      setSelected([]);
    }
  };
  const triggerSubmit = value => {
    const { _id, ...rest } = value;
    if (get(value, '_id')) {
      triggerUpdateBook(_id, { ...rest });
    } else {
      triggerAddBook({ ...rest });
    }
  };
  const handleGetBook = value => {
    const { _id, name, price, type, author, published } = listBook.find(
      item => item._id === value,
    );
    setInfo({
      ...info,
      open: true,
      title: 'Cập nhật',
      book: { _id, name, price, type, author, published },
    });
  };
  return isLoading ? (
    <Box>
      <CircularProgress color="primary" />
    </Box>
  ) : (
    <div>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Box mt={20}>
        <Box mb={2} display="flex" justifyContent="space-between">
          <Box>
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
            <Box mx={1} component="span" />
            <Button
              onClick={() => handleDeleteMuilti(selected)}
              variant="contained"
              color="primary"
            >
              Delete
            </Button>
          </Box>
          <Button color="primary" variant="contained" onClick={handleOpen}>
            Thêm mới
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
      <Box>
        <ModalBook
          {...info}
          onClose={handleClose}
          triggerSubmit={triggerSubmit}
        />
      </Box>
    </div>
  );
}

HomePage.propTypes = {
  listBook: PropTypes.array,
  isLoading: PropTypes.bool,
  totalBook: PropTypes.number,
  triggerListBook: PropTypes.func,
  triggerGetBook: PropTypes.func,
  triggerAddBook: PropTypes.func,
  triggerDeleteBook: PropTypes.func,
  triggerDeleteMuilti: PropTypes.func,
  triggerUpdateBook: PropTypes.func,
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
    triggerAddBook: value => dispatch(createBook(value)),
    triggerDeleteBook: value => dispatch(deleteBook(value)),
    triggerDeleteMuilti: arr => dispatch(deleteMuiltiBook(arr)),
    triggerUpdateBook: (id, data) => dispatch(updateBook(id, data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
