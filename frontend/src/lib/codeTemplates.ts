import type { GeneratorConfig } from '@/store/slices/generatorSlice';

export function generateComponent(config: GeneratorConfig): string {
  const { componentName, useTypeScript, useMui, useRedux, props, features } = config;
  const lines: string[] = [];

  lines.push("'use client';");
  lines.push('');

  if (useMui) {
    lines.push("import Box from '@mui/material/Box';");
    lines.push("import Typography from '@mui/material/Typography';");
    if (features.includes('card')) {
      lines.push("import Card from '@mui/material/Card';");
      lines.push("import CardContent from '@mui/material/CardContent';");
    }
    if (features.includes('button')) {
      lines.push("import Button from '@mui/material/Button';");
    }
  }

  if (useRedux) {
    lines.push("import { useAppSelector, useAppDispatch } from '@/store/hooks';");
  }

  lines.push('');

  if (useTypeScript && props.length > 0) {
    lines.push(`interface ${componentName}Props {`);
    props.forEach((p) => {
      lines.push(`  ${p.name}${p.required ? '' : '?'}: ${p.type};`);
    });
    lines.push('}');
    lines.push('');
  }

  const propsParam = props.length > 0
    ? `{ ${props.map((p) => p.defaultValue ? `${p.name} = ${p.defaultValue}` : p.name).join(', ')} }${useTypeScript ? `: ${componentName}Props` : ''}`
    : '';

  lines.push(`export default function ${componentName}(${propsParam}) {`);

  if (useRedux) {
    lines.push('  const dispatch = useAppDispatch();');
    lines.push('');
  }

  if (features.includes('state')) {
    lines.push("  const [value, setValue] = React.useState('');");
    lines.push('');
    lines.splice(1, 0, "import React, { useState } from 'react';");
  }

  lines.push('  return (');

  if (features.includes('card') && useMui) {
    lines.push('    <Card>');
    lines.push('      <CardContent>');
    lines.push(`        <Typography variant="h6" gutterBottom>`);
    lines.push(`          ${componentName}`);
    lines.push('        </Typography>');
    if (props.length > 0) {
      lines.push('        <Box>');
      props.forEach((p) => {
        lines.push(`          <Typography>{${p.name}}</Typography>`);
      });
      lines.push('        </Box>');
    }
    if (features.includes('button')) {
      lines.push(`        <Button variant="contained">Click Me</Button>`);
    }
    lines.push('      </CardContent>');
    lines.push('    </Card>');
  } else if (useMui) {
    lines.push('    <Box>');
    lines.push(`      <Typography variant="h6">${componentName}</Typography>`);
    if (props.length > 0) {
      props.forEach((p) => {
        lines.push(`      <Typography>{${p.name}}</Typography>`);
      });
    }
    if (features.includes('button')) {
      lines.push('      <Button variant="contained">Click Me</Button>');
    }
    lines.push('    </Box>');
  } else {
    lines.push('    <div>');
    lines.push(`      <h2>${componentName}</h2>`);
    if (props.length > 0) {
      props.forEach((p) => {
        lines.push(`      <p>{${p.name}}</p>`);
      });
    }
    lines.push('    </div>');
  }

  lines.push('  );');
  lines.push('}');

  return lines.join('\n');
}

export function generatePage(config: GeneratorConfig): string {
  const { componentName, useMui } = config;
  const lines: string[] = [];

  lines.push("'use client';");
  lines.push('');

  if (useMui) {
    lines.push("import Box from '@mui/material/Box';");
    lines.push("import Container from '@mui/material/Container';");
    lines.push("import Typography from '@mui/material/Typography';");
  }

  lines.push('');
  lines.push(`export default function ${componentName}Page() {`);
  lines.push('  return (');

  if (useMui) {
    lines.push('    <Container maxWidth="lg" sx={{ py: 4 }}>');
    lines.push(`      <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>`);
    lines.push(`        ${componentName}`);
    lines.push('      </Typography>');
    lines.push('      <Box>');
    lines.push('        {/* Your page content here */}');
    lines.push('      </Box>');
    lines.push('    </Container>');
  } else {
    lines.push('    <main>');
    lines.push(`      <h1>${componentName}</h1>`);
    lines.push('      {/* Your page content here */}');
    lines.push('    </main>');
  }

  lines.push('  );');
  lines.push('}');

  return lines.join('\n');
}

export function generateApiRoute(_config: GeneratorConfig): string {
  const lines: string[] = [];

  lines.push("import { NextResponse } from 'next/server';");
  lines.push('');
  lines.push('export async function GET() {');
  lines.push('  return NextResponse.json({ message: "Hello from the API" });');
  lines.push('}');
  lines.push('');
  lines.push('export async function POST(request: Request) {');
  lines.push('  const body = await request.json();');
  lines.push('  return NextResponse.json({ received: body });');
  lines.push('}');

  return lines.join('\n');
}

export function generateHook(config: GeneratorConfig): string {
  const { componentName } = config;
  const hookName = componentName.startsWith('use') ? componentName : `use${componentName}`;
  const lines: string[] = [];

  lines.push("import { useState, useCallback } from 'react';");
  lines.push('');
  lines.push(`export default function ${hookName}() {`);
  lines.push("  const [loading, setLoading] = useState(false);");
  lines.push("  const [error, setError] = useState<string | null>(null);");
  lines.push('');
  lines.push('  const execute = useCallback(async () => {');
  lines.push('    setLoading(true);');
  lines.push('    setError(null);');
  lines.push('    try {');
  lines.push('      // Your logic here');
  lines.push('    } catch (err) {');
  lines.push("      setError(err instanceof Error ? err.message : 'An error occurred');");
  lines.push('    } finally {');
  lines.push('      setLoading(false);');
  lines.push('    }');
  lines.push('  }, []);');
  lines.push('');
  lines.push('  return { loading, error, execute };');
  lines.push('}');

  return lines.join('\n');
}

export function generateLayout(config: GeneratorConfig): string {
  const { componentName, useMui } = config;
  const lines: string[] = [];

  if (useMui) {
    lines.push("import Box from '@mui/material/Box';");
    lines.push("import Container from '@mui/material/Container';");
    lines.push('');
  }

  lines.push(`export default function ${componentName}Layout({`);
  lines.push('  children,');
  lines.push('}: {');
  lines.push('  children: React.ReactNode;');
  lines.push('}) {');
  lines.push('  return (');

  if (useMui) {
    lines.push('    <Box sx={{ display: "flex", minHeight: "100vh" }}>');
    lines.push('      <Box component="nav" sx={{ width: 240, flexShrink: 0 }}>');
    lines.push('        {/* Sidebar content */}');
    lines.push('      </Box>');
    lines.push('      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>');
    lines.push('        {children}');
    lines.push('      </Container>');
    lines.push('    </Box>');
  } else {
    lines.push('    <div style={{ display: "flex", minHeight: "100vh" }}>');
    lines.push('      <nav>{/* Sidebar */}</nav>');
    lines.push('      <main>{children}</main>');
    lines.push('    </div>');
  }

  lines.push('  );');
  lines.push('}');

  return lines.join('\n');
}

export function generateForm(config: GeneratorConfig): string {
  const { componentName, useMui, useTypeScript, props } = config;
  const lines: string[] = [];

  lines.push("'use client';");
  lines.push('');
  lines.push("import { useState } from 'react';");

  if (useMui) {
    lines.push("import Box from '@mui/material/Box';");
    lines.push("import Button from '@mui/material/Button';");
    lines.push("import TextField from '@mui/material/TextField';");
    lines.push("import Typography from '@mui/material/Typography';");
  }

  lines.push('');

  if (useTypeScript) {
    lines.push(`interface ${componentName}Data {`);
    props.forEach((p) => {
      lines.push(`  ${p.name}: ${p.type};`);
    });
    if (props.length === 0) {
      lines.push('  email: string;');
      lines.push('  message: string;');
    }
    lines.push('}');
    lines.push('');
  }

  lines.push(`export default function ${componentName}() {`);

  const fields = props.length > 0 ? props : [
    { name: 'email', type: 'string', required: true, defaultValue: "''" },
    { name: 'message', type: 'string', required: true, defaultValue: "''" },
  ];

  lines.push(`  const [formData, setFormData] = useState${useTypeScript ? `<${componentName}Data>` : ''}({`);
  fields.forEach((f) => {
    lines.push(`    ${f.name}: ${f.defaultValue || "''"},`);
  });
  lines.push('  });');
  lines.push('');

  lines.push(`  const handleSubmit = (e${useTypeScript ? ': React.FormEvent' : ''}) => {`);
  lines.push('    e.preventDefault();');
  lines.push('    console.log(formData);');
  lines.push('  };');
  lines.push('');

  lines.push('  return (');

  if (useMui) {
    lines.push('    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>');
    lines.push(`      <Typography variant="h6">${componentName}</Typography>`);
    fields.forEach((f) => {
      lines.push(`      <TextField label="${f.name}" value={formData.${f.name}} onChange={(e) => setFormData({ ...formData, ${f.name}: e.target.value })} required={${f.required}} />`);
    });
    lines.push('      <Button type="submit" variant="contained">Submit</Button>');
    lines.push('    </Box>');
  } else {
    lines.push('    <form onSubmit={handleSubmit}>');
    lines.push(`      <h2>${componentName}</h2>`);
    fields.forEach((f) => {
      lines.push(`      <input placeholder="${f.name}" value={formData.${f.name}} onChange={(e) => setFormData({ ...formData, ${f.name}: e.target.value })} />`);
    });
    lines.push('      <button type="submit">Submit</button>');
    lines.push('    </form>');
  }

  lines.push('  );');
  lines.push('}');

  return lines.join('\n');
}

export function generateTestFile(config: GeneratorConfig): string {
  const { componentName } = config;
  const lines: string[] = [];

  lines.push("import { render, screen } from '@testing-library/react';");
  lines.push(`import ${componentName} from './${componentName}';`);
  lines.push('');
  lines.push(`describe('${componentName}', () => {`);
  lines.push(`  it('renders without crashing', () => {`);
  lines.push(`    render(<${componentName} />);`);
  lines.push(`    expect(screen.getByText('${componentName}')).toBeInTheDocument();`);
  lines.push('  });');
  lines.push('});');

  return lines.join('\n');
}
