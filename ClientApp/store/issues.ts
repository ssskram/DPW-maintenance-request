import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface IssuesState {
    issues: Issues[]
}

export interface Issues {
    name: any;
    type: any;
    isses: any;
}

interface RequestIssuesAction {
    type: 'REQUEST_ISSUES';
}

interface ReceiveIssuesAction {
    type: 'RECEIVE_ISSUES';
    issues: Issues[];
}

type KnownAction = RequestIssuesAction | ReceiveIssuesAction;


export const actionCreators = {
    requestAllIssues: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/facilities/issues', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json() as Promise<Issues[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_ISSUES', issues: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_ISSUES' });
    },
};

const unloadedState: IssuesState = { issues: [] };

export const reducer: Reducer<IssuesState> = (state: IssuesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ISSUES':
            return {
                issues: state.issues,
            };
        case 'RECEIVE_ISSUES':
            return {
                issues: action.issues,
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
