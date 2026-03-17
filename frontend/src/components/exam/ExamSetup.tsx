'use client';

import { useTranslations } from 'next-intl';
import History from '@mui/icons-material/History';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import BookmarkButton from '@/components/common/BookmarkButton';
import ExamHistory from '@/components/exam/ExamHistory';
import ExamInfoCards from '@/components/exam/ExamInfoCards';
import ExamSetupStats from '@/components/exam/ExamSetupStats';
import { useExamSetup } from '@/hooks/useExamSetup';

interface ExamSetupProps { onStart: () => void }

export default function ExamSetup({ onStart }: ExamSetupProps) {
  const t = useTranslations('exam');
  const { history, bestScore, avgScore } = useExamSetup();
  const hl = history.length;
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>{t('title')}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
            {t('examDescription')}
          </Typography>
        </Box>
        <BookmarkButton title={t('title')} path="/exam" section="Exam" />
      </Box>
      <ExamInfoCards />
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Button variant="contained" size="large"
          startIcon={<PlayArrow />} onClick={onStart}
          sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}>{t('startExam')}</Button>
      </Box>
      {hl > 0 && (
        <>
          <Divider sx={{ mb: 4 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <History color="action" />
            <Typography variant="h5" fontWeight={600}>{t('history')}</Typography>
          </Box>
          <ExamSetupStats totalAttempts={hl}
            bestScore={bestScore} avgScore={avgScore} />
          <ExamHistory history={history} bestScore={bestScore} />
        </>
      )}
    </>
  );
}
