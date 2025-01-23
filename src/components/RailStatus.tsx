import React from 'react';
import { css } from '@emotion/css';
import { Tooltip } from '@grafana/ui';
// Define the type for options


interface RailStatusProps {
  rail: any;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  options: any;
  getBaseUrlByType: (type: string) => string;
}

export const RailStatus: React.FC<RailStatusProps> = ({ rail, size = 'md', showName = false, options, getBaseUrlByType }) => {
  // Determine the size of the square based on the size prop
  const xSize = size === 'sm' ? `${options.railSize * 2 }px` : size === 'md' ? `${options.railSize}px` : `${options.railSize * .8}px`;
  const ySize = size === 'sm' ? `${options.railSize * 2 }px` : size === 'md' ? `${options.railSize * .1 }px` : `${options.railSize * .8}px`;
  const styles = {
    railContainer: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      
    `,
    rail: css`
      display: flex;
      width: ${xSize};
      height: ${ySize};
      background-color: ${+rail.value > 0 ? options.successColor : options.errorColor};
      margin-right: 1px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${options.activeColor};
      }
    `,
    railName: css`
      font-size: 10px;
      color: #999;
      margin-right: 8px;
      
    `,
  };
  return (
    <div className={styles.railContainer}>
      <Tooltip 
        placement="right"
        content={
          <div>
            <div style={{ fontSize: `${options.railTextsize}px`, fontWeight: 'bold', marginBottom: '4px' }}>{rail.rail_name}</div>
            <div style={{ fontSize: `12px`,  marginBottom: '4px' }}>{rail.pdu_name}</div>
            <div style={{ fontSize: `12px`,  marginBottom: '4px' }}>{rail.pdu_ip}</div>
          </div>
        }>
        <div>
          <div
            className={styles.rail}
            onClick={() => window.open(`${getBaseUrlByType('rail')}?var-pdu_name=${rail.pdu_name}`, '_blank')}
            />
          {showName && <span>{rail.pdu_name}</span>}
        </div>
      </Tooltip>
    </div>
  );
};