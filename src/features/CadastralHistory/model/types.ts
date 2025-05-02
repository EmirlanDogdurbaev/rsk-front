export interface ApprovalHistoryRaw {
  id: number;
  contract: number;
  contract_number: string;
  request_type: string;
  request_type_display: string;
  status: string;
  status_display: string;
  request_date: string;
  response_date: string | null;
  requested_by: number | null;
  requested_by_name: string | null;
  rejection_reason: string | null;
}

export interface ApprovalHistory {
  id: number;
  contract_number: string;
  request_type: string;
  request_date: string;
  requested_by_name: string;
  response_date: string;
  status: string;
}

export type CadastralHistoryFilter = {
  branch: string;
  searchEnm: string;
  requestType: string;
  executor: string;
  period: string;
};

export interface StatusCounters {
  total: number;
  registered: number;
  removed: number;
  rejected: number;
  inProgress: number;
}

export interface Column<T> {
  key: string;
  header: string;
  width: string;
  render: (item: T, index: number) => React.ReactNode;
}

export const mapApprovalHistory = (
  raw: ApprovalHistoryRaw
): ApprovalHistory => ({
  id: raw.id,
  contract_number: raw.contract_number || "-",
  request_type: raw.request_type_display || "-",
  request_date: raw.request_date || "-",
  requested_by_name: raw.requested_by_name || "-",
  response_date: raw.response_date || "-",
  status: raw.status_display || "-",
});
