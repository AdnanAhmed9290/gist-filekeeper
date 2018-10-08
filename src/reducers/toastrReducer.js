
import * as toastrActions from './../actions/toastrActions';

const initialState = {
    toast: {
        message: '',
        open: false
    }
};

export default function toastrReducer(state = initialState, action) {

    switch (action.type) {

        case toastrActions.TOAST_DASH_MESSAGE:
            {
                return {
                    ...state,
                    toast: {
                        message: action.payload,
                        open: true,
                        kind: action.variant
                    }
                };
            }

        case toastrActions.TOAST_DASH_CLEAR:
            {
                return {
                    ...state,
                    toast: {
                        message: "",
                        open: false,
                        kind: 'info'
                    }
                };
            }

        default:
            return state;

    }
}