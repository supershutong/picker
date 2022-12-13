import * as React from 'react';
import PanelContext from '../PanelContext';
import type {
  Locale,
} from '../interface';

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
  locale,
  children,
  sourceMode,
  sourceModeCopy
}: HeaderProps) {
  const { hideNextBtn, hidePrevBtn } = React.useContext(PanelContext);
  const sourceModeCopyVar = sourceModeCopy ? sourceModeCopy : sourceMode

  return (
    <div className={prefixCls}>
      {onSuperPrev && (
        <button
          type="button"
          onClick={onSuperPrev}
          tabIndex={-1}
          className={`${prefixCls}-super-prev-btn`}
          style={hidePrevBtn ? HIDDEN_STYLE : {}}
          title={sourceModeCopyVar === 'month' ? locale.previousDecade : sourceModeCopyVar === 'year' ? locale.previousCentury : locale.previousYear}
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
        >
          {prevIcon}
        </button>
      )}
      <div className={`${prefixCls}-view`}>{children}</div>
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          tabIndex={-1}
          className={`${prefixCls}-next-btn`}
          style={hideNextBtn ? HIDDEN_STYLE : {}}
          title={locale.nextMonth}
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
          title={sourceModeCopyVar === 'month' ? locale.nextDecade : sourceModeCopyVar === 'year' ? locale.nextCentury : locale.nextYear}
        >
          {superNextIcon}
        </button>
      )}
    </div>
  );
}

export default Header;
