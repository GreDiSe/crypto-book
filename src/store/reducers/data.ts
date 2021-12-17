import { AnyAction } from 'redux';
import { ADD_PORTFOLIO_DATA } from '../actions/data';

export interface NewsState {
    portfolio: any;
    amountList: any;
}

const initialState: NewsState = {
    amountList: [1, 5, 7, 6, 5, 7, 2, 5, 7, 4],
    portfolio: [
        "btc",
        "eth",
        "xrp",
        "hbar",
        "near",
        "xtz",
        "usdt",
        "leo",
        "steth",
        "atom",
    ]
};

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ADD_PORTFOLIO_DATA:
            return {
                portfolio: action.portfolio,
                amountList: action.amountList
            };
    }
    return state;
};
