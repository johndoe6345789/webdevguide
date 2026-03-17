'use client';
import { useTranslations } from 'next-intl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type {
  SettingsCardProps,
} from './generatorTypes';
import ProjectNameField from './ProjectNameField';
import {
  SELECTS, TRANS_KEYS, CONTENT_SX,
} from './settingsData';
import SettingsSelectList from './SettingsSelectList';

export default function ProjectSettingsCard({
  scaffolder, onUpdateConfig,
}: SettingsCardProps) {
  const t = useTranslations('generator');
  const items = SELECTS.map((s) => ({
    key: s.key,
    label: t(TRANS_KEYS[s.key]),
    value: scaffolder[s.key],
    options: s.opts,
  }));
  return (
    <Card variant="outlined">
      <CardContent sx={CONTENT_SX}>
        <Typography
          variant="h6" fontWeight={600}
        >
          {t('projectSettings')}
        </Typography>
        <ProjectNameField
          value={scaffolder.projectName}
          onChange={(v) => onUpdateConfig({
            projectName: v,
          })}
        />
        <SettingsSelectList
          selects={items}
          onChange={(k, v) => onUpdateConfig({
            [k]: v,
          })}
        />
      </CardContent>
    </Card>
  );
}
