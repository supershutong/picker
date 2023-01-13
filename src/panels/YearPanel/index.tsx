import * as React from 'react';
import YearHeader from './YearHeader';
import YearBody, { YEAR_COL_COUNT } from './YearBody';
import type { PanelSharedProps, PanelMode } from '../../interface';
import { createKeyDownHandler } from '../../utils/uiUtil';

export type YearPanelProps<DateType> = {
  sourceMode: PanelMode;
  headerSelect?: any;
  showSelectMask?: boolean;
} & PanelSharedProps<DateType>;

export const YEAR_DECADE_COUNT = 10;

function YearPanel<DateType>(props: YearPanelProps<DateType>) {
  const {
    prefixCls,
    operationRef,
    onViewDateChange,
    generateConfig,
    value,
    viewDate,
    sourceMode,
    onSelect,
    onPanelChange,
    diffValue,
    headerSelect,
    showSelectMask,
  } = props;

  const panelPrefixCls = `${prefixCls}-year-panel`;

  // ======================= Keyboard =======================
  operationRef.current = {
    onKeyDown: (event) =>
      createKeyDownHandler(event, {
        onLeftRight: (diff) => {
          onSelect(generateConfig.addYear(value || viewDate, diff), 'key');
        },
        onCtrlLeftRight: (diff) => {
          onSelect(generateConfig.addYear(value || viewDate, diff * YEAR_DECADE_COUNT), 'key');
        },
        onUpDown: (diff) => {
          onSelect(generateConfig.addYear(value || viewDate, diff * YEAR_COL_COUNT), 'key');
        },
        onEnter: () => {
          onPanelChange('month', value || viewDate);
        },
      }),
  };

  // ==================== View Operation ====================
  const onDecadeChange = (diff: number) => {
    const newDate = generateConfig.addYear(viewDate, diff * 10);
    onViewDateChange(newDate);
    onPanelChange(null, newDate, 'year', diff);
  };

  const [sourceModeCopy, setSourceModeCopy] = React.useState<PanelMode>(sourceMode);
  React.useEffect(() => {
    if (
      sourceMode &&
      ['date', 'week', 'quarter', 'year', 'halfYear', 'month'].includes(sourceMode)
    ) {
      setSourceModeCopy('decade');
    }
  }, [sourceMode]);

  React.useEffect(() => {
    if (diffValue) {
      onDecadeChange(diffValue[0]);
    }
  }, [diffValue]);

  return (
    <div className={panelPrefixCls}>
      <YearHeader
        {...props}
        prefixCls={prefixCls}
        onPrevDecade={() => {
          onDecadeChange(-1);
        }}
        onNextDecade={() => {
          onDecadeChange(1);
        }}
        onDecadeClick={() => {
          onPanelChange('decade', viewDate);
        }}
        sourceModeCopy={sourceModeCopy}
      />
      <YearBody
        {...props}
        prefixCls={prefixCls}
        onSelect={(date) => {
          onPanelChange('month', date);
          onSelect(date, 'mouse');
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

export default YearPanel;
