import classNames from 'classnames';
import * as React from 'react';
import type { Components, RangeList, Locale } from '../interface';

export type RangesProps = {
  prefixCls: string;
  fieldid?: string;
  activePresetLabel?: string;
  rangeList?: RangeList;
  components?: Components;
  needConfirmButton: boolean;
  onNow?: null | (() => void) | false;
  onOk?: null | (() => void) | false;
  okDisabled?: boolean;
  showNow?: boolean;
  locale: Locale;
};

export default function getRanges({
  prefixCls,
  fieldid,
  activePresetLabel,
  rangeList = [],
  components = {},
  needConfirmButton,
  onNow,
  onOk,
  okDisabled,
  showNow,
  locale,
}: RangesProps) {
  let presetNode: React.ReactNode;
  let okNode: React.ReactNode;

  if (rangeList.length) {
    const Item = (components.rangeItem || 'span') as any;

    presetNode = (
      <>
        {rangeList.map(({ label, onClick, onMouseEnter, onMouseLeave }) => (
          <li
            // @ts-ignore
            fieldid={fieldid && ''.concat(fieldid, '-', label)}
            key={label}
            className={classNames(`${prefixCls}-preset`, {
              [`${prefixCls}-preset-active`]: activePresetLabel === label,
            })}
          >
            <Item onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              {label}
            </Item>
          </li>
        ))}
      </>
    );
  }

  if (needConfirmButton) {
    const Button = (components.button || 'button') as any;

    if (onNow && !presetNode && showNow !== false) {
      presetNode = (
        <li
          className={`${prefixCls}-now`}
          // @ts-ignore
          fieldid={fieldid && ''.concat(fieldid, '-now')}
        >
          <a className={`${prefixCls}-now-btn`} onClick={onNow}>
            {locale.now}
          </a>
        </li>
      );
    }

    okNode = needConfirmButton && (
      <li
        className={`${prefixCls}-ok`}
        // @ts-ignore
        fieldid={fieldid && ''.concat(fieldid, '-ok')}
      >
        <Button disabled={okDisabled} onClick={onOk}>
          {locale.ok}
        </Button>
      </li>
    );
  }

  if (!presetNode && !okNode) {
    return null;
  }

  return (
    <ul
      className={`${prefixCls}-ranges`}
      // @ts-ignore
      fieldid={fieldid && ''.concat(fieldid, '-ranges')}
    >
      {presetNode}
      {okNode}
    </ul>
  );
}
