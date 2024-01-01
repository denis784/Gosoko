import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/auth';
import { makeStyles } from '@mui/styles';

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  responsiveTable: {
    overflowX: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Make the table full width on small screens
    },
  },
  cell: {
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: '100%', // Make the cells full width on small screens
      marginBottom: '8px', // Add spacing between cells on small screens
    },
  },
  smallScreenCell: {
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: '100%', // Make the cells full width on small screens
      marginBottom: '4px', // Reduce spacing between cells on small screens
    },
  },
}));
function formatDate(timestamp) {
  const currentDate = new Date();
  const date = new Date(timestamp);
  const timeDifference = currentDate - date;
  const minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Calculate minutes
  const hoursDifference = Math.floor(minutesDifference / 60); // Calculate hours
  const daysDifference = Math.floor(hoursDifference / 24); // Calculate days

  if (minutesDifference < 1) {
    return 'Just now';
  } else if (minutesDifference < 60) {
    return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
  } else if (daysDifference === 1) {
    return 'Yesterday';
  } else if (daysDifference < 30) {
    return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
  } else if (daysDifference < 365) {
    const monthsDifference = Math.floor(daysDifference / 30);
    return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
  } else {
    const yearsDifference = Math.floor(daysDifference / 365);
    return `${yearsDifference} year${yearsDifference > 1 ? 's' : ''} ago`;
  }
}

function ComparisonPage() {
  const classes = useStyles();
  const { compareList } = useContext(AuthContext);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  const handleProductSelection = (event) => {
    setSelectedProductIndex(event.target.value);
  };

  const imageStyle = {
    maxWidth: '100px',
    maxHeight: '100px',
  };

  const itemKeys = Object.keys(compareList[0] || {});
  const keysToExclude = [
    'image2',
    'image3',
    'slug',
    'title',
    'image4',
    'image5',
    'image1',
    'product_serial',
  ];

  return (
    <Container component="main" maxWidth="xs">
      <TableContainer className={classes.responsiveTable}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="10px"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.cell}>Image</TableCell>
              {compareList.map((item, itemIndex) => (
                <TableCell key={itemIndex} id={`image${itemIndex}`} className={classes.cell}>
                  {item.image1 ? (
                    <img src={item.image1} alt="Product" style={imageStyle} />
                  ) : (
                    'No Image'
                  )}
                </TableCell>
              ))}
            </TableRow>
            {itemKeys
              .filter((key) => !keysToExclude.includes(key))
              .map((key, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.cell}> {key} </TableCell>
                  {compareList.map((item, itemIndex) => (
                    <TableCell key={itemIndex} id={`${key}${itemIndex}`} className={classes.smallScreenCell}>
                    {key === 'created' || key === 'updated' ? (
                      typeof item[key] === 'string' ? formatDate(item[key]) : item[key]
                    ) : (
                      key !== 'image1' && item[key] !== null && item[key] !== undefined ? (
                        typeof item[key] === 'object' && item[key].name
                          ? item[key].name
                          : item[key]
                      ) : (
                        'N/A'
                      )
                    )}
                  </TableCell>
                  
                  ))}
                </TableRow>
              ))}
            <TableRow>
              <TableCell className={classes.cell}>County</TableCell>
              {compareList.map((item, itemIndex) => (
                <TableCell key={itemIndex} className={classes.smallScreenCell}>
                  {item.region && item.region.county ? item.region.county.name : 'N/A'}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className={classes.cell}>Subcounty</TableCell>
              {compareList.map((item, itemIndex) => (
                <TableCell key={itemIndex} className={classes.smallScreenCell}>
                  {item.region && item.region.subcounty ? item.region.subcounty.name : 'N/A'}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className={classes.cell}>Region</TableCell>
              {compareList.map((item, itemIndex) => (
                <TableCell key={itemIndex} className={classes.smallScreenCell}>
                  {item.region ? item.region.name : 'N/A'}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ComparisonPage;
