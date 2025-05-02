export interface CadastralHistoryRaw {
  id: number;
  table_name: string;
  field_name: string;
  old_value: string | null;
  new_value: string | null;
  changed_at: string;
  changed_by: string;
  object_id: string;
}

export interface CadastralHistory {
  id: number;
  table_name: string;
  field_name: string;
  old_value: string;
  new_value: string;
  changed_at: string;
  changed_by: string;
  object_id: string;
}

export type CadastralHistoryFilter = {
  search: string;
  period: string;
};



export const mapCadastralHistory = (
  raw: CadastralHistoryRaw
): CadastralHistory => ({
  id: raw.id,
  table_name: raw.table_name || "-",
  field_name: raw.field_name || "-",
  old_value: raw.old_value || "-",
  new_value: raw.new_value || "-",
  changed_at: raw.changed_at || "-",
  changed_by: raw.changed_by || "-",
  object_id: raw.object_id || "-",
});
