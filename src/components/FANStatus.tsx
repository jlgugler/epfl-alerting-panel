import React from 'react';
import { css } from '@emotion/css';
// Define the type for options


interface FANStatusProps {
  pdu: any;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  options: any;
}

export const FANStatus: React.FC<FANStatusProps> = ({ pdu, size = 'sm', showName = false, options }) => {
  // Determine the size of the square based on the size prop
  const xSize = size === 'sm' ? `${options.pduSize}px` : size === 'md' ? `${options.pduSize * 2}px` : `${options.pduSize}px`;
  const ySize = size === 'sm' ? `${options.pduSize}px` : size === 'md' ? `${options.pduSize * 2}px` : `${options.pduSize}px`;
  const styles = {
    fansContainer: css`
      display: flex;
      flex-direction: column;
    `,
    fans: css`
      width: ${xSize};
      height: ${ySize};
      margin-bottom: 1px;
      background-color: ${+pdu.value > 0 ? 'green' : 'red'};
      margin-right: 1px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: rgba(128, 255, 128, 0.5); /* Lighter color on hover */
      }
    `,
  };
  return (
    <div className={styles.fansContainer}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={styles.fans}
          onClick={() => window.open(`${options.pduURL}?var-pdu_name=${pdu.pdu_name}`, '_blank')}
        />
      ))}
      {showName && <span>{pdu.pdu_name}</span>}
    </div>
  );
};