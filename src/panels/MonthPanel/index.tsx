import * as React from 'react';
import MonthHeader from './MonthHeader';
import type { MonthCellRender } from './MonthBody';
import MonthBody, { MONTH_COL_COUNT } from './MonthBody';
import type { PanelSharedProps } from '../../interface';
import { createKeyDownHandler } from '../../utils/uiUtil';

export type MonthPanelProps<DateType> = {
  monthCellContentRender?: MonthCellRender<DateType>;
  headerSelect?: any;
} & PanelSharedProps<DateType>;

function MonthPanel<DateType>(props: MonthPanelProps<DateType>) {
  const {
    prefixCls,
    operationRef,
    onViewDateChange,
    generateConfig,
    value,
    viewDate,
    onPanelChange,
    onSelect,
    sourceMode,
    diffValue,
    headerSelect,
    showSelectMask,
  } = props;

  const panelPrefixCls = `${prefixCls}-month-panel`;

  // ======================= Keyboard =======================
  operationRef.current = {
    onKeyDown: (event) =>
      createKeyDownHandler(event, {
        onLeftRight: (diff) => {
          onSelect(generateConfig.addMonth(value || viewDate, diff), 'key');
        },
        onCtrlLeftRight: (diff) => {
          onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
        onUpDown: (diff) => {
          onSelect(generateConfig.addMonth(value || viewDate, diff * MONTH_COL_COUNT), 'key');
        },
        onEnter: () => {
          onPanelChange('date', value || viewDate);
        },
      }),
  };

  // ==================== View Operation ====================
  const onYearChange = (diff: number) => {
    const newDate = generateConfig.addYear(viewDate, diff);
    onViewDateChange(newDate);
    onPanelChange(null, newDate, 'year', diff);
  };
  const [sourceModeCopy, setSourceModeCopy] = React.useState<any>(sourceMode);
  React.useEffect(() => {
    if (sourceMode && sourceMode === 'year') {
      setSourceModeCopy('decade1');
    }
  }, [sourceMode]);

  React.useEffect(() => {
    if (diffValue) {
      onYearChange(diffValue[0]);
    }
  }, [diffValue]);

  return (
    <div className={panelPrefixCls}>
      <MonthHeader
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
        sourceModeCopy={sourceModeCopy}
      />
      <MonthBody<DateType>
        {...props}
        prefixCls={prefixCls}
        onSelect={(date) => {
          onSelect(date, 'mouse');
          onPanelChange('date', date);
        }}
      />
      {headerSelect != undefined && showSelectMask ? (
        <div
          style={{
            opacity: '0.5',
            width: '100%',
            height: '100%',
            background: '#fff',
            position: 'absolute',
            left: 0,
            zIndex: '100',
          }}
        />
      ) : null}
    </div>
  );
}

export default MonthPanel;
