import React from 'react';
import { css } from '@emotion/css';
// Define the type for options


interface RailStatusProps {
  rail: any;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  options: any;
}

export const RailStatus: React.FC<RailStatusProps> = ({ rail, size = 'sm', showName = false, options }) => {
  // Determine the size of the square based on the size prop
  const xSize = size === 'sm' ? `${options.rackSize * 2 }px` : size === 'md' ? `${options.pduSize * 2}px` : `${options.rackSize}px`;
  const ySize = size === 'sm' ? `${options.pduSize}px` : size === 'md' ? `${options.pduSize * 2}px` : `${options.pduSize}px`;
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
      background-color: ${+rail.value > 0 ? 'green' : 'red'};
      margin-right: 1px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: rgba(128, 255, 128, 0.5); /* Lighter color on hover */
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
      {/* <div className={styles.railName}>{rail.rail_name}</div> */}
      <div
        className={styles.rail}
        onClick={() => window.open(`${options.pduURL}?var-pdu_name=${rail.pdu_name}`, '_blank')}
      />
      {showName && <span>{rail.pdu_name}</span>}
    </div>
  );
};