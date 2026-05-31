import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Panel from './Panel';

const meta = {
  title: 'BlueRaster/Panel',
  component: Panel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopLeft: Story = {
  args: {
    position: 'topLeft',
    children: <></>,
  },
};
export const BottomLeft: Story = {
  args: { position: 'bottomLeft', children: <></> },
};
export const BottomRight: Story = {
  args: { position: 'bottomRight', children: <></> },
};
export const TopRight: Story = {
  args: { position: 'topRight', children: <></> },
};

