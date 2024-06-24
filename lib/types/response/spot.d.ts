export interface SpotBalance {
    coin: string;
    coinId: string;
    coinName: string;
    total: string;
    free: string;
    locked: string;
}
export interface SpotBalances {
    balances: SpotBalance[];
}
export interface SpotLastPrice {
    symbol: string;
    price: string;
}
