import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { AlertingPanel } from 'components/AlertingPanel';

export const plugin = new PanelPlugin<SimpleOptions>(AlertingPanel).setPanelOptions((builder) => {
  return builder
  // global color options //
  .addColorPicker({
    path: 'successColor',
    name: 'Success Color',
    description: 'Success Color',
    defaultValue: '#00ff00',
    category: ['Global'],
  })
  .addColorPicker({
    path: 'errorColor',
    name: 'Error Color',
    description: 'Error Color',
    defaultValue: '#ff0000',
    category: ['Global'],
  })
  .addColorPicker({
    path: 'activeColor',
    name: 'Active Color',
    description: 'Mouse over Active Color',
    defaultValue: '#0000ff',
    category: ['Global'],
  })

  // UPS panel options //
  .addSliderInput({
      path: 'upsSizeWidth', 
      name: 'UPS dimensions',
      description: 'UPS dimensions',
      category: ['UPS'],
      defaultValue: 100,
      settings: {
        min: 10,
        max: 300,
        step: 1,
      },
    })
  .addSliderInput({
      path: 'upsSizeHeight', 
      name: 'UPS dimensions',
      description: 'UPS dimensions',
      category: ['UPS'],
      defaultValue: 100,
      settings: {
        min: 10,
        max: 300,
        step: 1,
      },
    })
    .addTextInput({
      path: 'upsTextsize', 
      name: 'upsTextsize',
      description: 'UPS Text size',
      defaultValue: '12',
      category: ['UPS'],
    })
    .addTextInput({
      path: 'upsURL', 
      name: 'upsURL',
      description: 'UPS URL',
      defaultValue: '/d/ae0ubbk3if400d/datacenter-view-ups',
      category: ['UPS'],
    })

  // Row panel options //
    .addTextInput({
      path: 'rowURL', 
      name: 'rowURL',
      description: 'Row URL',
      defaultValue: '/d/a538aeff-5a8a-42a5-901c-938123fdd6f/datacenter-custom-row-panel',
      category: ['Row'],
    })
    .addTextInput({
      path: 'rowTextsize', 
      name: 'rowTextsize',
      description: 'Row Text size',
      defaultValue: '10',
      category: ['Row'],
    })
    // rail panel options //
    .addTextInput({
      path: 'railURL', 
      name: 'railURL',
      description: 'Rail URL',
      defaultValue: '/d/fdyyae74x0irka/datacenter-view-rail',
      category: ['Rail'],
    })  
    .addTextInput({
      path: 'railTextsize', 
      name: 'railTextsize',
      description: 'Rail Text size',
      defaultValue: '14',
      category: ['Rail'],
    })
    .addSliderInput({
      path: 'railSize', 
      name: 'railSize',
      description: 'Rail dimensions',
      category: ['Rail'],
      defaultValue: 50,
      settings: {
        min: 10,
        max: 400,
        step: 1,
      },
    })

  // Rack panel options //
    .addTextInput({
      path: 'rackURL', 
      name: 'rackURL',
      description: 'Rack URL',
      defaultValue: '/d/cdou123admle29sf/datacenter-view-rack',
      category: ['Rack'],
    })

    .addTextInput({
      path: 'fanURL', 
      name: 'fanURL',
      description: 'Fan URL',
      defaultValue: '/d/ce0xm7wjr9ywwe/datacenter-view-fan',
      category: ['Rack'],
    })

    .addTextInput({
      path: 'RackTextsize', 
      name: 'Rack Textsize',
      description: 'Rack Text size',
      defaultValue: '10',
      category: ['Rack'],
    })
    .addSliderInput({
      path: 'rackSize', 
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

    // PDU panel options //
    .addTextInput({
      path: 'pduURL', 
      name: 'pduURL',
      description: 'PDU URL',
      defaultValue: '/d/ddqco4d3utj4asd/datacenter-view-pdu',
      category: ['PDU'],
    })
    .addTextInput({
      path: 'PDUTextsize', 
      name: 'PDU Text size',
      description: 'PDU Text size',
      defaultValue: '12',
      category: ['PDU'],
    })
    .addBooleanSwitch({
      path: 'tooltips', 
      name: 'Tooltips',
      defaultValue: true,
      category: ['PDU'],
    })
    .addTextInput({
      path: 'TooltipTextsize', 
      name: 'Tooltip Text size',
      description: 'Tooltip Text size',
      defaultValue: '12',
      category: ['PDU'],
    })
    .addSliderInput({
      path: 'pduSize', 
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
