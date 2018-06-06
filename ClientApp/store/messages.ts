import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface MessageState {
    messages: string
}

interface SuccessMessageAction { type: 'FORM_SUCCESS' }
interface ErrorMessageAction { type: 'FORM_ERROR' }
interface AlreadySubmittedMessageAction { type: 'ALREADY_SUBMITTED' }
interface ClearMessageAction { type: 'CLEAR' }

type KnownAction = SuccessMessageAction | ErrorMessageAction | ClearMessageAction | AlreadySubmittedMessageAction;

export const actionCreators = {
    success: () => <SuccessMessageAction>{ type: 'FORM_SUCCESS' },
    failure: () => <ErrorMessageAction>{ type: 'FORM_ERROR' },
    alreadySubmitted: () => <AlreadySubmittedMessageAction>{ type: 'ALREADY_SUBMITTED' },
    clear: () => <ClearMessageAction>{ type: 'CLEAR' },
};

export const reducer: Reducer<MessageState> = (state: MessageState, action: KnownAction) => {
    switch (action.type) {
        case 'FORM_SUCCESS':
            return { messages: "Success! Help is on it's way" };
        case 'FORM_ERROR':
            return { messages: "Oops! Something isn't right. Please try that again. If the problem persists, please contact I&P" };
        case 'ALREADY_SUBMITTED':
            return { messages: "There's no need to submit it again.  Thank you." };
        case 'CLEAR':
            return { messages: "" }
        default:
            const exhaustiveCheck: never = action;
    }
    return state || { messages: "Success! Continue to monitor this site for progress on your request" }
};
