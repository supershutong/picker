import * as React from 'react';
import type { PanelMode } from '../interface';

export function getExtraHeader(
  prefixCls: string,
  mode: PanelMode,
  renderExtraHeader?: (mode: PanelMode) => React.ReactNode,
) {
  if (!renderExtraHeader) {
    return null;
  }

  return <div className={`${prefixCls}-header-extra`}>{renderExtraHeader(mode)}</div>;
}

export function getExtraFooter(
  prefixCls: string,
  mode: PanelMode,
  renderExtraFooter?: (mode: PanelMode) => React.ReactNode,
) {
  if (!renderExtraFooter) {
    return null;
  }

  return <div className={`${prefixCls}-footer-extra`}>{renderExtraFooter(mode)}</div>;
}
