import {SpotClient} from "../../src/spot-client";
import {successResponseListSpot, successResponseObjectSpot} from "../response.util";
import "axios-debug-log"

describe('Spot REST API Endpoints', () => {
    const useLivenet = true;

    const KEY = process.env.BYBIT_KEY
    const SECRET = process.env.BYBIT_SECRET
    const api = new SpotClient(undefined, undefined, useLivenet, {disable_time_sync: true});

    const symbol = 'BTCUSDT';
    const interval = '15';
    const timestampOneHourAgo = (new Date().getTime() / 1000) - (1000 * 60 * 60);
    const from = Number(timestampOneHourAgo.toFixed(0));

    describe('Spot Public endpoints', () => {

        it('getServerTime()', async () => {
            expect(await api.getServerTime()).toMatchObject(successResponseObjectSpot(""));
        });

        it('getSymbols()', async () => {
            expect(await api.getSymbols()).toMatchObject(successResponseListSpot(""));
        });

        it('getOrderBook()', async () => {
            expect(await api.getOrderBook(symbol)).toMatchObject(successResponseObjectSpot());
        });

        it('getMergedOrderBook()', async () => {
            expect(await api.getMergedOrderBook(symbol)).toMatchObject(successResponseObjectSpot());
        });

        it('getTrades()', async () => {
            expect(await api.getTrades(symbol)).toMatchObject(successResponseListSpot());
        });

        it('getCandles()', async () => {
            expect(await api.getCandles(symbol, "1h")).toMatchObject(successResponseListSpot());
        });

        it('get24hrTicker()', async () => {
            expect(await api.get24hrTicker(symbol)).toMatchObject(successResponseObjectSpot());
        });

        it('getLastTradedPrice()', async () => {
            expect(await api.getLastTradedPrice(symbol)).toMatchObject(successResponseObjectSpot());
        });

        it('getBestBidAskPrice()', async () => {
            expect(await api.getLastTradedPrice(symbol)).toMatchObject(successResponseObjectSpot());
        });

    });

});
