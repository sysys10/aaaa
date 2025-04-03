
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      description: '에러 상태',
      defaultValue: false,
    },
    message: {
      control: 'text',
      description: '도움말 메시지',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
    },
    label: {
      control: 'text',
      description: '입력란 레이블',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      defaultValue: false,
    },
    className: {
      control: 'text',
      description: '추가 클래스명',
    },
    onChange: {
      action: 'changed',
      description: '값 변경 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 기본 인풋 스토리
export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

// 레이블이 있는 인풋 스토리
export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

// 에러 상태 인풋 스토리
export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    error: true,
    errorMessage: '올바른 이메일 형식이 아닙니다',
  },
};

// 도움말이 있는 인풋 스토리
export const WithHelperText: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    message: '8자 이상, 영문, 숫자, 특수문자 조합',
    type: 'password',
  },
};

// 비활성화 인풋 스토리
export const Disabled: Story = {
  args: {
    label: '사용자 ID',
    placeholder: '사용자 ID',
    disabled: true,
  },
};
