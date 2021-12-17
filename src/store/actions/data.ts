import Coin from "../../models/Coin";

export const SET_PORTFOLIO_DATA = 'SET_PORTFOLIO_DATA';
export const ADD_PORTFOLIO_DATA = 'ADD_PORTFOLIO_DATA';

const setPortfolioData = (portfolio: Coin[]) => ({
  type: SET_PORTFOLIO_DATA,
  portfolio
});


const addPortfolioData = (newCoin: Coin) => ({
  type: ADD_PORTFOLIO_DATA,
  newCoin
});

