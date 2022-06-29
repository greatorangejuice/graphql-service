export interface IResponse<T> {
  items: Array<T>;
  limit: number;
  offset: number;
  total: number;
}

export interface RemovedItem {
  acknowledged: string;
  deletedCount: boolean;
}
