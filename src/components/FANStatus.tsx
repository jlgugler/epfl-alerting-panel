import React from 'react';
import { css } from '@emotion/css';
import { Tooltip } from '@grafana/ui';
// Define the type for options


interface FANStatusProps {
  pdu: any;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  options: any;
  getBaseUrlByType: (type: string) => string;
}

export const FANStatus: React.FC<FANStatusProps> = ({ pdu, size = 'sm', showName = false, options, getBaseUrlByType }) => {
  // Determine the size of the square based on the size prop
  const xSize = size === 'sm' ? `${options.pduSize}px` : size === 'md' ? `${options.pduSize * 2}px` : `${options.pduSize}px`;
  const ySize = size === 'sm' ? `${options.pduSize}px` : size === 'md' ? `${options.pduSize * 2}px` : `${options.pduSize}px`;
  const styles = {
    fansContainer: css`
      display: flex;
      flex-direction: column;
      gap: 2px;
    `,
    fans: css`
      width: ${xSize};
      height: ${ySize};
      
      background-color: ${+pdu.value > 0 ? options.successColor : options.errorColor};
      
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${options.activeColor};
      }
    `,
  };
  return (
    <div className={styles.fansContainer}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Tooltip content={pdu.pdu_name} placement="auto">
        <div
          key={index}
          className={styles.fans}
          onClick={() => window.open(`${getBaseUrlByType('fan')}?var-pdu_name=${pdu.pdu_name}`, '_blank')}
        />
        </Tooltip>
      ))}
      {showName && <span>{pdu.pdu_name}</span>}
    </div>
  );
};