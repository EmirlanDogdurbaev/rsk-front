export interface ChangeHistoryRaw {
  id: number;
  table_name: string;
  field_name: string;
  old_value: string | null;
  new_value: string | null;
  changed_at: string;
  changed_by: string;
  object_id: string;
}

export interface ChangeHistory {
  id: number;
  table_name: string;
  field_name: string;
  old_value: string;
  new_value: string;
  changed_at: string;
  changed_by: string;
  object_id: string;
}

export type ChangeHistoryFilter = {
  search: string;
  period: string;
};



export const mapChangeHistory = (
  raw: ChangeHistoryRaw
): ChangeHistory => ({
  id: raw.id,
  table_name: raw.table_name || "-",
  field_name: raw.field_name || "-",
  old_value: raw.old_value || "-",
  new_value: raw.new_value || "-",
  changed_at: raw.changed_at || "-",
  changed_by: raw.changed_by || "-",
  object_id: raw.object_id || "-",
});
