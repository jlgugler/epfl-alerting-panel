import React, { useState } from 'react';
import { css } from '@emotion/css';
import { PDUStatus } from './PDUStatus';
import { Tooltip } from '@grafana/ui';
import { FANStatus } from './FANStatus';
interface RackStatusProps {
  options: any;
  rack: any;
  row: any;
  pduData: any;
  pduStatusData: any;
  fanData: any;
}

export const RackStatus: React.FC<RackStatusProps> = ({ options, rack, row, pduData, pduStatusData, fanData }) => {
  const [_isHovered, setIsHovered] = useState(false);

  const styles = {
    container: css`
      width: ${options.rackSize}px;
      height: ${options.rackSize}px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1fr;
      gap: 2px;
      padding: 2px;
      background-color: #333;
    `,
    rectangle: css`
      width: 100%;
      height: 100%;
    `,
    rackName: css`
      font-size: ${options.RackTextsize}px; 
      &:hover {
        color: rgba(255, 255, 128, 1); /* Lighter color on hover */
      }
    `,
    rackContainer: css`
      display: flex;
      flex-direction: row;
      align-items: center;
    `,
    fanContainer: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
    fan: css`
      margin-right: 2px;
    `,
  };

  const pduDataForCurrentRack = pduData.filter(
    (pdu: any) => pdu.rack_fname === rack.rack_fname
  );

  const pduStatusDataForCurrentRack = pduStatusData.filter(
    (pdu: any) => pdu.rack_fname === rack.rack_fname
  );

  const fanDataForCurrentRack = fanData.filter(
    (fan: any) => fan.rack_fname === rack.rack_fname
  );
console.log("pduDataForCurrentRack", pduDataForCurrentRack)
console.log("pduStatusDataForCurrentRack", pduStatusDataForCurrentRack)

const combinedPduData = pduDataForCurrentRack.map((pdu: any) => {
  const status = pduStatusDataForCurrentRack.find((status: any) => status.pdu_name === pdu.pdu_name);
  return {
    ...pdu,
    value: status ? status.Value : null
  };
});
console.log("combinedPduData", combinedPduData)

  const tooltipContent = pduDataForCurrentRack.length > 0 ? (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {combinedPduData.map((pdu: any, index: any) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <PDUStatus
            pdu={pdu}
            size='md'
            showName={true}
            options={options}
          />
        </div>
      ))}
    </div>
  ) : (
    <div>No PDU</div>
  );

  return (
    <div>
    <div 
      className={styles.rackName}
      onClick={() => window.open(`${options.rackURL}?var-rack_fname=${rack.rack_name}`, '_blank')}
      style={{ cursor: 'pointer' }}
    >
      {rack.rack_name}
      </div> 
      <div className={styles.rackContainer}>
        <div className={styles.fanContainer}>
          {fanDataForCurrentRack.map((fan: any, index: any) => (
            <div key={index} className={styles.fan}>
              <FANStatus 
                pdu={fan} 
                size='sm'
                showName={false}
                options={options}
              />
            </div>
          ))}
        </div>
        <Tooltip content={tooltipContent} placement="auto">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={styles.container}>
            {combinedPduData.map((pdu: any, index: any) => (
                <PDUStatus 
                key={index} 
                pdu={pdu} 
                size='sm'
                showName={false}
                options={options}
                />
                ))}
            </div>
          </div>
        </Tooltip>
      </div>
      </div>
  );
};

export default RackStatus;
