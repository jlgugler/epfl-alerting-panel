import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { AlertingPanel } from 'components/AlertingPanel';

export const plugin = new PanelPlugin<SimpleOptions>(AlertingPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'rowURL', // Unique path
      name: 'rowURL',
      description: 'Row URL',
      defaultValue: '/d/cdou123admle29sf/datacenter-view-rack',
      category: ['Row'],
    })
    .addTextInput({
      path: 'rowTextsize', // Unique path
      name: 'rowTextsize',
      description: 'Row Text size',
      defaultValue: '10',
      category: ['Row'],
    })
    .addTextInput({
      path: 'rackURL', // Unique path
      name: 'rackURL',
      description: 'Rack URL',
      defaultValue: '/d/cdou123admle29sf/datacenter-view-rack',
      category: ['Rack'],
    })
    .addTextInput({
      path: 'RackTextsize', // Unique path
      name: 'Rack Textsize',
      description: 'Rack Text size',
      defaultValue: '10',
      category: ['Rack'],
    })
    .addSliderInput({
      path: 'rackSize', // Unique path
      name: 'rackSize',
      description: 'Rack dimensions',
      category: ['Rack'],
      defaultValue: 30,
      settings: {
        min: 15,
        max: 50,
        step: 1,
      },
    })
    .addTextInput({
      path: 'pduURL', // Unique path
      name: 'pduURL',
      description: 'PDU URL',
      defaultValue: '/d/ddqco4d3utj4asd/datacenter-view-pdu',
      category: ['PDU'],
    })
    .addTextInput({
      path: 'PDUTextsize', // Unique path
      name: 'PDU Text size',
      description: 'PDU Text size',
      defaultValue: '12',
      category: ['PDU'],
    })
    .addBooleanSwitch({
      path: 'tooltips', // Unique path
      name: 'Tooltips',
      defaultValue: true,
      category: ['PDU'],
    })
    .addTextInput({
      path: 'TooltipTextsize', // Unique path
      name: 'Tooltip Text size',
      description: 'Tooltip Text size',
      defaultValue: '12',
      category: ['PDU'],
    })
    .addSliderInput({
      path: 'pduSize', // Unique path
      name: 'pduSize',
      description: 'PDU dimensions',
      category: ['PDU'],
      defaultValue: 5,
      settings: {
        min: 1,
        max: 10,
        step: 1,
      },
    });
});
