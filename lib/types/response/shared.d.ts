export interface SymbolWalletBalance {
    equity: number;
    available_balance: number;
    used_margin: number;
    order_margin: number;
    position_margin: number;
    occ_closing_fee: number;
    occ_funding_fee: number;
    wallet_balance: number;
    realised_pnl: number;
    unrealised_pnl: number;
    cum_realised_pnl: number;
    given_cash: number;
    service_cash: number;
}
export interface WalletBalances {
    [symbol: string]: SymbolWalletBalance | undefined;
}
