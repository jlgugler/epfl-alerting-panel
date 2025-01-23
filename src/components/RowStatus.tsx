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
  sensorData: any[];
  options: any;
  row: any;
  pduStatusData: any[];
  tcpStatusData: any[];
  getBaseUrlByType: (type: string) => string;
}


const RowStatus: React.FC<RowStatusProps> = ({options, pduData  , rackData, railData, row, pduStatusData, fanData, tcpStatusData, sensorData, getBaseUrlByType }) => {
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
      margin-right: 2px;
      margin-left: 2px;
      
      font-size: ${options.rowTextsize}px;
      color: #aaa;
      cursor: pointer;
      align-self: center;
      white-space: nowrap;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      
      width: 100px;
      word-wrap: break-word;
      white-space: normal;

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
            onClick={() => window.open(`${getBaseUrlByType('row')}?var-row_name=${row.row_name}&var-dc_name=${row.dc_name}`, '_blank')}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ wordWrap: 'break-word' }}>{row.row_name}</div>
          </div>
        </Tooltip>


      </div>
      
      {combinedRailData.length > 0 && (
      <div id="railContainer" className={styles.railContainer}>

        {combinedRailData.map((rail) => (
          <RailStatus 
            rail={rail}
            options={options}
            getBaseUrlByType={getBaseUrlByType}
          />
        ))}

      </div>)}
      <div className={styles.rackContainer}>
       
        
        {rackData.map((rack) => (
          <RackStatus 
            getBaseUrlByType={getBaseUrlByType}
            rack={rack}
            sensorData={sensorData}
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
