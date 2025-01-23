import React, { useMemo } from 'react';
import { PanelProps, DataFrame } from '@grafana/data';
import { retrieveData } from 'utils/dataUtils';
import { SimpleOptions } from 'types';
import { css } from '@emotion/css'; 
import { useStyles2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';
import { UpsStatus } from './UpsStatus';
import RowStatus from './RowStatus';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
   
    textBox: css`
      position: absolute;
      bottom: 0;
      right: 50px;
      padding: 10px;
      font-size: 10px;
      color: #999;
    `,
    AlertingPanelContainer: css`
      width: 100%;
      height: 100%;
      max-height: 100%;
      overflow: auto; 
      display: flex;
      flex-direction: row;
    `,
    rowContainer: css`
      display: flex;
      flex-direction: column;
      gap: 5px;
    `,
    upsContainer: css`
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-right: 10px;
      margin-left: 10px;
    `,
  };
};




export const AlertingPanel: React.FC<Props> = ({ options, data, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);
  const getBaseUrlByType = (type: string) => {
    switch (type) {
      case 'datacenter': return '/d/a538aeff-5a8a-42a5-901c-938d896fdd6f/datacenter-custom-dc-panel';
      case 'row': return '/d/a538aeff-5a8a-42a5-901c-938123fdd6f/datacenter-custom-row-panel';
      case 'rack': return '/d/a538aeff-5a8a-42a5-901c-9sddd896fdd6f/datacenter-custom-rack-panel';
      case 'pdu': return '/d/axxcseff-5a8a-42a5-901c-938d896fdd6f/datacenter-custom-pdu';
      case 'temperature': return '/d/beajwyrqea8lcb/datacenter-view-pdu-temperature';
      case 'pressure': return '/d/feakdj50hwh6oc/datacenter-view-pdu-pressure';
      case 'humidity': return '/d/feajr9w8zetj4d/datacenter-view-pdu-humidity';
      case 'ups': return '/d/ae0ubbk3if400d/datacenter-view-ups';
      case 'rail': return 'd/fdyyae74x0irka/datacenter-view-rail';
      case 'fan': return '/d/ce0xm7wjr9ywwe/datacenter-view-fan';
      default: return '/';
    }
  };
  if (data.series.length === 0) {
    return (
      <PanelDataErrorView
        fieldConfig={fieldConfig}
        panelId={id}
        data={data}
        needsStringField
      />
    );
  }

  const RackInfoFieldMapping = [
    'rack_fname',
    'rack_name',
    'rack_owner',
    'rack_group',
    'row_id',
    'row_name',
    'dc_name',
    'dc_location',
    'room_name',
    'pdu_count',
    '_value',
  ];
  const RailInfoFieldMapping = [
    'pdu_master',
    'pdu_name',
    'pdu_group',
    'pdu_model',
    'pdu_master',
    'pdu_type',
    'pdu_ip',
    'rail_name',
    '_value',
  ];
  const FanInfoFieldMapping = [
    'pdu_name',
    'pdu_group',
    'pdu_model',
    'pdu_serial',
    'pdu_firmware',
    'pdu_master',
    'pdu_type',
    'pdu_mac',
    'pdu_ip',
    'rack_fname',
    'dc_location',
    'rail_name',
    'row_name',
    '_value',
  ];
  const PduInfoFieldMapping = [
    'pdu_name',
    'pdu_group',
    'pdu_model',
    'pdu_serial',
    'pdu_firmware',
    'pdu_master',
    'pdu_type',
    'pdu_mac',
    'pdu_ip',
    'rack_fname',
    'dc_location',
    'rail_name',
    'row_name',
    '_value',
  ];
  const SensorInfoFieldMapping = [
    'pdu_name',
    'pdu_group',
    'pdu_model',
    'pdu_serial',
    'pdu_firmware',
    'pdu_master',
    'pdu_type',
    'pdu_mac',
    'pdu_ip',
    'rack_fname',
    'dc_location',
    'rail_name',
    'row_name',
    '_value',
  ];
  const UpsInfoFieldMapping = [
    'pdu_name',
    'rail_name',
    '_value',
  ];

  const PduStatusFieldMapping = [
    'host_name',
    'pdu_name',
    'row_name',
    'rack_name',
    'rack_fname',
    'Value',

  ];

  const TcpStatusFieldMapping = [
    'host_name',
    'pdu_name',
    'row_name',
    'rack_name',
    'rack_fname',
    'probe_success',
    'Value',
    

  ];

  // Retrieve data using the utility function
  const rawRackData: any[] = retrieveData<any>(
    data.series as DataFrame[],
    'rackInfo',
    RackInfoFieldMapping
  );

  const rawPduData: any[] = retrieveData<any>(
    data.series as DataFrame[],
    'pduInfo',
    PduInfoFieldMapping
  );

  const rawSensorData: any[] = retrieveData<any>(
    data.series as DataFrame[],
    'sensorInfo',
    SensorInfoFieldMapping
  );
  

  const rawPduStatusData: any[] = retrieveData<any>(
    data.series as DataFrame[],
    'alertingStatus',
    PduStatusFieldMapping
  );

  const rawRailData: any[] = retrieveData<any>(
    data.series as DataFrame[],
    'railInfo',
    RailInfoFieldMapping
  );

  const rawFanData: any[] = retrieveData<any>(
    data.series as DataFrame[],
      'fanInfo',
      FanInfoFieldMapping
  );
  
  const rawUpsData: any[] = retrieveData<any>(
    data.series as DataFrame[],
      'upsInfo',
      UpsInfoFieldMapping
  );

  const rawTcpData: any[] = retrieveData<any>(
    data.series as DataFrame[],
      'tcpStatus',
      TcpStatusFieldMapping
  );

  const combinedUpsData = rawUpsData.map((ups) => {
    const status = rawPduStatusData.find((status: any) => status.pdu_name === ups.pdu_name);
    return {
      ...ups,
      value: status ? status.Value : null
    };
  });
  
  const rowList: { row_id: string; row_name: string; dc_name: string }[] = useMemo(() => {
    const rowMap = new Map<string, { row_id: string; dc_name: string }>(); // Key: row_name, Value: { row_id, dc_name }
    
    rawRackData.forEach((item) => {
      if (item.row_name && item.row_id && item.dc_name && !rowMap.has(item.row_name)) {
        rowMap.set(item.row_name, { row_id: item.row_id, dc_name: item.dc_name });
      }
    });
  
    return Array.from(rowMap.entries())
      .map(([row_name, { row_id, dc_name }]) => ({ row_name, row_id, dc_name }))
      .sort((a, b) => a.row_name.localeCompare(b.row_name));
  }, [rawRackData]);
  
    
    return (
    <div className={styles.AlertingPanelContainer}>
      <div className={styles.upsContainer}>
        {combinedUpsData.map((ups) => {
          return (
            <UpsStatus 
              ups={ups}
              options={options}
              getBaseUrlByType={getBaseUrlByType}
            />
          )
        })}
      </div>
      <div className={styles.rowContainer}>
      
          {rowList.map((row) => {
              const filteredPduData = rawPduData.filter(
                (pdu) => pdu.row_name === row.row_name
              );
              const filteredRackData = rawRackData.filter(
                (rack) => rack.row_name === row.row_name
              );
              const filteredPduStatusData = rawPduStatusData.filter(
                (pdu) => pdu.row_name === row.row_name || pdu.device_type === "modbus"
              );
              return (
            <RowStatus 
              getBaseUrlByType={getBaseUrlByType}
              row={row}
              sensorData={rawSensorData}
              pduData={filteredPduData}
              rackData={filteredRackData}
              railData={rawRailData}
              fanData={rawFanData}
              pduStatusData={filteredPduStatusData}
              tcpStatusData={rawTcpData}
              options={options}
              
            />
          )
        })}
      </div>
      <div className={styles.textBox}>
        PDU Panel by EPFL/ITOP-INFR v.0.27
      </div>
    </div>
  );
};

export default AlertingPanel;
