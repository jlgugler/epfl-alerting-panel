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
  tcpStatusData: any[];
}


const RowStatus: React.FC<RowStatusProps> = ({options, pduData  , rackData, railData, row, pduStatusData, fanData, tcpStatusData }) => {
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
        color: ${options.activeColor};
      }
    `,
    rackContainer: css`
      display: flex;
      gap: 5px;
      
    `,
    railContainer: css`
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
      padding: 1px;
      background-color: #333;
      padding: 5px;
      gap: 5px;
      margin-top: 10px;
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


// Updated code starts here
const railDataForCurrentRow = railData
.filter((rail: any) => {
  if (
    typeof rail.pdu_name === 'string' &&
    typeof row.row_name === 'string'
  ) {
    return rail.pdu_name
      .toLowerCase()
      .includes(row.row_name.toLowerCase());
  }
  return false;
})
.map((rail: any) => {
  // Extract 'masterx' from pdu_name
  const masterNameMatch = rail.pdu_name.match(/(master\d+)/i);
  const master_name = masterNameMatch ? masterNameMatch[1] : null;

  return {
    ...rail,
    master_name: master_name, // Add the new field here
    };
  });
  const combinedRailData = railDataForCurrentRow.map((rail: any) => {
    const status = tcpStatusData.find((status: any) => status.host_name === rail.master_name);
    return {
      ...rail,
      value: status ? status._value : null
    };
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
      
      {combinedRailData.length > 0 && (
      <div id="railContainer" className={styles.railContainer}>

        {combinedRailData.map((rail) => (
          <RailStatus 
            rail={rail}
            options={options}
          />
        ))}

      </div>)}
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
