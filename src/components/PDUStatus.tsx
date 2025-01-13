import React from 'react';
import { css } from '@emotion/css';
// Define the type for options


interface PDUStatusProps {
  pdu: any;
  size?: 'xs' |	 'sm' | 'md' | 'lg';
  showName?: boolean;
  options: any;
}

export const PDUStatus: React.FC<PDUStatusProps> = ({ pdu, size = 'md', showName = false, options }) => {
  // Determine the size of the square based on the size prop
  const xSize = size === 'xs' ? `${options.rackSize *.18 *1}px` : size === 'sm' ? `${options.rackSize *.2 *2}px` : size === 'md' ? `${options.rackSize * .18}px` : `${options.rackSize* 1.5 *.2}px`;
  const ySize = size === 'xs' ? `${options.rackSize * 0.6}px` : size === 'sm' ? `${options.rackSize *.2 *2}px` : size === 'md' ? `${options.rackSize * 1.2 }px` : `${options.rackSize* 1.5 *.8}px`;
  const styles = {
    pdu: css`
      width: ${xSize};
      height: ${ySize};
      background-color: ${+pdu.value > 0 ? options.successColor : options.errorColor};
      margin-right: 1px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${options.activeColor};
      }
    `,
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        className={styles.pdu}
        onClick={() => window.open(`${options.pduURL}?var-pdu_name=${pdu.pdu_name}`, '_blank')}
      />
      {showName && <span>{pdu.pdu_name}</span>}
    </div>
  );
};