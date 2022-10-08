import React, { MouseEvent, FC, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import './button.less';

type SizeType = 'small' | 'middle' | 'large';

export const tuple = <T extends string[]>(...args: T) => args;

const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');
export type ButtonType = typeof ButtonTypes[number];

const ButtonShapes = tuple('default', 'circle', 'round');
export type ButtonShape = typeof ButtonShapes[number];

const ButtonHtmlTypes= tuple('button','submit','reset');
export type ButtonHtmlType = typeof ButtonHtmlTypes[number];

const getPrefixCls = (name:string, prefixCls?:string) => {
  return `${prefixCls ?? 'g'}-${name}`;
}

interface GButtonProps {
  type?: ButtonType;
  size?: SizeType;
  disabled?: boolean;
  loading?: boolean;
  htmlType?: ButtonHtmlType;
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: CSSProperties;
  shape?: ButtonShape;
  prefixCls?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: ReactNode;
}
// type -> shape -> size -> loading -> disabled
const GButton: FC<GButtonProps> = (props: GButtonProps) => {
  const { prefixCls: customizePrefixCls, htmlType, disabled, onClick, children, type='default',className,shape,size, ...rest } = props;

  const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined };
  const sizeFullName = size;
  const sizeCls = sizeFullName ? sizeClassNameMap[sizeFullName] || '' : '';

  const prefixCls = getPrefixCls("btn",customizePrefixCls);

  const classes = classNames(prefixCls,{
    [`${prefixCls}-${shape}`]: shape !== 'default' && shape, 
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${sizeCls}`]: sizeCls,

    // [`${prefixCls}-disabled`]: linkButtonRestProps.href !== undefined && mergedDisabled,
  },className)
  console.log(children)

  const handleClick = () => {

  }

  // const iconNode = ();

  const buttonNode = (
    <button
      {...(rest as GButtonProps)}
      type={htmlType}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
    >
      {/* {iconNode} */}
      {/* {kids} */}
      <span>{children}</span>
    </button>
  );

  return <>
    {buttonNode}
  </>
}

export default GButton