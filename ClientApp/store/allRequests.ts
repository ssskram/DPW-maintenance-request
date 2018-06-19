import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface AllRequestsState {
    requests: AllRequests[]
}

export interface AllRequests {
    oid: any;
    building: any;
    location: any;
    description: any;
    submitted: any;
    status: any;
    issue: any;
}

interface AllRequestRequestsAction {
    type: 'REQUEST_ALL_REQUESTS';
}

interface AllReceiveRequestsAction {
    type: 'RECEIVE_ALL_REQUESTS';
    requests: AllRequests[];
}

type KnownAction = AllRequestRequestsAction | AllReceiveRequestsAction;


export const actionCreators = {
    requestAllRequests: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/requests/all', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json() as Promise<AllRequests[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_ALL_REQUESTS', requests: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_ALL_REQUESTS' });
    },
};

const unloadedState: AllRequestsState = { requests: [] };

export const reducer: Reducer<AllRequestsState> = (state: AllRequestsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ALL_REQUESTS':
            return {
                requests: state.requests,
            };
        case 'RECEIVE_ALL_REQUESTS':
            return {
                requests: action.requests,
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
