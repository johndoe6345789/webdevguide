'use client';

import { type RefObject } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface SearchInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  query: string;
  onQueryChange: (v: string) => void;
  loading: boolean;
  onClose: () => void;
  placeholder: string;
  hint: string;
}

const startAdornment = (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>);

export default function SearchInput(
  { inputRef, query, onQueryChange, loading,
    onClose, placeholder, hint }: SearchInputProps,
) {
  const endAdornment = (
    <InputAdornment position="end">
      {loading ? <CircularProgress size={20} /> : <IconButton size="small" onClick={onClose} aria-label="close"><CloseIcon fontSize="small" /></IconButton>}
    </InputAdornment>
  );
  return (
    <Box sx={{ p: 2, pb: 0 }}>
      <TextField inputRef={inputRef} fullWidth placeholder={placeholder} value={query} onChange={(e) => onQueryChange(e.target.value)} variant="outlined" autoComplete="off" slotProps={{ input: { startAdornment, endAdornment } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>{hint}</Typography>
    </Box>
  );
}
