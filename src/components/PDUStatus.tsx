import React from 'react';
import { css } from '@emotion/css';
import { Tooltip } from '@grafana/ui';
// Define the type for options


interface PDUStatusProps {
  pdu: any;
  size?: 'xs' |	 'sm' | 'md' | 'lg';
  showName?: boolean;
  options: any;
  sensorData: any;
  getBaseUrlByType: (type: string) => string;
}

export const PDUStatus: React.FC<PDUStatusProps> = ({ pdu, size = 'md', showName = false, options, sensorData, getBaseUrlByType }) => {
  // Determine the size of the square based on the size prop
  
  const sensors = sensorData.filter((sensor: any) => sensor.rail_name === pdu.pdu_name);
  if (sensors.length > 0) {
    console.log(sensors);
  }
  const xSize = size === 'xs' ? options.rackSize *.18  : size === 'sm' ? options.rackSize *.4 : size === 'md' ? options.rackSize * .18 : options.rackSize* 1;
  const sensorSize = xSize * .5;
  const sensorHeight = (sensorSize+1) * sensors.length;
  const ySize = size === 'xs' ? (options.rackSize) * 0.6-sensorHeight : size === 'sm' ?  (options.rackSize) *.4 -sensorHeight : size === 'md' ?  (options.rackSize) * 1.2 -sensorHeight:  (options.rackSize) * 1-sensorHeight;
  const pduHeight = ySize;
  
  const styles = {
    pduContainer: css`
      padding: 0px;
      margin: 0px;
      background-color: #444;
    `,
    sensorContainer: css`
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);

      
      background-color: #333;
      
    `,
    pdu: css`
      width: ${xSize}px;
      height: ${pduHeight}px;
      background-color: ${+pdu.value > 0 ? options.successColor : options.errorColor};
      margin-right: 1px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${options.activeColor};
      }
    `,
    sensor: css`
      width: ${xSize}px;
      height: ${sensorSize}px;
      margin-top: 0px;
      margin-bottom: 1px;
      margin-left: 0px;
      margin-right: 0px;
      background-color: ${+pdu.value > 0 ? options.successColor : options.errorColor};
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: ${options.activeColor};
      }
    `,
  };
  console.log(sensors);
  const sensorPanel = (sensor: any)=> {
    const type = sensor.name.includes('temperature') ? 'temperature' : sensor.name.includes('pressure') ? 'pressure' : sensor.name.includes('humidity') ? 'humidity' : 'humidity';
    return <div>
        <Tooltip content={<><div>{sensor.pdu_name}</div></>} placement="auto">
          <div className={styles.sensor} key={sensor.pdu_name} onClick={() => window.open(`${getBaseUrlByType(type)}?var-pdu_name=${sensor.pdu_name}&var-selected_item=${sensor.pdu_name}&type=${type}`, '_blank')}>
          </div>
        </Tooltip>
    </div>;
  }
  return (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
      <div className={styles.pduContainer}>
        
        <div className={styles.sensorContainer}>
            {sensors.map((sensor: any) => sensorPanel(sensor))}
        </div>      
        
        <Tooltip content={<><div>{pdu.pdu_name}</div></>} placement="auto">


            <div
                className={styles.pdu}
                onClick={() => window.open(`${getBaseUrlByType('pdu')}?var-pdu_name=${pdu.pdu_name}&var-selected_item=${pdu.pdu_name}&type=pdu`, '_blank')}
              />

        </Tooltip>
      {showName && <span>{pdu.pdu_name}</span>}
    </div>
    </div>
  );
};
