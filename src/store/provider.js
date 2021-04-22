import {
    createContext,
    useReducer
} from 'react'

import markerData from 'helpers/marker-data.json'

import createMarker from 'factories/marker.js'

/**
 * @type {{
 *   isMenuBarOpen: boolean,
 *   isSearchBarOpen: boolean,
 *   currentMarkerIndex: number,
 *   currentOptionMenuId: string | null,
 *   markers: Marker[]
 * }}
 */
const initialState = window.localStorage.getItem('copicApp:saveState') ? JSON.parse(window.localStorage.getItem('copicApp:saveState')) : {
    isMenuBarOpen: false,
    isSearchBarOpen: false,
    currentMarkerIndex: 0,
    currentOptionMenuId: null,
    searchQuery: '',
    notificationText: '',
    notificationTime: 0,
    markers: markerData.map(marker => {
        return createMarker({
            color: marker.color,
            colorFamily: marker.family,
            label: marker.name,
            isFavorited: false,
            isLowInk: false,
            isOwned: false,
            isWishlisted: false
        })
    })
}

//Sort the markers by color family.
initialState.markers = initialState.markers.sort((a,b) => {
    if(a.colorFamily > b.colorFamily) {
        return 1;
    } 
    if(a.colorFamily < b.colorFamily) {
        return - 1;
    }
    return 0;
});

const store = createContext(initialState);

const {Provider} = store;

export function StateProvider(props) {
    const [state, dispatch] = useReducer((state, action) => {
        setTimeout(() => {
            window.localStorage.setItem('copicApp:saveState', JSON.stringify(state));
        }, 0);
        switch(action.type) {
            case 'SET_IS_MENU_BAR_OPEN':
                return {...state, isMenuBarOpen: action.payload};
            case 'SET_IS_SEARCH_BAR_OPEN':
                return {...state, isSearchBarOpen: action.payload};
            case 'SET_CURRENT_OPTION_MENU_ID':
                return {...state, currentOptionMenuId: action.payload};
            case 'SET_OPTION_STATE':
                const markerIndex = state.markers.findIndex((marker) => marker.id === action.payload.id);
                const markerCollectionClone = [...state.markers];
                const currentMarker = markerCollectionClone[markerIndex];
                currentMarker[action.payload.option] = action.payload.value;

                return {...state, markers: markerCollectionClone};
            case 'SET_SEARCH_QUERY':
                return {...state, searchQuery: action.payload};
            case 'SET_NOTIFICATION':
                return {...state, notificationText: action.payload.text, notificationTime: 3000};
            case 'HIDE_NOTIFICATION':
                return {...state, notificationText: '', notificationTime: 3000};
            default:
                return {...state};
        }
    }, initialState);

    return (
        <Provider value={{state, dispatch}}>
            {props.children}
        </Provider>
    )
}

export {store};