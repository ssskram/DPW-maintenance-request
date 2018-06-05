import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface RequestsState {
    requests: Requests[]
}

export interface Requests {
    oid: any;
    building: any;
    location: any;
    description: any;
    submitted: any;
    status: any;
    lastModified: any;
}

interface RequestRequestsAction {
    type: 'REQUEST_REQUESTS';
}

interface ReceiveRequestsAction {
    type: 'RECEIVE_REQUESTS';
    requests: Requests[];
}

type KnownAction = RequestRequestsAction | ReceiveRequestsAction;


export const actionCreators = {
    requestAllRequests: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/requests/all', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json() as Promise<Requests[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_REQUESTS', requests: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_REQUESTS' });
    },

    requestMyRequests: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/requests/mine', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json() as Promise<Requests[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_REQUESTS', requests: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_REQUESTS' });
    }
};

const unloadedState: RequestsState = { requests: [] };

export const reducer: Reducer<RequestsState> = (state: RequestsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_REQUESTS':
            return {
                requests: state.requests,
            };
        case 'RECEIVE_REQUESTS':
            return {
                requests: action.requests,
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
