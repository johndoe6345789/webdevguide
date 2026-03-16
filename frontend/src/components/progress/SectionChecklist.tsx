import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SectionRow from './SectionRow';

interface Section {
  id: string;
  title: string;
  href: string;
}

interface SectionChecklistProps {
  sections: Section[];
  completedIds: string[];
}

export default function SectionChecklist({ sections, completedIds }: SectionChecklistProps) {
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ px: 2, py: 1.5, bgcolor: 'action.hover' }}>
          <Typography variant="h6" fontWeight={600}>Section Checklist</Typography>
        </Box>
        {sections.map((s) => (
          <SectionRow key={s.id} title={s.title} href={s.href} completed={completedIds.includes(s.id)} />
        ))}
      </CardContent>
    </Card>
  );
}
