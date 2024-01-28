export interface StandardResponse<TData> {
  data: TData;
  message: string;
  code: number;
}
