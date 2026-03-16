'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function BottomCta() {
  return (
    <>
      <Divider sx={{ my: 6 }} />
      <Card variant="outlined" sx={{ textAlign: 'center', p: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Want to Learn More?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
            The Code Generator creates starter templates. Check out the guides to learn how
            each piece works and how to build on top of the generated code.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" href="/fundamentals">React Fundamentals</Button>
            <Button variant="outlined" size="large" href="/examples">See Full Examples</Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
