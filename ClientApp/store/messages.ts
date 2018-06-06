import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface MessageState {
    messages: string
}

interface SuccessMessageAction { type: 'FORM_SUCCESS' }
interface ErrorMessageAction { type: 'FORM_ERROR' }
interface ClearMessageAction { type: 'CLEAR' }

type KnownAction = SuccessMessageAction | ErrorMessageAction | ClearMessageAction;


export const actionCreators = {
    success: () => <SuccessMessageAction>{ type: 'FORM_SUCCESS' },
    failure: () => <ErrorMessageAction>{ type: 'FORM_ERROR' },
    clear: () => <ClearMessageAction>{ type: 'CLEAR' },
};

export const reducer: Reducer<MessageState> = (state: MessageState, action: KnownAction) => {
    switch (action.type) {
        case 'FORM_SUCCESS':
            return { messages: "Success! Continue to monitor this site for progress on your request" };
        case 'FORM_ERROR':
            return { messages: "Oops! Something isn't right. Please try that again. If the problem persists, please contact I&P" };
        case 'CLEAR':
            return { messages: "" }
        default:
            const exhaustiveCheck: never = action;
    }
    return state || { messages: "" }
};
