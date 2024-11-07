/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesError {
  err?: any;
  errorCode?: TypesErrorCode;
  statusCode?: number;
}

export interface GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesTransactionInfo {
  output_index?: number;
  tx_hex?: string;
}

export interface HandlerPublicResponseArrayV1ServiceDelegationPublic {
  data?: V1ServiceDelegationPublic[];
  pagination?: HandlerPaginationResponse;
}

export interface HandlerPublicResponseArrayV1ServiceFpDetailsPublic {
  data?: V1ServiceFpDetailsPublic[];
  pagination?: HandlerPaginationResponse;
}

export interface HandlerPublicResponseArrayV1ServiceStakerStatsPublic {
  data?: V1ServiceStakerStatsPublic[];
  pagination?: HandlerPaginationResponse;
}

export interface HandlerPublicResponseArrayV2ServiceFinalityProviderPublic {
  data?: V2ServiceFinalityProviderPublic[];
  pagination?: HandlerPaginationResponse;
}

export interface HandlerPublicResponseArrayV2ServiceStakerDelegationPublic {
  data?: V2ServiceStakerDelegationPublic[];
  pagination?: HandlerPaginationResponse;
}

export interface HandlerPublicResponseV1ServiceDelegationPublic {
  data?: V1ServiceDelegationPublic;
  pagination?: HandlerPaginationResponse;
}

export interface HandlerPublicResponseV1ServiceGlobalParamsPublic {
  data?: V1ServiceGlobalParamsPublic;
  pagination?: HandlerPaginationResponse;
}

export interface HandlerPublicResponseV1ServiceOverallStatsPublic {
  data?: V1ServiceOverallStatsPublic;
  pagination?: HandlerPaginationResponse;
}

export interface HandlerPublicResponseV2ServiceGlobalParamsPublic {
  data?: V2ServiceGlobalParamsPublic;
  pagination?: HandlerPaginationResponse;
}

export interface HandlerPublicResponseV2ServiceOverallStatsPublic {
  data?: V2ServiceOverallStatsPublic;
  pagination?: HandlerPaginationResponse;
}

export interface HandlerPublicResponseV2ServiceStakerStatsPublic {
  data?: V2ServiceStakerStatsPublic;
  pagination?: HandlerPaginationResponse;
}

export interface HandlerResult {
  data?: any;
  status?: number;
}

export interface HandlerPaginationResponse {
  next_key?: string;
}

export interface TypesBTCParams {
  btc_confirmation_depth?: number;
  version?: number;
}

export interface TypesBabylonParams {
  covenant_pks?: string[];
  covenant_quorum?: number;
  delegation_creation_base_gas_fee?: number;
  max_active_finality_providers?: number;
  max_staking_amount?: number;
  max_staking_time?: number;
  min_commission_rate?: number;
  min_slashing_tx_fee?: number;
  min_staking_amount?: number;
  min_staking_time?: number;
  min_unbonding_time?: number;
  slashing_pk_script?: string;
  slashing_rate?: number;
  unbonding_fee?: number;
  version?: number;
}

export enum TypesErrorCode {
  InternalServiceError = "INTERNAL_SERVICE_ERROR",
  ValidationError = "VALIDATION_ERROR",
  NotFound = "NOT_FOUND",
  BadRequest = "BAD_REQUEST",
  Forbidden = "FORBIDDEN",
  UnprocessableEntity = "UNPROCESSABLE_ENTITY",
  RequestTimeout = "REQUEST_TIMEOUT",
}

export interface TypesFinalityProviderDescription {
  details?: string;
  identity?: string;
  moniker?: string;
  security_contact?: string;
  website?: string;
}

export enum TypesFinalityProviderState {
  FinalityProviderStateActive = "active",
  FinalityProviderStateStandby = "standby",
}

export interface V1HandlersDelegationCheckPublicResponse {
  code?: number;
  data?: boolean;
}

export interface V1HandlersUnbondDelegationRequestPayload {
  staker_signed_signature_hex?: string;
  staking_tx_hash_hex?: string;
  unbonding_tx_hash_hex?: string;
  unbonding_tx_hex?: string;
}

export interface V1ServiceDelegationPublic {
  finality_provider_pk_hex?: string;
  is_overflow?: boolean;
  staker_pk_hex?: string;
  staking_tx?: V1ServiceTransactionPublic;
  staking_tx_hash_hex?: string;
  staking_value?: number;
  state?: string;
  unbonding_tx?: V1ServiceTransactionPublic;
}

export interface V1ServiceFpDescriptionPublic {
  details?: string;
  identity?: string;
  moniker?: string;
  security_contact?: string;
  website?: string;
}

export interface V1ServiceFpDetailsPublic {
  active_delegations?: number;
  active_tvl?: number;
  btc_pk?: string;
  commission?: string;
  description?: V1ServiceFpDescriptionPublic;
  total_delegations?: number;
  total_tvl?: number;
}

export interface V1ServiceGlobalParamsPublic {
  versions?: V1ServiceVersionedGlobalParamsPublic[];
}

export interface V1ServiceOverallStatsPublic {
  active_delegations?: number;
  active_tvl?: number;
  pending_tvl?: number;
  total_delegations?: number;
  total_stakers?: number;
  total_tvl?: number;
  unconfirmed_tvl?: number;
  slash_amount?: number;
  slash_transactions?: number;
  stacking_transactions_count?: number;
  unbound_amount?: number;
  unbound_transactions_count?: number;
}

export interface V1ServiceStakerStatsPublic {
  active_delegations?: number;
  active_tvl?: number;
  staker_pk_hex?: string;
  total_delegations?: number;
  total_tvl?: number;
}

export interface V1ServiceTransactionPublic {
  output_index?: number;
  start_height?: number;
  start_timestamp?: string;
  timelock?: number;
  tx_hex?: string;
}

export interface V1ServiceVersionedGlobalParamsPublic {
  activation_height?: number;
  cap_height?: number;
  confirmation_depth?: number;
  covenant_pks?: string[];
  covenant_quorum?: number;
  max_staking_amount?: number;
  max_staking_time?: number;
  min_staking_amount?: number;
  min_staking_time?: number;
  staking_cap?: number;
  tag?: string;
  unbonding_fee?: number;
  unbonding_time?: number;
  version?: number;
}

export interface V2ServiceFinalityProviderPublic {
  active_delegations?: number;
  active_tvl?: number;
  btc_pk?: string;
  commission?: string;
  description?: TypesFinalityProviderDescription;
  state?: TypesFinalityProviderState;
  total_delegations?: number;
  total_tvl?: number;
}

export interface V2ServiceGlobalParamsPublic {
  babylon?: TypesBabylonParams[];
  btc?: TypesBTCParams[];
}

export interface V2ServiceOverallStatsPublic {
  active_delegations?: number;
  active_finality_providers?: number;
  active_stakers?: number;
  active_tvl?: number;
  total_delegations?: number;
  total_finality_providers?: number;
  total_stakers?: number;
  total_tvl?: number;
}

export interface V2ServiceStakerDelegationPublic {
  finality_provider_pk_hex?: string;
  staker_pk_hex?: string;
  staking_start_height?: number;
  staking_tx?: GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesTransactionInfo;
  staking_tx_hash_hex?: string;
  staking_value?: number;
  state?: string;
  timelock?: number;
  unbonding_start_height?: number;
  unbonding_tx?: GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesTransactionInfo;
}

export interface V2ServiceStakerStatsPublic {
  active_delegations?: number;
  active_tvl?: number;
  staker_pk_hex?: string;
  total_delegations?: number;
  total_tvl?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Babylon Staking API
 * @version 1.0
 * @license API Access License (https://docs.babylonlabs.io/assets/files/api-access-license.pdf)
 * @contact <contact@babylonlabs.io>
 *
 * The Babylon Staking API offers information about the state of the Phase-1 BTC Staking system.
 * Your access and use is governed by the API Access License linked to below.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  healthcheck = {
    /**
     * @description Health check the service, including ping database connection
     *
     * @tags shared
     * @name HealthcheckList
     * @summary Health check endpoint
     * @request GET:/healthcheck
     */
    healthcheckList: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/healthcheck`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  v1 = {
    /**
     * @description Retrieves a delegation by a given transaction hash
     *
     * @tags v1
     * @name DelegationList
     * @request GET:/v1/delegation
     */
    delegationList: (
      query: {
        /** Staking transaction hash in hex format */
        staking_tx_hash_hex: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HandlerPublicResponseV1ServiceDelegationPublic,
        GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesError
      >({
        path: `/v1/delegation`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches details of all active finality providers sorted by their active total value locked (ActiveTvl) in descending order.
     *
     * @tags v1
     * @name FinalityProvidersList
     * @summary Get Active Finality Providers
     * @request GET:/v1/finality-providers
     */
    finalityProvidersList: (
      query?: {
        /** Public key of the finality provider to fetch */
        fp_btc_pk?: string;
        /** Pagination key to fetch the next page of finality providers */
        pagination_key?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerPublicResponseArrayV1ServiceFpDetailsPublic, any>({
        path: `/v1/finality-providers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves the global parameters for Babylon, including finality provider details.
     *
     * @tags v1
     * @name GlobalParamsList
     * @summary Get Babylon global parameters
     * @request GET:/v1/global-params
     */
    globalParamsList: (params: RequestParams = {}) =>
      this.request<HandlerPublicResponseV1ServiceGlobalParamsPublic, any>({
        path: `/v1/global-params`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Check if a staker has an active delegation by the staker BTC address (Taproot or Native Segwit) Optionally, you can provide a timeframe to check if the delegation is active within the provided timeframe The available timeframe is "today" which checks after UTC 12AM of the current day
     *
     * @tags v1
     * @name StakerDelegationCheckList
     * @request GET:/v1/staker/delegation/check
     */
    stakerDelegationCheckList: (
      query: {
        /** Staker BTC address in Taproot/Native Segwit format */
        address: string;
        /** Check if the delegation is active within the provided timeframe */
        timeframe?: "today";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        V1HandlersDelegationCheckPublicResponse,
        GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesError
      >({
        path: `/v1/staker/delegation/check`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves delegations for a given staker
     *
     * @tags v1
     * @name StakerDelegationsList
     * @request GET:/v1/staker/delegations
     */
    stakerDelegationsList: (
      query: {
        /** Staker BTC Public Key */
        staker_btc_pk: string;
        /** Filter by state */
        state?: "active" | "unbonding_requested" | "unbonding" | "unbonded" | "withdrawn";
        /** Pagination key to fetch the next page of delegations */
        pagination_key?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HandlerPublicResponseArrayV1ServiceDelegationPublic,
        GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesError
      >({
        path: `/v1/staker/delegations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves public keys for the given BTC addresses. This endpoint
     *
     * @tags v1
     * @name StakerPubkeyLookupList
     * @request GET:/v1/staker/pubkey-lookup
     */
    stakerPubkeyLookupList: (
      query: {
        /** List of BTC addresses to look up (up to 10), currently only supports Taproot and Native Segwit addresses */
        address: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerResult, GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesError>({
        path: `/v1/staker/pubkey-lookup`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches overall stats for babylon staking including tvl, total delegations, active tvl, active delegations and total stakers.
     *
     * @tags v1
     * @name StatsList
     * @summary Get Overall Stats
     * @request GET:/v1/stats
     */
    statsList: (params: RequestParams = {}) =>
      this.request<HandlerPublicResponseV1ServiceOverallStatsPublic, any>({
        path: `/v1/stats`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches staker stats for babylon staking including tvl, total delegations, active tvl and active delegations. If staker_btc_pk query parameter is provided, it will return stats for the specific staker. Otherwise, it will return the top stakers ranked by active tvl.
     *
     * @tags v1
     * @name StatsStakerList
     * @summary Get Staker Stats
     * @request GET:/v1/stats/staker
     */
    statsStakerList: (
      query?: {
        /** Public key of the staker to fetch */
        staker_btc_pk?: string;
        /** Pagination key to fetch the next page of top stakers */
        pagination_key?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HandlerPublicResponseArrayV1ServiceStakerStatsPublic,
        GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesError
      >({
        path: `/v3/stats/staker`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Unbonds a delegation by processing the provided transaction details. This is an async operation.
     *
     * @tags v1
     * @name UnbondingCreate
     * @summary Unbond delegation
     * @request POST:/v1/unbonding
     */
    unbondingCreate: (payload: V1HandlersUnbondDelegationRequestPayload, params: RequestParams = {}) =>
      this.request<void, GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesError>({
        path: `/v1/unbonding`,
        method: "POST",
        body: payload,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Checks if a delegation identified by its staking transaction hash is eligible for unbonding.
     *
     * @tags v1
     * @name UnbondingEligibilityList
     * @summary Check unbonding eligibility
     * @request GET:/v1/unbonding/eligibility
     */
    unbondingEligibilityList: (
      query: {
        /** Staking Transaction Hash Hex */
        staking_tx_hash_hex: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesError>({
        path: `/v1/unbonding/eligibility`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  v2 = {
    /**
     * @description Fetches finality providers including their public keys, active tvl, total tvl, descriptions, commission, active delegations and total delegations etc
     *
     * @tags v2
     * @name FinalityProvidersList
     * @summary Get Finality Providers
     * @request GET:/v2/finality-providers
     */
    finalityProvidersList: (
      query?: {
        /** Pagination key to fetch the next page of finality providers */
        pagination_key?: string;
        /** Filter by finality provider public key */
        finality_provider_pk?: string;
        /** Sort by field */
        sort_by?: "active_tvl" | "name" | "commission";
        /** Order */
        order?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HandlerPublicResponseArrayV2ServiceFinalityProviderPublic,
        GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesError
      >({
        path: `/v2/finality-providers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches global parameters for babylon chain and BTC chain
     *
     * @tags v2
     * @name GlobalParamsList
     * @summary Get Global Parameters
     * @request GET:/v2/global-params
     */
    globalParamsList: (params: RequestParams = {}) =>
      this.request<HandlerPublicResponseV2ServiceGlobalParamsPublic, any>({
        path: `/v2/global-params`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches staker delegations for babylon staking including tvl, total delegations, active tvl, active delegations and total stakers.
     *
     * @tags v2
     * @name StakerDelegationsList
     * @summary Get Staker Delegations
     * @request GET:/v2/staker/delegations
     */
    stakerDelegationsList: (
      query: {
        /** Staking transaction hash in hex format */
        staking_tx_hash_hex: string;
        /** Pagination key to fetch the next page of delegations */
        pagination_key?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HandlerPublicResponseArrayV2ServiceStakerDelegationPublic,
        GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesError
      >({
        path: `/v2/staker/delegations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches staker stats for babylon staking including active tvl, total tvl, active delegations and total delegations.
     *
     * @tags v2
     * @name StakerStatsList
     * @summary Get Staker Stats
     * @request GET:/v2/staker/stats
     */
    stakerStatsList: (params: RequestParams = {}) =>
      this.request<HandlerPublicResponseV2ServiceStakerStatsPublic, any>({
        path: `/v2/staker/stats`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Overall system stats
     *
     * @tags v2
     * @name StatsList
     * @request GET:/v2/stats
     */
    statsList: (params: RequestParams = {}) =>
      this.request<
        HandlerPublicResponseV2ServiceOverallStatsPublic,
        GithubComBabylonlabsIoStakingApiServiceInternalSharedTypesError
      >({
        path: `/v2/stats`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}


export const api = new Api({
  baseUrl: import.meta.env.VITE_APP_API_HOST
});