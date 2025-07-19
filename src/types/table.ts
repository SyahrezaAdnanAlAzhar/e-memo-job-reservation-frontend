export interface TableHeader {
    key: string;
    label: string;
    class?: string;
    sortable?: boolean;
}


export interface SortState {
  key: string;
  direction: 'asc' | 'desc';
}