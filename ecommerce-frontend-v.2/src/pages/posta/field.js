import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { branchesData } from './data';

function PostaAutoComplete({ onBranchChange }) {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branchSuggestions, setBranchSuggestions] = useState(branchesData.branches);

  useEffect(() => {
    // Filter branches based on user input
    if (selectedBranch === '') {
      // If input is empty, show all branches
      setBranchSuggestions(branchesData.branches);
    } else {
      const filteredBranches = branchesData.branches.filter((branch) =>
        String(branch.name).toLowerCase().includes(String(selectedBranch).toLowerCase())
      );
      setBranchSuggestions(filteredBranches);
    }
  }, [selectedBranch]);

  return (
    <Autocomplete
      id="postOffice"
      name="postOffice"
      options={branchSuggestions}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Post Office near"
          fullWidth
          variant="standard"
        />
      )}
    />
  );
}

export default PostaAutoComplete;
