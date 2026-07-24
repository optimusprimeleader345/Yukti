import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Sparkles, ArrowRight } from 'lucide-react';

export const DesignSystemPreview: React.FC = () => {
  return (
    <div style={{ padding: 'var(--space-12)', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h1" className="text-gradient" style={{ marginBottom: 'var(--space-12)' }}>
        Nexora AI Design System
      </Typography>

      <section style={{ marginBottom: 'var(--space-12)' }}>
        <Typography variant="h2">Typography</Typography>
        <Card variant="glass" padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Typography variant="h1">Heading 1: The quick brown fox</Typography>
          <Typography variant="h2">Heading 2: The quick brown fox</Typography>
          <Typography variant="h3">Heading 3: The quick brown fox</Typography>
          <Typography variant="h4">Heading 4: The quick brown fox</Typography>
          <Typography variant="body">Body: Nexora AI provides unparalleled insights into your engineering workflows. Understand your code, discover what matters, and build better software faster.</Typography>
          <Typography variant="small">Small: This is smaller text, often used for captions or secondary information.</Typography>
          <Typography variant="muted">Muted: This text is de-emphasized to reduce visual clutter.</Typography>
        </Card>
      </section>

      <section style={{ marginBottom: 'var(--space-12)' }}>
        <Typography variant="h2">Buttons</Typography>
        <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
          <Card padding="md" style={{ flex: 1, minWidth: '300px' }}>
            <Typography variant="h4" style={{ marginBottom: 'var(--space-4)' }}>Variants</Typography>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </Card>
          <Card padding="md" style={{ flex: 1, minWidth: '300px' }}>
            <Typography variant="h4" style={{ marginBottom: 'var(--space-4)' }}>Sizes & States</Typography>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" isLoading>Loading</Button>
              <Button variant="secondary" size="icon"><Sparkles size={18} /></Button>
            </div>
          </Card>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--space-12)' }}>
        <Typography variant="h2">Cards & Surfaces</Typography>
        <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
          <Card padding="lg" style={{ flex: 1, minWidth: '300px' }}>
            <Typography variant="h3">Default Card</Typography>
            <Typography variant="body" style={{ margin: 'var(--space-4) 0' }}>
              Standard surface for content. Uses subtle borders and shadows to establish hierarchy without overwhelming the user.
            </Typography>
            <Button variant="secondary">Learn More <ArrowRight size={16} /></Button>
          </Card>
          
          <Card variant="glass" padding="lg" style={{ flex: 1, minWidth: '300px' }}>
            <Typography variant="h3">Glass Card</Typography>
            <Typography variant="body" style={{ margin: 'var(--space-4) 0' }}>
              Premium translucent surface for overlapping content. Creates a sense of depth and modernity.
            </Typography>
            <Button variant="primary">Get Started <Sparkles size={16} /></Button>
          </Card>
        </div>
      </section>
      
      <section style={{ marginBottom: 'var(--space-12)' }}>
        <Typography variant="h2">Colors</Typography>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <div style={{ width: '100px', height: '100px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)' }}></div>
          <div style={{ width: '100px', height: '100px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)' }}></div>
          <div style={{ width: '100px', height: '100px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)' }}></div>
          <div style={{ width: '100px', height: '100px', background: 'var(--accent-primary)', borderRadius: 'var(--radius-md)' }}></div>
          <div style={{ width: '100px', height: '100px', background: 'var(--accent-secondary)', borderRadius: 'var(--radius-md)' }}></div>
        </div>
      </section>
    </div>
  );
};
