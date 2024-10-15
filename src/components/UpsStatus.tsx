import React from 'react';
import { css } from '@emotion/css';
// Define the type for options


interface UpsStatusProps {
  ups: any;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  options: any;
}

export const UpsStatus: React.FC<UpsStatusProps> = ({ ups, size = 'sm', showName = false, options }) => {
  // Determine the size of the square based on the size prop
  const xSize = size === 'sm' ? `${options.rackSize * 2 }px` : size === 'md' ? `${options.pduSize * 2}px` : `${options.rackSize}px`;
  const ySize = size === 'sm' ? `${options.rackSize * 2 }px` : size === 'md' ? `${options.pduSize * 2}px` : `${options.rackSize}px`;
  const styles = {
    upsContainer: css`
      display: flex;
      flex-direction: column;
      align-items: left;
      justify-content: left;
      
    `,
    ups: css`
      display: flex;
      width: ${xSize};
      height: ${ySize};
      background-color: ${+ups.value > 0 ? 'green' : 'red'};
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
    <div className={styles.upsContainer}>
      <div className={styles.railName}>{ups.pdu_name}</div>
      <div
        className={styles.ups}
        onClick={() => window.open(`${options.upsURL}?var-ups_name=${ups.ups_name}`, '_blank')}
      />
      {showName && <span>{ups.ups_name}</span>}
    </div>
  );
};