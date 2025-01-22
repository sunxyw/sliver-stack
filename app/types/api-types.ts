export enum ApiCode {
  SUCCESS = 0,
}

export type GenericApiResponse = {
  code: ApiCode;
  ok: boolean;
  msg?: string;
};

export type ApiDataResponse<T> = GenericApiResponse & {
  data: T;
};

export type ApiListResponse<T> = GenericApiResponse & {
  list: T[];
};

export type ApiPaginatedListResponse<T> = ApiListResponse<T> & {
  page: {
    pageNum: number;
    pageSize: number;
    total: number;
  };
};
