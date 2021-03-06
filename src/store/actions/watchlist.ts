import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { WatchlistState } from '../reducers/watchlist';
import Coin from '../../models/Coin';
import cmpData from '../../data/CoinMarketCapData';

export const SET_WATCHLIST_DATA = 'SET_WATCHLIST_DATA';
export const ADD_WATCHLIST_COINS = 'ADD_WATCHLIST_COINS';

export const addWatchListCoins = (newCoin: Coin) => ({
  type: ADD_WATCHLIST_COINS,
  newCoin
});

export const fetchCoinData = () => {
  return async (dispatch: ThunkDispatch<WatchlistState, void, Action>, getState: any) => {
    // Will change when user can favorite coins

    try {
      const coins = await getState().watchlist.watchlistCoins || [];
      const cryptoResponse = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
      );
      const cryptoResponseData = await cryptoResponse.json();

      const coinData: Coin[] = [];
      coins.forEach((coin: any) => {
        // Find ID from CMP data, if it doesn't exist use 1
        const coinDetails = cryptoResponseData.RAW[coin].USD;
        const cmpDetails = cmpData.data.find(
          (cmpCoin) => coinDetails.FROMSYMBOL === cmpCoin.symbol
        );
        const coinID = cmpDetails?.id ?? 0;
        const coinName = cmpDetails?.name ?? 'Unknown';
        coinData.push(
          new Coin(
            coinID,
            coinName,
            coin,
            coinDetails.PRICE,
            coinDetails.CHANGEPCT24HOUR
          )
        );
      });

      dispatch({
        type: SET_WATCHLIST_DATA,
        coinData: coinData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updateCoinData = (newData: Coin[]) => {
  return async (dispatch: ThunkDispatch<WatchlistState, void, Action>) => {
    dispatch({
      type: SET_WATCHLIST_DATA,
      coinData: newData,
    });
  };
};
