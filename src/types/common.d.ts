export interface AjaxRes {
  data: any | null;
  code: number;
  timeStamp: number;
  message: string;
  success: boolean;
}

export interface PageList {
  page: {
    list: any[];
    total: number;
    pageIndex: number;
    pageSize: number;
  };
}
