import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export default function Header(props) {
  const { title } = props;

  return (
    <Typography variant="h4" align="center">
      {title}
    </Typography>
  );
}
