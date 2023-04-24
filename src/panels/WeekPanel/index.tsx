import * as React from 'react';
import classNames from 'classnames';
import DatePanel from '../DatePanel';
import type { PanelSharedProps } from '../../interface';
import { isSameWeek, isInRangeWeek } from '../../utils/dateUtil';

export type WeekPanelProps<DateType> = PanelSharedProps<DateType>;

function WeekPanel<DateType>(props: WeekPanelProps<DateType>) {
  const { prefixCls, generateConfig, locale, value, defaultValue } = props;

  // Render additional column
  const cellPrefixCls = `${prefixCls}-cell`;
  const prefixColumn = (date: DateType) => (
    <td
      key="week"
      className={classNames(cellPrefixCls, `${cellPrefixCls}-week`)}
    >
      {generateConfig.locale.getWeek(locale.locale, date)}
    </td>
  );

  let start: DateType, end: DateType;
  if (defaultValue && value) {
    if (generateConfig.isAfter(defaultValue, value)) {
      // start>end 时起止日期自动调换
      [start, end] = [value, defaultValue];
    } else {
      [start, end] = [defaultValue, value];
    }
  }

  // Add row className
  const rowPrefixCls = `${prefixCls}-week-panel-row`;
  const rowClassName = (date: DateType) =>
    classNames(rowPrefixCls, {
      [`${rowPrefixCls}-selected`]: isSameWeek(
        generateConfig,
        locale.locale,
        value,
        date,
      ),
      [`${rowPrefixCls}-start`]: isSameWeek(generateConfig, locale.locale, start, date),
      [`${rowPrefixCls}-end`]: isSameWeek(generateConfig, locale.locale, end, date),
      [`${rowPrefixCls}-in-range`]: isInRangeWeek(generateConfig, locale.locale, start, end, date),
    });

  return (
    <DatePanel
      {...props}
      panelName="week"
      prefixColumn={prefixColumn}
      rowClassName={rowClassName}
      keyboardConfig={{
        onLeftRight: null,
      }}
    />
  );
}

export default WeekPanel;
