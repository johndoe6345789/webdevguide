'use client';

import TimerIcon from '@mui/icons-material/Timer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useCountdown from '@/hooks/useCountdown';

interface ExamTimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

export default function ExamTimer({ timeRemaining, onTimeUp }: ExamTimerProps) {
  const { formatted, isLowTime } = useCountdown(timeRemaining, onTimeUp);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 2, bgcolor: isLowTime ? 'error.50' : 'action.hover', border: 1, borderColor: isLowTime ? 'error.main' : 'divider' }}>
      <TimerIcon fontSize="small" color={isLowTime ? 'error' : 'action'} />
      <Box>
        <Typography variant="caption" color="text.secondary" display="block" lineHeight={1}>Time Remaining</Typography>
        <Typography variant="subtitle1" fontWeight={700} color={isLowTime ? 'error.main' : 'text.primary'} lineHeight={1.2} role="timer">{formatted}</Typography>
      </Box>
    </Box>
  );
}
