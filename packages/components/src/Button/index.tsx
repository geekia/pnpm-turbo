import React, { MouseEvent, FC,ReactNode} from 'react';

type SizeType = 'small' | 'medium' | 'large';
export const tuple = <T extends string[]>(...args: T) => args;


const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');

type ButtonType = typeof ButtonTypes[number];

interface GButtonProps {
  type?: ButtonType;
  size?: SizeType;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
  children?: ReactNode
}

const GButton: FC<GButtonProps> = (props: GButtonProps) => {
  const { htmlType = "button", disabled, onClick, children } = props;
  return <button type={htmlType} onClick={onClick} disabled={disabled} >
    {children}
  </button>
}

export default GButton