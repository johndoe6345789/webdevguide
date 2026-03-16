'use client';

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
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Attempt</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="center">Score</TableCell>
            <TableCell align="center">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((a, idx) => (
            <TableRow key={a.id} sx={{ bgcolor: a.percentage === bestScore ? 'action.hover' : 'transparent' }}>
              <TableCell>#{history.length - idx}</TableCell>
              <TableCell>
                {new Date(a.completedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </TableCell>
              <TableCell align="center">{a.score}/{a.total} ({a.percentage}%)</TableCell>
              <TableCell align="center">
                <Chip label={a.passed ? 'PASS' : 'FAIL'} color={a.passed ? 'success' : 'error'} size="small" variant="outlined" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
