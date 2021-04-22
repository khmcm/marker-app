import React, {useContext} from 'react'
import {store} from 'store/provider.js'
import 'components/menu-bar/styles.scss'

function MenuBarOverlay(props) {
    if(props.isOpen) {
        return (
            <div className="shared-menuBar__overlay">
                
            </div>
        )
    } else {
        return null;
    }
}

export default function MenuBar(props) {
    const globalState = useContext(store);
    const {state, dispatch} = globalState;

    function toggleMenuBar() {
        dispatch({type: 'SET_IS_MENU_BAR_OPEN', payload: !globalState.state.isMenuBarOpen});
    }
    function toggleSearchBar() {
        dispatch({type: 'SET_IS_SEARCH_BAR_OPEN', payload: !globalState.state.isSearchBarOpen});
    }
    function handleSearchChange(e) {
        console.log(e.target.value);
        dispatch({type: 'SET_SEARCH_QUERY', payload: e.target.value});
    }

    return (
        <div className="shared-menuBar">
            <input value={state.searchQuery} type="text" className="shared-menuBar__searchBox" placeholder="Search for a color ..." onChange={handleSearchChange}/>
        </div>
    )
}