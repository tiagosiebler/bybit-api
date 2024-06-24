import { ExecTypeV5 } from '../v5-shared';
export interface GetPreUpgradeOrderHistoryParamsV5 {
    category: 'linear' | 'inverse';
    symbol?: string;
    baseCoin?: string;
    orderId?: string;
    orderLinkId?: string;
    orderFilter?: 'Order' | 'StopOrder';
    orderStatus?: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
    cursor?: string;
}
export interface GetPreUpgradeTradeHistoryParamsV5 {
    category: 'linear' | 'inverse';
    symbol?: string;
    orderId?: string;
    orderLinkId?: string;
    baseCoin?: string;
    startTime?: number;
    endTime?: number;
    execType?: ExecTypeV5;
    limit?: number;
    cursor?: string;
}
export interface GetPreUpgradeClosedPnlParamsV5 {
    category: 'linear' | 'inverse';
    symbol: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
    cursor?: string;
}
