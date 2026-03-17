'use client';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ViewerCopyButton from './ViewerCopyButton';

interface Props {
  path: string;
  language: string;
  isCopied: boolean;
  onCopy: () => void;
}

const rowSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 2,
};

const infoSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export default function ViewerFileHeader(
  { path, language, isCopied, onCopy }: Props,
) {
  return (
    <Box sx={rowSx}>
      <Box sx={infoSx}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          fontFamily="monospace"
        >
          {path}
        </Typography>
        <Chip
          label={language}
          size="small" variant="outlined"
        />
      </Box>
      <ViewerCopyButton
        isCopied={isCopied}
        onCopy={onCopy}
      />
    </Box>
  );
}
