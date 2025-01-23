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
  sensorData: any;
  getBaseUrlByType: (type: string) => string;
}

export const RackStatus: React.FC<RackStatusProps> = ({ options, rack, row, pduData, pduStatusData, fanData, sensorData, getBaseUrlByType }) => {
  const [_isHovered, setIsHovered] = useState(false);



  const styles = {
    pduContainer: css`
      width: ${options.rackSize}px;
      height: ${options.rackSize * 1.4}px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1fr;
      padding: 1px;
      background-color: #333;
    `,
    rectangle: css`
      width: 100%;
      height: 100%;
    `,
    rackName: css`
      font-size: ${options.RackTextsize}px; 
      &:hover {
        color: ${options.activeColor};
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
      gap: 2px;
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

  const combinedPduData = pduDataForCurrentRack.map((pdu: any) => {
    const status = pduStatusDataForCurrentRack.find((status: any) => status.pdu_name === pdu.pdu_name);
    return {
      ...pdu,
      value: status ? status.Value : null
    };
  });
  
  const combinedFanData = fanDataForCurrentRack.map((fan: any) => {
    const status = pduStatusDataForCurrentRack.find((status: any) => status.pdu_name === fan.pdu_name);
    return {
      ...fan,
      value: status ? status.Value : null
    };
  });

  const tooltipContent = pduDataForCurrentRack.length > 0 ? (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {combinedPduData.map((pdu: any, index: any) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <PDUStatus
            sensorData={[]}
            getBaseUrlByType={getBaseUrlByType}
            size={combinedPduData.length>4 ? 'xs' : 'sm'}
            pdu={pdu}
            
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
      onClick={() => window.open(`${options.rackURL}?var-rack_fname=${rack.rack_fname}`, '_blank')}
      style={{ cursor: 'pointer' }}
    >
      <Tooltip content={tooltipContent} placement="auto">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
        {rack.rack_name}
        </div>
      </Tooltip>
      </div> 
      <div className={styles.rackContainer}>
        <div className={styles.fanContainer}>
          {combinedFanData.map((fan: any, index: any) => (
            <div key={index} className={styles.fan}>
              <FANStatus 
                getBaseUrlByType={getBaseUrlByType}
                pdu={fan} 
                size='sm'
                showName={false}
                options={options}
              />
            </div>
          ))}
        </div>
        <div className={styles.pduContainer}>
            {combinedPduData.map((pdu: any, index: any) => (
                  <PDUStatus 
                    getBaseUrlByType={getBaseUrlByType}
                    key={index} 
                    sensorData={sensorData}
                    pdu={pdu} 
                    size={combinedPduData.length>4 ? 'xs' : 'md'}
                    showName={false}
                    options={options}
                  />
                ))}
          </div>
            
      </div>
      </div>
  );
};

export default RackStatus;
