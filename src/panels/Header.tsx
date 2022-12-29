import * as React from 'react';
import PanelContext from '../PanelContext';
import type { Locale } from '../interface';

const HIDDEN_STYLE: React.CSSProperties = {
  visibility: 'hidden',
};

export type HeaderProps = {
  prefixCls: string;

  // Icons
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  superPrevIcon?: React.ReactNode;
  superNextIcon?: React.ReactNode;

  /** Last one step */
  onPrev?: () => void;
  /** Next one step */
  onNext?: () => void;
  /** Last multiple steps */
  onSuperPrev?: () => void;
  /** Next multiple steps */
  onSuperNext?: () => void;
  /** current date */
  onCurrent?: () => void;
  showTodayBtn?: boolean;
  locale?: Locale;
  sourceMode?: string;
  sourceModeCopy?: string;

  children?: React.ReactNode;
};

function Header({
  prefixCls,
  prevIcon = '\u2039',
  nextIcon = '\u203A',
  superPrevIcon = '\u00AB',
  superNextIcon = '\u00BB',
  onSuperPrev,
  onSuperNext,
  onPrev,
  onNext,
  onCurrent,
  showTodayBtn,
  locale,
  children,
  sourceMode,
  sourceModeCopy,
}: HeaderProps) {
  const { hideNextBtn, hidePrevBtn, fieldid } = React.useContext(PanelContext);
  const sourceModeCopyVar = sourceModeCopy ? sourceModeCopy : sourceMode;

  return (
    <div className={prefixCls}>
      {onSuperPrev && (
        <button
          type="button"
          onClick={onSuperPrev}
          tabIndex={-1}
          className={`${prefixCls}-super-prev-btn`}
          style={hidePrevBtn ? HIDDEN_STYLE : {}}
          title={
            sourceModeCopyVar === 'decade'
              ? locale.previousDecade
              : sourceModeCopyVar === 'year'
              ? locale.previousCentury
              : locale.previousYear
          }
          // @ts-ignore
          fieldid={fieldid && `${fieldid}_super_prev_btn`}
        >
          {superPrevIcon}
        </button>
      )}
      {onPrev && (
        <button
          type="button"
          onClick={onPrev}
          tabIndex={-1}
          className={`${prefixCls}-prev-btn`}
          style={hidePrevBtn ? HIDDEN_STYLE : {}}
          title={locale.previousMonth}
          // @ts-ignore
          fieldid={fieldid && `${fieldid}_prev_btn`}
        >
          {prevIcon}
        </button>
      )}
      <div
        className={`${prefixCls}-view`}
        // @ts-ignore
        fieldid={fieldid && `${fieldid}_view`}
      >
        {children}
      </div>
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          tabIndex={-1}
          className={`${prefixCls}-next-btn`}
          style={hideNextBtn ? HIDDEN_STYLE : {}}
          title={locale.nextMonth}
          // @ts-ignore
          fieldid={fieldid && `${fieldid}_next_btn`}
        >
          {nextIcon}
        </button>
      )}
      {onSuperNext && (
        <button
          type="button"
          onClick={onSuperNext}
          tabIndex={-1}
          className={`${prefixCls}-super-next-btn`}
          style={hideNextBtn ? HIDDEN_STYLE : {}}
          title={
            sourceModeCopyVar === 'decade'
              ? locale.nextDecade
              : sourceModeCopyVar === 'year'
              ? locale.nextCentury
              : locale.nextYear
          }
          // @ts-ignore
          fieldid={fieldid && `${fieldid}_super_next_btn`}
        >
          {superNextIcon}
        </button>
      )}
      {showTodayBtn && (
        <button
          type="button"
          onClick={onCurrent}
          tabIndex={-1}
          className={`${prefixCls}-today-btn`}
          title={locale.today}
          // @ts-ignore
          fieldid={fieldid && `${fieldid}_header_today_btn`}
        >
          {locale.locale === 'zh-cn' ? '今' : locale.today}
        </button>
      )}
    </div>
  );
}

export default Header;
