import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface KeyState {
    key: string
}

interface RequestKeyAction {
    type: 'REQUEST_KEY';
}

interface ReceiveKeyAction {
    type: 'RECEIVE_KEY';
    key: string;
}

type KnownAction = RequestKeyAction | ReceiveKeyAction;

export const actionCreators = {
    getGoogleKey: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/keys/google', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'RECEIVE_KEY', key: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_KEY' });
    }
};

export const reducer: Reducer<KeyState> = (state: KeyState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_KEY':
            return {
                key: state.key,
            };
        case 'RECEIVE_KEY':
            return {
                key: action.key,
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || { key: "" }
};