/* eslint-disable react/prop-types */
/**
 *
 * ModalBook
 *
 */

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';

const defaultValues = {
  _id: '',
  name: '',
  price: 0,
  type: '',
  author: '',
  published: false,
};
const schema = yup.object().shape({
  _id: yup.string(),
  name: yup.string().required(),
  price: yup.number().min(0),
  type: yup.string().required(),
  author: yup.string().required(),
  published: yup.bool().required(),
});
const categories = [
  'Sách Giáo Khoa',
  'Sách Giáo Trình',
  'Truyện',
  'Tiểu Thuyết',
];
function ModalBook({ open, onClose, title, book, triggerSubmit }) {
  const { register, errors, control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    reset({ ...book });
  }, [book]);
  const onSubmit = data => {
    triggerSubmit(data);
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            margin="dense"
            label="_id"
            name="_id"
            inputRef={register}
            variant="outlined"
            fullWidth
            style={{ display: 'none' }}
          />
          <TextField
            margin="dense"
            label="Name"
            name="name"
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
            inputRef={register}
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            error={!!errors.price}
            helperText={errors.price && errors.price.message}
            inputRef={register}
            variant="outlined"
            fullWidth
          />
          <Controller
            name="type"
            control={control}
            render={propCates => (
              <Autocomplete
                id="tags-standard"
                options={categories}
                onChange={(e, category) => propCates.onChange(category)}
                getOptionLabel={option => option}
                value={propCates.value}
                renderInput={params => (
                  <TextField
                    {...params}
                    margin="dense"
                    label="Type"
                    error={!!errors.type}
                    helperText={errors.type && errors.type.message}
                    inputRef={propCates.ref}
                    value={propCates.value}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            )}
          />
          <TextField
            margin="dense"
            label="Author"
            name="author"
            error={!!errors.author}
            helperText={errors.author && errors.author.message}
            inputRef={register}
            variant="outlined"
            fullWidth
          />
          <Controller
            name="published"
            control={control}
            render={props => (
              <React.Fragment>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={e => props.onChange(e.target.checked)}
                      checked={props.value}
                      color="primary"
                    />
                  }
                  label="Published"
                />
              </React.Fragment>
            )} // props contains: onChange, onBlur and value
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

ModalBook.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  book: PropTypes.object,
  title: PropTypes.string,
  triggerSubmit: PropTypes.func,
};

export default memo(ModalBook);
