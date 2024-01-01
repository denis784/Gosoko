return (
  <Grid container spacing={2}>
    {/* Filter section */}
    <Grid item xs={3}>
      <FilterSection>
        <FilterTitle>Filters</FilterTitle>

        {/* Appname filter */}
        <FilterTitle>Appname</FilterTitle>
        {appnames &&
          appnames
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((appname) => (
              <FilterItem key={appname.name}>
                <FilterCheckbox
                  type="checkbox"
                  onChange={(e) => handleAppnameChange(e, appname.name)}
                  checked={selectedAppnames.has(appname.name)}
                />
                <FilterLabel>{updateCategoryName(appname.name)}</FilterLabel>
              </FilterItem>
            ))}

        {/* Category filter */}
        <FilterTitle>Category</FilterTitle>
        {categories &&
          categories.map((category) => (
            <FilterItem key={category.name}>
              <FilterCheckbox
                type="checkbox"
                onChange={(e) => handleCategoryChange(e, category.name)}
                checked={selectedCategories.has(category.name)}
              />
              <FilterLabel>{category.name}</FilterLabel>
            </FilterItem>
          ))}

        {/* Subcategory filter */}
        <FilterTitle>Subcategory</FilterTitle>
        {subcategories &&
          subcategories.map((subcategory) => (
            <FilterItem key={subcategory.name}>
              <FilterCheckbox
                type="checkbox"
                onChange={(e) => handleSubcategoryChange(e, subcategory.name)}
                checked={selectedSubcategories.has(subcategory.name)}
              />
              <FilterLabel>{subcategory.name}</FilterLabel>
            </FilterItem>
          ))}

        {/* Type filter */}
        <FilterTitle>Type</FilterTitle>
        {types &&
          types.map((type) => (
            <FilterItem key={type.name}>
              <FilterCheckbox
                type="checkbox"
                onChange={(e) => handleTypeChange(e, type.name)}
                checked={selectedTypes.has(type.name)}
              />
              <FilterLabel>{type.name}</FilterLabel>
            </FilterItem>
          ))}

        {/* Brand filter */}
        <FilterTitle>Brand</FilterTitle>
        {brands &&
          brands
            .filter((brand) => brand?.name !== 'Unknown')
            .map((brand) => (
              <FilterItem key={brand.name}>
                <FilterCheckbox
                  type="checkbox"
                  onChange={(e) => handleBrandChange(e, brand?.name)}
                  checked={selectedBrands.has(brand.name)}
                  id={brand?.name}
                />
                <FilterLabel htmlFor={brand?.name}>{brand?.name}</FilterLabel>
              </FilterItem>
            ))}

        {/* Filter section button */}
        <FilterSectionButton
          variant="contained"
          color="primary"
          onClick={handleFilterSubmit}
        >
          Apply Filters
        </FilterSectionButton>
      </FilterSection>
    </Grid>

    {/* Product list */}
    <Grid item xs={9}>
      <Box sx={{ p: 2 }}>
        {products.length > 0 ? (
          <Grid container spacing={2}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">
            The product you are searching for is unavailable.
          </Typography>
        )}
      </Box>
    </Grid>
  </Grid>
);
