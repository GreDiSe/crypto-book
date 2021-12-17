import { AnyAction } from 'redux';
import Coin from '../../models/Coin';
import {ADD_WATCHLIST_COINS, SET_WATCHLIST_DATA} from '../actions/watchlist';

export interface WatchlistState {
  watchlistData: Coin[];
  watchlistCoins: any;
}

const initialState: WatchlistState = {
  watchlistData: [],
  watchlistCoins: ['BTC', 'XRP', 'BCH', 'ETH', 'DOGE', 'LTC'],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_WATCHLIST_DATA:
      return {
        ...state,
        watchlistData: action.coinData,
      };
    case ADD_WATCHLIST_COINS:
      return {
        ...state,
        watchlistCoins: [...state.watchlistCoins, action.newCoin],
      };
  }
  return state;
};
