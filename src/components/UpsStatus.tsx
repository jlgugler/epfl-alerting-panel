import React from 'react';
import { css } from '@emotion/css';
import { Tooltip } from '@grafana/ui';
// Define the type for options


interface UpsStatusProps {
  ups: any;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  options: any;
}

export const UpsStatus: React.FC<UpsStatusProps> = ({ ups, size = 'sm', showName = false, options }) => {
  // Determine the size of the square based on the size prop
  const xSize = size === 'sm' ? `${options.upsSizeWidth * .5 }px` : size === 'md' ? `${options.upsSizeWidth }px` : `${options.upsSizeWidth * 1.2}px`;
  const ySize = size === 'sm' ? `${options.upsSizeHeight * .5 }px` : size === 'md' ? `${options.upsSizeHeight }px` : `${options.upsSizeHeight * 1.2}px`;
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
      background-color: ${+ups.value > 0 ? options.successColor : options.errorColor};
      margin-right: 1px;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: ${options.activeColor}; 
      }
    `,

    upsName: css`
      font-size: 10px;
      color: #999;
      font-weight: bold;
      font-size: ${options.upsTextsize}px;
      cursor: pointer;
      &:hover {
        color:${options.activeColor}; 
      }
    `,
  };

  const [, type, nbr , ] = ups.pdu_name.match(/dc-cct-(.+)(\d+)-ups(\d+)/) || [];
  const upsName=(type+nbr).toUpperCase()
  
  return (
    <div className={styles.upsContainer}>
      <Tooltip 
        placement="right"
        content={
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>{upsName}</div>
            <div style={{ fontSize: '14px',  marginBottom: '4px' }}>{ups.pdu_name}</div>
            <div style={{ fontSize: '14px',  marginBottom: '4px' }}>{ups.pdu_ip}</div>
          </div>
          }>
        <div>
          <div className={styles.upsName}>{upsName}</div>
          <div
            className={styles.ups}
            onClick={() => window.open(`${options.upsURL}?var-ups_name=${ups.pdu_name}`, '_blank')}
            />
          {showName && <span>{ups.ups_name}</span>}
        </div>
      </Tooltip>
    </div>
  );
};