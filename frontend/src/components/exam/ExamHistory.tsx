'use client';

import { useTranslations } from 'next-intl';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { ExamAttempt } from '@/store/slices/examSlice';

interface ExamHistoryProps {
  history: ExamAttempt[];
  bestScore: number;
}

export default function ExamHistory({ history, bestScore }: ExamHistoryProps) {
  const t = useTranslations('exam');
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('attempt')}</TableCell>
            <TableCell>{t('date')}</TableCell>
            <TableCell align="center">{t('score')}</TableCell>
            <TableCell align="center">{t('result')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((a, idx) => {
            const attemptNum = `${t('hashPrefix')}${history.length - idx}`;
            const scoreLabel = `${a.score}${t('separator')}${a.total} (${a.percentage}${t('percentSign')})`;
            return (
              <TableRow key={a.id} sx={{ bgcolor: a.percentage === bestScore ? 'action.hover' : 'transparent' }}>
                <TableCell>{attemptNum}</TableCell>
                <TableCell>
                  {new Date(a.completedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </TableCell>
                <TableCell align="center">{scoreLabel}</TableCell>
                <TableCell align="center">
                  <Chip label={a.passed ? t('pass') : t('fail')} color={a.passed ? 'success' : 'error'} size="small" variant="outlined" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
