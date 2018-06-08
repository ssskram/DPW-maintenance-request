import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface MessageState {
    messages: string
}

interface SuccessMessageAction { type: 'FORM_SUCCESS' }
interface ErrorMessageAction { type: 'FORM_ERROR' }
interface SurveyMessageAction { type: 'SURVEY_SUBMITTED' }
interface ClearMessageAction { type: 'CLEAR' }

type KnownAction = SuccessMessageAction | ErrorMessageAction | ClearMessageAction | SurveyMessageAction;

export const actionCreators = {
    success: () => <SuccessMessageAction>{ type: 'FORM_SUCCESS' },
    failure: () => <ErrorMessageAction>{ type: 'FORM_ERROR' },
    surveySubmitted: () => <SurveyMessageAction>{ type: 'SURVEY_SUBMITTED' },
    clear: () => <ClearMessageAction>{ type: 'CLEAR' },
};

export const reducer: Reducer<MessageState> = (state: MessageState, action: KnownAction) => {
    switch (action.type) {
        case 'FORM_SUCCESS':
            return { messages: "Success! We'll be seeing you soon." };
        case 'FORM_ERROR':
            return { messages: "Oops! Something isn't right. Please try that again. If the problem persists, please contact I&P" };
        case 'SURVEY_SUBMITTED':
            return { messages: "Thanks for your time!" };
        case 'CLEAR':
            return { messages: "" }
        default:
            const exhaustiveCheck: never = action;
    }
    return state || { messages: "Welcome to the new maintenance portal!<br/><a href='/Survey'>Let us know what you think</a>" }
};
