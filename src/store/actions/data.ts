import {ThunkDispatch} from "redux-thunk";
import {WatchlistState} from "../reducers/watchlist";
import {Action} from "redux";

export const ADD_PORTFOLIO_DATA = 'ADD_PORTFOLIO_DATA';

export const addPortfolioData = (newSymbol: any) => {
  return async (dispatch: ThunkDispatch<WatchlistState, void, Action>, getState: any) => {

    const stateData = await getState().data;
    const amountList = [...stateData.amountList] as any;
    const portfolio = [...stateData.portfolio] as any;

    const indexInRow = portfolio.findIndex((symbol: any) => symbol === newSymbol);

    if(indexInRow >= 0) {
      ++amountList[indexInRow];
    } else {
      portfolio.push(newSymbol);
      amountList.push(1)
    }


    console.log('portfolio,portfolio', portfolio);
    return dispatch({
      type: ADD_PORTFOLIO_DATA,
      amountList,
      portfolio
    });
  }
}

