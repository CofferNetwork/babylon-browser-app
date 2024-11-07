import api from "./request";
import { ApiResponse, Pagination, Staker, StakerDetail } from "./type";

export const getStaker = (
  params: { address?: string; pi?: number; pn?: number } = {}
) => {
  return api
    .get(
      `v3/stats/staker?staker_address=${params.address || ""}&pi=${
        params.pi || ""
      }&pn=${params.pn || ""}`
    )
    .json<ApiResponse<Pagination<Staker>>>();
};

export const getStakerByAddress = (
  params: { address?: string; pi?: number; pn?: number } = {}
) => {
  return api
    .get(
      `v3/stats/staker?staker_address=${params.address || ""}&pi=${
        params.pi || ""
      }&pn=${params.pn || ""}`
    )
    .json<ApiResponse<StakerDetail>>();
};

export const getProvider = (params: { pi?: number; pn?: number } = {}) => {
  return api
    .get(`v3/finality_providers?pi=${params.pi}&pn=${params.pn}`)
    .json<ApiResponse<Pagination<Staker>>>();
};
