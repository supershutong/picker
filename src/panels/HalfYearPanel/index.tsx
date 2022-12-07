import * as React from 'react';
import HalfYearHeader from '../QuarterPanel/QuarterHeader';
import HalfYearBody from './HalfYearBody';
import { createKeyDownHandler } from '../../utils/uiUtil';
import type { PanelSharedProps } from '../../interface';

export type HalfYearPanelProps<DateType> = {} & PanelSharedProps<DateType>;

function HalfYearPanel<DateType>(props: HalfYearPanelProps<DateType>) {
  const {
    prefixCls,
    operationRef,
    onViewDateChange,
    generateConfig,
    value,
    viewDate,
    onPanelChange,
    onSelect,
  } = props;

  const panelPrefixCls = `${prefixCls}-halfYear-panel`;

  // ======================= Keyboard =======================
  operationRef.current = {
    onKeyDown: (event) =>
      createKeyDownHandler(event, {
        onLeftRight: (diff) => {
          onSelect(generateConfig.addMonth(value || viewDate, diff * 6), 'key');
        },
        onCtrlLeftRight: (diff) => {
          onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
        onUpDown: (diff) => {
          onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
      }),
  };

  // ==================== View Operation ====================
  const onYearChange = (diff: number) => {
    const newDate = generateConfig.addYear(viewDate, diff);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };

  return (
    /* HalfYearHeader is the same with QuarterHeader */
    <div className={panelPrefixCls}>
      <HalfYearHeader
        {...props}
        prefixCls={prefixCls}
        onPrevYear={() => {
          onYearChange(-1);
        }}
        onNextYear={() => {
          onYearChange(1);
        }}
        onYearClick={() => {
          onPanelChange('year', viewDate);
        }}
      />
      <HalfYearBody<DateType>
        {...props}
        prefixCls={prefixCls}
        onSelect={(date) => {
          onSelect(date, 'mouse');
        }}
      />
    </div>
  );
}

export default HalfYearPanel;
