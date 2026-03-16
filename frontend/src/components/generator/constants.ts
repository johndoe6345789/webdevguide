export const TYPE_OPTIONS = [
  { value: 'component', label: 'Component' },
  { value: 'page', label: 'Page' },
  { value: 'api-route', label: 'API Route' },
  { value: 'layout', label: 'Layout' },
  { value: 'form', label: 'Form' },
  { value: 'hook', label: 'Custom Hook' },
] as const;

export const PROP_TYPE_OPTIONS = [
  'string',
  'number',
  'boolean',
  'React.ReactNode',
];

export const FEATURE_OPTIONS = [
  { key: 'card', label: 'Card Layout' },
  { key: 'button', label: 'Button' },
  { key: 'state', label: 'Local State' },
];
