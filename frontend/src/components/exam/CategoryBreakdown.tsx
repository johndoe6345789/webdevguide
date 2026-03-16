'use client';

import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const PASS_PCT = 70;
interface Props { breakdown: Record<string, { correct: number; total: number }> }

export default function CategoryBreakdown({ breakdown }: Props) {
  return (
    <>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Category Breakdown</Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell align="center">Percentage</TableCell>
              <TableCell align="right" sx={{ width: 200 }}>Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(breakdown).map(([cat, d]) => {
              const pct = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
              return (
                <TableRow key={cat}>
                  <TableCell>{cat}</TableCell>
                  <TableCell align="center">{d.correct}/{d.total}</TableCell>
                  <TableCell align="center">{pct}%</TableCell>
                  <TableCell align="right">
                    <LinearProgress variant="determinate" value={pct} color={pct >= PASS_PCT ? 'success' : 'error'} sx={{ height: 8, borderRadius: 4 }} />
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
