import React from 'react';
import { css } from '@emotion/css';
import RackStatus from './RackStatus';
import {RailStatus} from './RailStatus';
import { Tooltip } from '@grafana/ui';

interface RowStatusProps {
  pduData: any[];
  rackData: any[];
  railData: any[];
  fanData: any[];
  options: any;
  row: any;
  pduStatusData: any[];
}


const RowStatus: React.FC<RowStatusProps> = ({options, pduData  , rackData, railData, row, pduStatusData, fanData }) => {
  const styles = {
    container: css`
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      margin-bottom: 2px;
    `,
    rowName: css`
      font-weight: bold;
      margin-bottom: 2px;
      font-size: ${options.rowTextsize}px;
      color: #aaa;
      cursor: pointer;
      align-self: center;
      white-space: nowrap;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      min-width: 50px;

      &:hover {
        color: rgba(255, 255, 128, 1); /* Lighter color on hover */
      }
    `,
    rackContainer: css`
      display: flex;
      gap: 5px;
      
    `,
    railContainer: css`
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-left: 5px;
      margin-right: 10px;
    `,
    rowheader: css`
      display: flex;
      flex-direction: row;
    `,
  };
  
  const pduDataForCurrentRow = pduData.filter(
    (pdu: any) => pdu.row_name === row.row_name
  );

  const pduStatusDataForCurrentRow = pduStatusData.filter(
    (pdu: any) => pdu.row_name === row.row_name
  );

  const fanDataForCurrentRow = fanData.filter(
    (fan: any) => fan.row_name === row.row_name
  );


  const railDataForCurrentRow = railData.filter((rail: any) => {
    if (typeof rail.pdu_name === 'string' && typeof row.row_name === 'string') {
      return rail.pdu_name.toLowerCase().includes(row.row_name.toLowerCase());
    }
    return false;
  });

  return (
    <div className={styles.container}>
      <div className={styles.rowheader}>
        <Tooltip placement="right" content={
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>{row.row_name}</div>
            <div style={{ fontSize: '10px', color: '#999' }}>Racks: {rackData.length}</div>
            <div style={{ fontSize: '10px', color: '#999' }}>PDUs: {pduData.length}</div>
          </div>
        }>
          <div 
            className={styles.rowName}
            onClick={() => window.open(`${options.rowURL}?var-row=${row.row_name}`, '_blank')}
            style={{ cursor: 'pointer' }}
          >
            {row.row_name}
          </div>
        </Tooltip>


      </div>
      <div className={styles.railContainer}>

        {railDataForCurrentRow.map((rail) => (
          <RailStatus 
            rail={rail}
            options={options}
          />
        ))}

      </div>
      <div className={styles.rackContainer}>
       
        
        {rackData.map((rack) => (
          <RackStatus 
            rack={rack}
            row={row}
            pduData={pduDataForCurrentRow}
            pduStatusData={pduStatusDataForCurrentRow}
            fanData={fanDataForCurrentRow}
            options={options}
          />
        ))}
       
      </div>
    </div>
  );
};

export default RowStatus;
