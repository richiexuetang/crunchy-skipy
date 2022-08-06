export interface TokenResponseDto {
    access_token: string,
    account_id: string,
    country: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: string
}