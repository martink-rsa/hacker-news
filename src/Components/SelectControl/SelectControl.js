/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// MUI
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectControl(props) {
  const {
    selectValue,
    selectObj: { items, id, title },
  } = props;
  const classes = useStyles();
  // const [selectValue, setSelectValue] = useState(items[0].menuValue);

  /* useEffect(() => {
    props.handleSelect(selectValue);
  }, [selectValue]); */

  function handleChange(event) {
    // setSelectValue(event.target.value);
    props.handleSelect(event.target.value);
  }

  return (
    <div className={classes.root}>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id={`select-${id}-input-label`}>{title}</InputLabel>
        <Select
          labelId={`select-${id}-label`}
          id={`select-${id}`}
          value={selectValue}
          onChange={handleChange}
        >
          {items.map(item => {
            return (
              <MenuItem
                key={`mi-${Math.random() * 9999}-${Math.random() * 9999}`}
                value={item.menuValue}
              >
                {item.menuText}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

SelectControl.propTypes = {
  selectObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
