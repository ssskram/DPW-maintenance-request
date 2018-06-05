import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface FacilitiesState {
    facilities: Facilities[]
}

export interface Facilities {
    oid: any;
    select: any;
    name: any;
    img: any;
    neighborhood: any;
}

interface RequestFacilitiesAction {
    type: 'REQUEST_FACILITIES';
}

interface ReceiveFacilitiesAction {
    type: 'RECEIVE_FACILITIES';
    facilities: Facilities[];
}

type KnownAction = RequestFacilitiesAction | ReceiveFacilitiesAction;


export const actionCreators = {
    requestAllFacilities: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/facilities/get', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json() as Promise<Facilities[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_FACILITIES', facilities: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_FACILITIES' });
    }
};

const unloadedState: FacilitiesState = { facilities: [] };

export const reducer: Reducer<FacilitiesState> = (state: FacilitiesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_FACILITIES':
            return {
                facilities: state.facilities,
            };
        case 'RECEIVE_FACILITIES':
            return {
                facilities: action.facilities,
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
