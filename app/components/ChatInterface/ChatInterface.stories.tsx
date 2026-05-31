import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ChatInterface from './ChatInterface';

const meta = {
  title: 'BlueRaster/ChatInterface',
  component: ChatInterface,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChatInterface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <></>,
  },
};
