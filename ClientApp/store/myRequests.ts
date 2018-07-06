import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface MyRequestsState {
    requests: MyRequests[]
}

export interface MyRequests {
    oid: any;
    building: any;
    location: any;
    description: any;
    submitted: any;
    status: any;
    lastModified: any;
}

interface MyRequestRequestsAction {
    type: 'REQUEST_MY_REQUESTS';
}

interface MyReceiveRequestsAction {
    type: 'RECEIVE_MY_REQUESTS';
    requests: MyRequests[];
}

type KnownAction = MyRequestRequestsAction | MyReceiveRequestsAction;


export const actionCreators = {
    requestMyRequests: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/requests/mine', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json() as Promise<MyRequests[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_MY_REQUESTS', requests: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_MY_REQUESTS' });
    }
};

const unloadedState: MyRequestsState = { requests: [] };

export const reducer: Reducer<MyRequestsState> = (state: MyRequestsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_MY_REQUESTS':
            return {
                requests: state.requests,
            };
        case 'RECEIVE_MY_REQUESTS':
            return {
                requests: action.requests,
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
