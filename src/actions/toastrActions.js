export const TOAST_DASH_MESSAGE = 'TOAST_DASH_MESSAGE'
export const TOAST_DASH_CLEAR  = 'TOAST_DASH_CLEAR'

export function acToastDashMessage(message,variant) {

    return {
        type: TOAST_DASH_MESSAGE,
        payload: message,
        variant: variant
    };

}
export function acToastDashClear() {

    return {
        type: TOAST_DASH_CLEAR
    };

}