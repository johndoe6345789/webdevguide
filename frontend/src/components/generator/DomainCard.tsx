'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { ProjectDomain } from '@/lib/scaffolder';
import { DomainIconMap } from './DomainIconMap';

interface Props {
  domain: {
    id: ProjectDomain; label: string;
    description: string; icon: string;
  };
  onSelect: (domain: ProjectDomain) => void;
}

export default function DomainCard({ domain, onSelect }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        transition: 'all 0.2s',
        '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)', boxShadow: 2 },
      }}
    >
      <CardActionArea
        onClick={() => onSelect(domain.id)}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 0 }}
      >
        <CardContent sx={{ width: '100%' }}>
          <Box sx={{ color: 'primary.main', mb: 2 }}>
            {DomainIconMap[domain.icon]}
          </Box>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            {domain.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {domain.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
