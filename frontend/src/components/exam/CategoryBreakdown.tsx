'use client';

import { useTranslations } from 'next-intl';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const PS = 70; type BD = Record<string, { correct: number; total: number }>;
interface Props { breakdown: BD }

export default function CategoryBreakdown({ breakdown }: Props) {
  const t = useTranslations('exam');
  return (
    <>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>{t('categoryBreakdown')}</Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t('category')}</TableCell>
              <TableCell align="center">{t('score')}</TableCell>
              <TableCell align="center">{t('percentage')}</TableCell>
              <TableCell align="right" sx={{ width: 200 }}>{t('progress')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(breakdown).map(([cat, d]) => {
              const pct = d.total ? Math.round(d.correct * 100 / d.total) : 0;
              const scoreLabel = `${d.correct}${t('separator')}${d.total}`;
              const pctLabel = `${pct}${t('percentSign')}`;
              return (
                <TableRow key={cat}>
                  <TableCell>{cat}</TableCell>
                  <TableCell align="center">{scoreLabel}</TableCell>
                  <TableCell align="center">{pctLabel}</TableCell>
                  <TableCell align="right">
                    <LinearProgress variant="determinate" value={pct} color={pct >= PS ? 'success' : 'error'} sx={{ height: 8, borderRadius: 4 }} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
