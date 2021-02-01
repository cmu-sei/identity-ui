// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.


export interface ClientSummary {
    id?: number;
    name?: string;
    displayName?: string;
    description?: string;
    enabled?: boolean;
    logoUri?: string;
    clientUri?: string;
    eventReferenceUri?: string;
}

export interface Client {
    id?: number;
    name?: string;
    displayName?: string;
    enabled?: boolean;
    grants?: string;
    scopes?: string;
    requirePkce?: boolean;
    allowPlainTextPkce?: boolean;
    allowAccessTokensViaBrowser?: boolean;

    // consent behavior
    requireConsent?: boolean;
    allowRememberConsent?: boolean;
    consentLifetime?: string;

    // tokens behavior
    alwaysIncludeUserClaimsInIdToken?: boolean;
    identityTokenLifetime?: string;
    accessTokenLifetime?: string;
    authorizationCodeLifetime?: string;

    // refresh behavior
    allowOfflineAccess?: boolean;
    updateAccessTokenClaimsOnRefresh?: boolean;
    useOneTimeRefreshTokens?: boolean;
    // useSlidingRefresh?: boolean;
    slidingRefreshTokenLifetime?: string;
    absoluteRefreshTokenLifetime?: string;

    // urls
    published?: boolean;
    url?: string;
    logoUrl?: string;
    frontChannelLogoutUrl?: string;
    backChannelLogoutUrl?: string;
    redirectUrls?: Array<ClientUri>;
    postLogoutUrls?: Array<ClientUri>;
    corsUrls?: Array<ClientUri>;

    // client claims
    alwaysSendClientClaims?: boolean;
    clientClaimsPrefix?: string;

    secrets?: Array<ClientSecret>;
    claims?: Array<ClientClaim>;
    managers?: Array<ClientManager>;
    // events?: Array<ClientEvent>;
    // eventHandlers?: Array<ClientEventHandler>;
}

export interface ClientSecret {
    id?: number;
    value?: string;
}

export interface ClientClaim {
    id?: number;
    type?: string;
    value?: string;
    clientId?: number;
    deleted?: boolean;
}

export interface ClientManager {
    id?: number;
    subjectId?: string;
    name?: string;
    clientId?: number;
}

export interface ClientEvent {
    id?: number;
    type?: string;
    clientId?: number;
    clientName?: string;
}

export interface ClientEventHandler {
    id?: number;
    enabled?: boolean;
    uri?: string;
    emitterName?: string;
    emitterType?: string;
}

export interface ClientUri {
    id?: number;
    type?: ClientUriTypeEnum;
    typeName?: string;
    value?: string;
    clientId?: number;
    deleted?: boolean;
}

export interface Resource {
    id?: number;
    type?: ResourceTypeEnum;
    name?: string;
    displayName?: string;
    description?: string;
    enabled?: boolean;
    default?: boolean;
    required?: boolean;
    emphasize?: boolean;
    showInDiscoveryDocument?: boolean;
    secrets?: Array<ApiSecret>;
    claims?: Array<ResourceClaim>;
    managers?: Array<ResourceManager>;
}

export interface ApiSecret {
    id?: number;
    value?: string;
}

export interface ResourceManager {
  id?: number;
  subjectId?: string;
  name?: string;
  resourceId?: number;
}

export interface ResourceClaim {
    id?: number;
    resourceId?: number;
    type?: string;
}

export interface NewClient {
    displayName?: string;
    description?: string;
}


export interface Account {
    id?: number;
    globalId?: string;
    role?: string;
    whenCreated?: string;
    lastLogin?: string;
    lastIp?: string;
    lockTimeRemaining?: string;
    lockedSeconds?: number;
    status?: string;
    hasTOTP?: boolean;
    username?: string;
    name?: string;
    email?: string;
    avatar?: string;
    orgLogo?: string;
    unitLogo?: string;
    enabled?: boolean;
    properties?: Array<AccountProperty>;
}

export interface AccountProperty {
    id?: number;
    accountId?: number;
    accountName?: string;
    key?: string;
    value?: string;
}

export interface Credentials {
    username?: string;
    password?: string;
    code?: string;
}

export interface OverrideCode {
    id?: number;
    code?: string;
    description?: string;
    whenCreated?: string;
}

export interface NewOverrideCode {
    code?: string;
    description?: string;
}

export interface AccountProfile {
    globalId?: string;
    name?: string;
    biography?: string;
    avatar?: string;
    org?: string;
    unit?: string;
    orgLogo?: string;
    unitLogo?: string;
    updatedAt?: string;
}

export interface AuthProfile {
    id?: string;
    name?: string;
    role?: string;
}

export interface AccountMergeCode {
  code?: string;
}

export interface TokenSummary {
  credentialCount?: number;
  certificateCount?: number;
  hasPassword?: boolean;
  hasTotp?: boolean;
  currentCertificateRegistered?: boolean;
  currentCertificateSubject?: string;
  currentCertificateIssuer?: string;
  emails?: Array<string>;
  complexityRequirement?: string;
  complexityRegex?: string;
  allowMultipleCredentials?: boolean;
  allowedDomains?: string;
}

export interface ChangedPassword {
  currentPassword?: string;
  value?: string;
  confirm?: string;
}

export interface AlternateAccountProfile {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    avatar_url?: string;
}

export interface UsernameRegistrationModel {
  usernames?: Array<string>;
  password?: string;
}

export interface UsernameRegistration {
  username?: string;
  displayName?: string;
  message?: string;
}

export interface NewResource {
    type?: ResourceTypeEnum;
    displayName?: string;
    description?: string;
    enabled?: boolean;
    default?: boolean;
    required?: boolean;
    emphasize?: boolean;
    showInDiscoveryDocument?: boolean;
}

export interface ChangedResource {
    id?: number;
    type?: ResourceTypeEnum;
    name?: string;
    displayName?: string;
    description?: string;
    enabled?: boolean;
    default?: boolean;
    required?: boolean;
    emphasize?: boolean;
    showInDiscoveryDocument?: boolean;
}

export enum ClientUriTypeEnum {
    clientUri = 'clientUri' as any,
    logoUri = 'logoUri' as any,
    redirectUri = 'redirectUri' as any,
    postLogoutRedirectUri = 'postLogoutRedirectUri' as any,
    cORSUri = 'cORSUri' as any,
    eventReferenceUri = 'eventReferenceUri' as any,
    frontChannelLogoutUri = 'frontChannelLogoutUri' as any,
    backChannelLogoutUri = 'backChannelLogoutUri' as any,
    eventRegistrationHandlerUri = 'eventRegistrationHandlerUri' as any
}

export enum ResourceTypeEnum {
    none = 'none' as any,
    identity = 'identity' as any,
    api = 'api' as any,
    grant = 'grant' as any
}

export interface TotpResult {
    code?: string;
    timestamp?: Date;
    valid?: boolean;
}

export interface SearchParams {
  term?: string;
  skip?: number;
  take?: number;
  sort?: string;
  filter?: Array<string>;
}

export interface MailMessage {
  to?: string;
  cc?: string;
  bcc?: string;
  from?: string;
  subject?: string;
  body?: string;
}
