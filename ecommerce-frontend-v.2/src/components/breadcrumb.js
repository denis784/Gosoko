import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  return {
    backgroundColor: theme.palette.common.white,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(theme.palette.common.white, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[5],
      backgroundColor: emphasize(theme.palette.common.white, 0.12),
    },
  };
});

const CustomBreadcrumbsContainer = styled('nav')({
  backgroundColor: '#f1f1f1',
  padding: '3px',
});


const updateCategoryName = (appName) => {
  // Word replacements
  if (appName === "cateringandevent") appName = "catering & event";
  else if (appName === "mechanic") appName = "mechanic";
  else if (appName === "beauty") appName = "beauty";
  else if (appName === "computerandit") appName = "computers & it";
  else if (appName === "transportation") appName = "Transport";
  else if (appName === "cleaning") appName = "cleaning";
  else if (appName === "computersandaccessories") appName = "computers & Accessories";
  else if (appName === "tvandaudio") appName = "tvs & Audio";
  else if (appName === "baby_items") appName = "baby items";
  else if (appName === "homeandoffice") appName = "home and office";
  else if (appName === "phoneandtablet") appName = "phones and Tablets";

  // Camel casing
  appName = appName.replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());

  return appName;
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbLinks = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = decodeURIComponent(segment).replace(/-/g, ' ');
    const updatedLabel = updateCategoryName(label);

    return (
      <StyledBreadcrumb
        key={url}
        component={Link}
        to={url}
        label={updatedLabel}
      />
    );
  });

  return (
    <CustomBreadcrumbsContainer style={{ backgroundColor: '#f1f1f1' }}>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
          <StyledBreadcrumb
            component={Link}
            to="/"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
          {breadcrumbLinks}
        </Breadcrumbs>
      </div>
    </CustomBreadcrumbsContainer>
  );
};

export default Breadcrumb;
