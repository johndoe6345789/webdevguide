import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CodeBlock from '@/components/common/CodeBlock';
import type { StepBlock } from '@/types/content';

export default function StepBlockRenderer({ step, title, body, code, language }: StepBlock) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'primary.main', color: 'primary.contrastText', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>
            {step}
          </Box>
          <Typography variant="h6" fontWeight={600}>{title}</Typography>
        </Box>
        <Typography variant="body1" sx={{ ml: 6, mb: code ? 2 : 0 }}>{body}</Typography>
        {code && <Box sx={{ ml: 6 }}><CodeBlock code={code} language={language ?? 'bash'} /></Box>}
      </CardContent>
    </Card>
  );
}
