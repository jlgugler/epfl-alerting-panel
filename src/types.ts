export interface SimpleOptions {
  // global color options //
  successColor: string;
  warningColor: string;
  errorColor: string;
  activeColor: string;

  // UPS panel options //
  upsURL: string;
  upsTextsize: string;
  upsSizeWidth: number;
  upsSizeHeight: number;

  // Rail panel options //
  railURL: string;
  railTextsize: string;
  railSize: number;

  //
  rowURL: string;
  rowTextsize: string; // Could be `number` if you want to ensure it's numeric
  rackURL: string;


  // Rack panel options //
  RackTextsize: string;
  rackSize: number;
  pduURL: string;

  // PDU panel options //
  PDUTextsize: string;
  tooltips: boolean;
  TooltipTextsize: string;
  pduSize: number;
}

