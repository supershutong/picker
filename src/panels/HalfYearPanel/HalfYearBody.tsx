import * as React from 'react';
import type { GenerateConfig } from '../../generate';
import type { Locale } from '../../interface';
import { isSameQuarter, formatValue } from '../../utils/dateUtil';
import RangeContext from '../../RangeContext';
import useCellClassName from '../../hooks/useCellClassName';
import PanelBody from '../PanelBody';
import moment, { Moment } from 'moment';

export const QUARTER_COL_COUNT = 2;
const QUARTER_ROW_COUNT = 1;

export type HalfYearBodyProps<DateType> = {
  prefixCls: string;
  locale: Locale;
  generateConfig: GenerateConfig<DateType>;
  value?: DateType | null;
  viewDate: DateType;
  halfYear?: (date: DateType) => string;
  disabledDate?: (date: DateType) => boolean;
  onSelect: (value: DateType) => void;
};

function HalfYearBody<DateType>(props: HalfYearBodyProps<DateType>) {
  const { prefixCls, locale, value, viewDate, generateConfig } = props;

  const { rangedValue, hoverRangedValue } = React.useContext(RangeContext);

  const cellPrefixCls = `${prefixCls}-cell`;

  const getCellClassName = useCellClassName({
    cellPrefixCls,
    value,
    generateConfig,
    rangedValue,
    hoverRangedValue,
    isSameCell: (current, target) => isSameQuarter(generateConfig, current, target, 'halfYear'),
    isInView: () => true,
    offsetCell: (date, offset) => generateConfig.addMonth(date, offset * 6),
  });

  // default format
  const format = (date: Moment, hasYear: boolean = true): string => {
    if (moment.isMoment(date)) {
      const year = hasYear ? date.year() + ' ' : '';
      return date.month() >= 0 && date.month() <= 5 ? `${year}上半年` : `${year}下半年`;
    }
  };

  const baseHalfYear = generateConfig.setDate(generateConfig.setMonth(viewDate, 0), 1);

  return (
    <PanelBody
      {...props}
      rowNum={QUARTER_ROW_COUNT}
      colNum={QUARTER_COL_COUNT}
      baseDate={baseHalfYear}
      getCellText={date =>
        formatValue(date, {
          locale,
          format: () => locale.halfYearFormat?.(date, false) || format(date, false),
          generateConfig,
        })
      }
      getCellClassName={getCellClassName}
      getCellDate={(date, offset) => generateConfig.addMonth(date, offset * 6)}
      titleCell={date =>
        formatValue(date, {
          locale,
          format: () => locale.halfYearFormat?.(date) || format(date),
          generateConfig,
        })
      }
    />
  );
}

export default HalfYearBody;
