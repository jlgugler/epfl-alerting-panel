/* [create-plugin] version: 5.5.3 */
define(["@emotion/css","@grafana/data","@grafana/runtime","@grafana/ui","module","react"],((e,t,a,r,n,o)=>(()=>{"use strict";var i={89:t=>{t.exports=e},781:e=>{e.exports=t},531:e=>{e.exports=a},7:e=>{e.exports=r},308:e=>{e.exports=n},959:e=>{e.exports=o}},l={};function s(e){var t=l[e];if(void 0!==t)return t.exports;var a=l[e]={exports:{}};return i[e](a,a.exports,s),a.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.p="public/plugins/epfl-alerting-panel/";var c={};s.r(c),s.d(c,{plugin:()=>$});var p=s(308),d=s.n(p);s.p=d()&&d().uri?d().uri.slice(0,d().uri.lastIndexOf("/")+1):"public/plugins/epfl-alerting-panel/";var u=s(781),m=s(959),f=s.n(m);function g(e,t,a,r=1e3){return e.filter((e=>e.refId===t)).flatMap(((e,t)=>{const n={};a.forEach((t=>{const a=e.fields.find((e=>e.name.toLowerCase().includes(t.toLowerCase())));a&&(n[t]=a)}));let o=e.fields.find((e=>["_value","value"].includes(e.name.toLowerCase())));o||(o=e.fields.find((e=>{const t=e.name.toLowerCase();return["_value","value"].some((e=>t.includes(e)))})));const i=a[0],l=n[i];if(!l||!o)return[];const s=l.values.length,c=[];for(let e=0;e<s;e++){const i={index:(t+1)*r+e};a.forEach((t=>{const a=n[t];if(a){const r=a.values.get(e);i[t]=void 0!==r?r:""}else i[t]=""}));const l=o.values.get(e);i._value=void 0!==l?l:"",c.push(i)}return c}))}var x=s(89),w=s(7),_=s(531);const y=({ups:e,size:t="sm",showName:a=!1,options:r})=>{const n="sm"===t?.5*r.upsSizeWidth+"px":"md"===t?`${r.upsSizeWidth}px`:1.2*r.upsSizeWidth+"px",o="sm"===t?.5*r.upsSizeHeight+"px":"md"===t?`${r.upsSizeHeight}px`:1.2*r.upsSizeHeight+"px",i={upsContainer:x.css`
      display: flex;
      flex-direction: column;
      align-items: left;
      justify-content: left;
      
    `,ups:x.css`
      display: flex;
      width: ${n};
      height: ${o};
      background-color: ${+e.value>0?r.successColor:r.errorColor};
      margin-right: 1px;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: ${r.activeColor}; 
      }
    `,upsName:x.css`
      font-size: 10px;
      color: #999;
      font-weight: bold;
      font-size: ${r.upsTextsize}px;
      cursor: pointer;
      &:hover {
        color:${r.activeColor}; 
      }
    `},[,l,s]=e.pdu_name.match(/dc-cct-(.+)(\d+)-ups(\d+)/)||[],c=(l+s).toUpperCase();return f().createElement("div",{className:i.upsContainer},f().createElement(w.Tooltip,{placement:"right",content:f().createElement("div",null,f().createElement("div",{style:{fontSize:"14px",fontWeight:"bold",marginBottom:"4px"}},c),f().createElement("div",{style:{fontSize:"14px",marginBottom:"4px"}},e.pdu_name),f().createElement("div",{style:{fontSize:"14px",marginBottom:"4px"}},e.pdu_ip))},f().createElement("div",null,f().createElement("div",{className:i.upsName},c),f().createElement("div",{className:i.ups,onClick:()=>window.open(`${r.upsURL}?var-ups_name=${e.pdu_name}`,"_blank")}),a&&f().createElement("span",null,e.ups_name))))},v=({pdu:e,size:t="md",showName:a=!1,options:r})=>{const n="sm"===t?.2*r.rackSize*2+"px":"md"===t?.18*r.rackSize+"px":1.5*r.rackSize*.2+"px",o="sm"===t?.2*r.rackSize*2+"px":"md"===t?1.2*r.rackSize+"px":1.5*r.rackSize*.8+"px",i={pdu:x.css`
      width: ${n};
      height: ${o};
      background-color: ${+e.value>0?r.successColor:r.errorColor};
      margin-right: 1px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${r.activeColor};
      }
    `};return f().createElement("div",{style:{display:"flex",alignItems:"center"}},f().createElement("div",{className:i.pdu,onClick:()=>window.open(`${r.pduURL}?var-pdu_name=${e.pdu_name}`,"_blank")}),a&&f().createElement("span",null,e.pdu_name))},b=({pdu:e,size:t="sm",showName:a=!1,options:r})=>{const n="sm"===t?`${r.pduSize}px`:"md"===t?2*r.pduSize+"px":`${r.pduSize}px`,o="sm"===t?`${r.pduSize}px`:"md"===t?2*r.pduSize+"px":`${r.pduSize}px`,i={fansContainer:x.css`
      display: flex;
      flex-direction: column;
      gap: 2px;
    `,fans:x.css`
      width: ${n};
      height: ${o};
      
      background-color: ${+e.value>0?r.successColor:r.errorColor};
      
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${r.activeColor};
      }
    `};return f().createElement("div",{className:i.fansContainer},Array.from({length:4}).map(((t,a)=>f().createElement(w.Tooltip,{content:e.pdu_name,placement:"auto"},f().createElement("div",{key:a,className:i.fans,onClick:()=>window.open(`${r.fanURL}?var-pdu_name=${e.pdu_name}`,"_blank")})))),a&&f().createElement("span",null,e.pdu_name))};function h(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function k(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),r.forEach((function(t){h(e,t,a[t])}))}return e}function S(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})),e}const O=({options:e,rack:t,row:a,pduData:r,pduStatusData:n,fanData:o})=>{const[i,l]=(0,m.useState)(!1),s={pduContainer:x.css`
      width: ${e.rackSize}px;
      height: ${1.4*e.rackSize}px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1fr;
      
      padding: 1px;
      background-color: #333;
    `,rectangle:x.css`
      width: 100%;
      height: 100%;
    `,rackName:x.css`
      font-size: ${e.RackTextsize}px; 
      &:hover {
        color: ${e.activeColor};
      }
    `,rackContainer:x.css`
      display: flex;
      flex-direction: row;
      align-items: center;
    `,fanContainer:x.css`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    `,fan:x.css`
      margin-right: 2px;
    `},c=r.filter((e=>e.rack_fname===t.rack_fname)),p=n.filter((e=>e.rack_fname===t.rack_fname)),d=o.filter((e=>e.rack_fname===t.rack_fname)),u=c.map((e=>{const t=p.find((t=>t.pdu_name===e.pdu_name));return S(k({},e),{value:t?t.Value:null})})),g=d.map((e=>{const t=p.find((t=>t.pdu_name===e.pdu_name));return S(k({},e),{value:t?t.Value:null})})),_=c.length>0?f().createElement("div",{style:{display:"flex",flexDirection:"column"}},u.map(((t,a)=>f().createElement("div",{key:a,style:{display:"flex",alignItems:"center",marginBottom:"5px"}},f().createElement(v,{pdu:t,size:"sm",showName:!0,options:e}))))):f().createElement("div",null,"No PDU");return f().createElement("div",null,f().createElement("div",{className:s.rackName,onClick:()=>window.open(`${e.rackURL}?var-rack_fname=${t.rack_fname}`,"_blank"),style:{cursor:"pointer"}},t.rack_name),f().createElement("div",{className:s.rackContainer},f().createElement("div",{className:s.fanContainer},g.map(((t,a)=>f().createElement("div",{key:a,className:s.fan},f().createElement(b,{pdu:t,size:"sm",showName:!1,options:e}))))),f().createElement(w.Tooltip,{content:_,placement:"auto"},f().createElement("div",{onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1)},f().createElement("div",{className:s.pduContainer},u.map(((t,a)=>f().createElement(v,{key:a,pdu:t,size:"md",showName:!1,options:e}))))))))},z=({rail:e,size:t="md",showName:a=!1,options:r})=>{const n="sm"===t?2*r.railSize+"px":"md"===t?`${r.railSize}px`:.8*r.railSize+"px",o="sm"===t?2*r.railSize+"px":"md"===t?.1*r.railSize+"px":.8*r.railSize+"px",i={railContainer:x.css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      
    `,rail:x.css`
      display: flex;
      width: ${n};
      height: ${o};
      background-color: ${+e.value>0?r.successColor:r.errorColor};
      margin-right: 1px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${r.activeColor};
      }
    `,railName:x.css`
      font-size: 10px;
      color: #999;
      margin-right: 8px;
      
    `};return f().createElement("div",{className:i.railContainer},f().createElement(w.Tooltip,{placement:"right",content:f().createElement("div",null,f().createElement("div",{style:{fontSize:`${r.railTextsize}px`,fontWeight:"bold",marginBottom:"4px"}},e.rail_name),f().createElement("div",{style:{fontSize:"12px",marginBottom:"4px"}},e.pdu_name),f().createElement("div",{style:{fontSize:"12px",marginBottom:"4px"}},e.pdu_ip))},f().createElement("div",null,f().createElement("div",{className:i.rail,onClick:()=>window.open(`${r.railURL}?var-pdu_name=${e.pdu_name}`,"_blank")}),a&&f().createElement("span",null,e.pdu_name))))};function P(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function E(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),r.forEach((function(t){P(e,t,a[t])}))}return e}function C(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})),e}const j=({options:e,pduData:t,rackData:a,railData:r,row:n,pduStatusData:o,fanData:i,tcpStatusData:l})=>{const s={container:x.css`
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      margin-bottom: 2px;
    `,rowName:x.css`
      font-weight: bold;
      margin-bottom: 2px;
      font-size: ${e.rowTextsize}px;
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
        color: ${e.activeColor};
      }
    `,rackContainer:x.css`
      display: flex;
      gap: 5px;
      
    `,railContainer:x.css`
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
    `,rowheader:x.css`
      display: flex;
      flex-direction: row;
    `},c=t.filter((e=>e.row_name===n.row_name)),p=o.filter((e=>e.row_name===n.row_name)),d=i.filter((e=>e.row_name===n.row_name)),u=r.filter((e=>"string"==typeof e.pdu_name&&"string"==typeof n.row_name&&e.pdu_name.toLowerCase().includes(n.row_name.toLowerCase()))).map((e=>{const t=e.pdu_name.match(/(master\d+)/i),a=t?t[1]:null;return C(E({},e),{master_name:a})})).map((e=>{const t=l.find((t=>t.host_name===e.master_name));return C(E({},e),{value:t?t._value:null})}));return f().createElement("div",{className:s.container},f().createElement("div",{className:s.rowheader},f().createElement(w.Tooltip,{placement:"right",content:f().createElement("div",null,f().createElement("div",{style:{fontSize:"14px",fontWeight:"bold",marginBottom:"4px"}},n.row_name),f().createElement("div",{style:{fontSize:"10px",color:"#999"}},"Racks: ",a.length),f().createElement("div",{style:{fontSize:"10px",color:"#999"}},"PDUs: ",t.length))},f().createElement("div",{className:s.rowName,onClick:()=>window.open(`${e.rowURL}?var-row=${n.row_name}`,"_blank"),style:{cursor:"pointer"}},n.row_name))),u.length>0&&f().createElement("div",{id:"railContainer",className:s.railContainer},u.map((t=>f().createElement(z,{rail:t,options:e})))),f().createElement("div",{className:s.rackContainer},a.map((t=>f().createElement(O,{rack:t,row:n,pduData:c,pduStatusData:p,fanData:d,options:e})))))};function D(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function U(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})),e}const R=()=>({textBox:x.css`
      position: absolute;
      bottom: 0;
      right: 50px;
      padding: 10px;
      font-size: 10px;
      color: #999;
    `,AlertingPanelContainer:x.css`
      width: 100%;
      height: 100%;
      max-height: 100%;
      overflow: auto; 
      display: flex;
      flex-direction: row;
    `,rowContainer:x.css`
      display: flex;
      flex-direction: column;
      gap: 5px;
    `,upsContainer:x.css`
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-right: 10px;
      margin-left: 10px;
    `}),T=({options:e,data:t,fieldConfig:a,id:r})=>{const n=(0,w.useStyles2)(R);if(0===t.series.length)return f().createElement(_.PanelDataErrorView,{fieldConfig:a,panelId:r,data:t,needsStringField:!0});const o=g(t.series,"rackInfo",["rack_fname","rack_name","rack_owner","rack_group","row_id","row_name","dc_name","dc_location","room_name","pdu_count","_value"]),i=g(t.series,"pduInfo",["pdu_name","pdu_group","pdu_model","pdu_serial","pdu_firmware","pdu_master","pdu_type","pdu_mac","pdu_ip","rack_fname","dc_location","rail_name","row_name","_value"]),l=g(t.series,"alertingStatus",["host_name","pdu_name","row_name","rack_name","rack_fname","Value"]),s=g(t.series,"railInfo",["pdu_master","pdu_name","pdu_group","pdu_model","pdu_master","pdu_type","pdu_ip","rail_name","_value"]),c=g(t.series,"fanInfo",["pdu_name","pdu_group","pdu_model","pdu_serial","pdu_firmware","pdu_master","pdu_type","pdu_mac","pdu_ip","rack_fname","dc_location","rail_name","row_name","_value"]),p=g(t.series,"upsInfo",["pdu_name","rail_name","_value"]),d=g(t.series,"tcpStatus",["host_name","pdu_name","row_name","rack_name","rack_fname","probe_success","Value"]),u=p.map((e=>{const t=l.find((t=>t.pdu_name===e.pdu_name));return U(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),r.forEach((function(t){D(e,t,a[t])}))}return e}({},e),{value:t?t.Value:null})})),x=(0,m.useMemo)((()=>{const e=new Map;return o.forEach((t=>{t.row_name&&t.row_id&&!e.has(t.row_name)&&e.set(t.row_name,t.row_id)})),Array.from(e.entries()).map((([e,t])=>({row_name:e,row_id:t}))).sort(((e,t)=>e.row_name.localeCompare(t.row_name)))}),[o]);return f().createElement("div",{className:n.AlertingPanelContainer},f().createElement("div",{className:n.upsContainer},u.map((t=>f().createElement(y,{ups:t,options:e})))),f().createElement("div",{className:n.rowContainer},x.map((t=>{const a=i.filter((e=>e.row_name===t.row_name)),r=o.filter((e=>e.row_name===t.row_name)),n=l.filter((e=>e.row_name===t.row_name||"modbus"===e.device_type));return f().createElement(j,{row:t,pduData:a,rackData:r,railData:s,fanData:c,pduStatusData:n,tcpStatusData:d,options:e})}))),f().createElement("div",{className:n.textBox},"PDU Panel by EPFL/ITOP-INFR v.0.2"))},$=new u.PanelPlugin(T).setPanelOptions((e=>e.addColorPicker({path:"successColor",name:"Success Color",description:"Success Color",defaultValue:"#00ff00",category:["Global"]}).addColorPicker({path:"errorColor",name:"Error Color",description:"Error Color",defaultValue:"#ff0000",category:["Global"]}).addColorPicker({path:"activeColor",name:"Active Color",description:"Mouse over Active Color",defaultValue:"#0000ff",category:["Global"]}).addSliderInput({path:"upsSizeWidth",name:"UPS dimensions",description:"UPS dimensions",category:["UPS"],defaultValue:100,settings:{min:10,max:300,step:1}}).addSliderInput({path:"upsSizeHeight",name:"UPS dimensions",description:"UPS dimensions",category:["UPS"],defaultValue:100,settings:{min:10,max:300,step:1}}).addTextInput({path:"upsTextsize",name:"upsTextsize",description:"UPS Text size",defaultValue:"12",category:["UPS"]}).addTextInput({path:"upsURL",name:"upsURL",description:"UPS URL",defaultValue:"/d/ae0ubbk3if400d/datacenter-view-ups",category:["UPS"]}).addTextInput({path:"rowURL",name:"rowURL",description:"Row URL",defaultValue:"/d/cdou123admle29sf/datacenter-view-rack",category:["Row"]}).addTextInput({path:"rowTextsize",name:"rowTextsize",description:"Row Text size",defaultValue:"10",category:["Row"]}).addTextInput({path:"railURL",name:"railURL",description:"Rail URL",defaultValue:"/d/fdyyae74x0irka/datacenter-view-rail",category:["Rail"]}).addTextInput({path:"railTextsize",name:"railTextsize",description:"Rail Text size",defaultValue:"14",category:["Rail"]}).addSliderInput({path:"railSize",name:"railSize",description:"Rail dimensions",category:["Rail"],defaultValue:50,settings:{min:10,max:400,step:1}}).addTextInput({path:"rackURL",name:"rackURL",description:"Rack URL",defaultValue:"/d/cdou123admle29sf/datacenter-view-rack",category:["Rack"]}).addTextInput({path:"fanURL",name:"fanURL",description:"Fan URL",defaultValue:"/d/ce0xm7wjr9ywwe/datacenter-view-fan",category:["Rack"]}).addTextInput({path:"RackTextsize",name:"Rack Textsize",description:"Rack Text size",defaultValue:"10",category:["Rack"]}).addSliderInput({path:"rackSize",name:"rackSize",description:"Rack dimensions",category:["Rack"],defaultValue:30,settings:{min:15,max:50,step:1}}).addTextInput({path:"pduURL",name:"pduURL",description:"PDU URL",defaultValue:"/d/ddqco4d3utj4asd/datacenter-view-pdu",category:["PDU"]}).addTextInput({path:"PDUTextsize",name:"PDU Text size",description:"PDU Text size",defaultValue:"12",category:["PDU"]}).addBooleanSwitch({path:"tooltips",name:"Tooltips",defaultValue:!0,category:["PDU"]}).addTextInput({path:"TooltipTextsize",name:"Tooltip Text size",description:"Tooltip Text size",defaultValue:"12",category:["PDU"]}).addSliderInput({path:"pduSize",name:"pduSize",description:"PDU dimensions",category:["PDU"],defaultValue:5,settings:{min:1,max:10,step:1}})));return c})()));
//# sourceMappingURL=module.js.map