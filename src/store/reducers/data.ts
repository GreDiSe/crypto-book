import { AnyAction } from 'redux';
import { SET_PORTFOLIO_DATA, ADD_PORTFOLIO_DATA } from '../actions/data';
import Coin from "../../models/Coin";

export interface NewsState {
    newsData: Coin[];
    portfolio: any
}

const initialState: NewsState = {
    newsData: [],
    portfolio: []
};

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_PORTFOLIO_DATA:
            return {
                portfolio: action.portfolio,
            };
        case ADD_PORTFOLIO_DATA:
            return {
                portfolio: [...state.portfolio, action.newCoin],
            };
    }
    return state;
};
