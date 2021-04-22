import React, {useEffect, useState, useRef, createContext, useContext, memo, createRef} from 'react'
import {createPortal} from 'react-dom'
import 'components/marker-card/styles.scss'
import {useSpring, animated} from 'react-spring'
import selectBestColorBrightnessFromHex from 'helpers/select-best-color-brightness-from-hex.js'
import {store} from 'store/provider'
import shoppingBagIconActive from 'icons/shopping-bag-active.svg'
import shoppingBagIconInactive from 'icons/shopping-bag-inactive.svg'
import heartIconActive from 'icons/heart-active.svg'
import heartIconInactive from 'icons/heart-inactive.svg'
import starIconActive from 'icons/star-active.svg'
import starIconInactive from 'icons/star-inactive.svg'
import dropletIconActive from 'icons/droplet-active.svg'
import dropletIconInactive from 'icons/droplet-inactive.svg'
import xIcon from 'icons/x.svg'

const iconMap = {
    'star': {
        active   : starIconActive,
        inactive : starIconInactive
    },
    'shopping-bag': {
        active   : shoppingBagIconActive,
        inactive : shoppingBagIconInactive
    },
    'heart': {
        active   : heartIconActive,
        inactive : heartIconInactive
    },
    'droplet': {
        active   : dropletIconActive,
        inactive : dropletIconInactive
    }
}


const OptionsMenu = memo(({marker, textColor}) => {
    const labelCopyInputRef = useRef();
    const colorFamilyCopyInputRef = useRef();
    
    const {state, dispatch} = useContext(store);
    const {color, colorFamily, id, label, isFavorited, isLowInk, isOwned, isWishlisted} = marker;
    const styleProps = useSpring({transform: 'translateX(-50%) scale(1.0)', from: {transform: 'translateX(-50%) scale(0.0)'}, config: {mass: 5, tension: 400, friction: 50}});

    function copyTextToClipboard(text) {
        
    }

    const copyLabel = (e) => {
        labelCopyInputRef.current.select();
        window.document.execCommand('copy');
        dispatch({type: 'SET_NOTIFICATION', payload: {
            text: `Copied label, "${label}".`
        }});
    }

    const copyColorFamily = (e) => {
        colorFamilyCopyInputRef.current.select();
        window.document.execCommand('copy');
        dispatch({type: 'SET_NOTIFICATION', payload: {
            text: `Copied color family, "${colorFamily}".`
        }});
    }

    const closeMenu = (e) => {
        if(!!e.target.getAttribute('data-should-close-option-menu') !== true) {
            return false;
        }
        dispatch({type: 'SET_CURRENT_OPTION_MENU_ID', payload: null});
    }
    
    return (
        <div data-should-close-option-menu={true} onClick={closeMenu} className="shared-markerCard__optionsMenuContainer">
            <div className="shared-markerCard__optionsMenu">
                <input className="shared-markerCard__attributeLabelStyle" ref={labelCopyInputRef} readOnly={true} type="text" value={label}/>
                <input className="shared-markerCard__attributeLabelStyle" ref={colorFamilyCopyInputRef} readOnly={true} type="text" value={colorFamily}/>
                <img data-should-close-option-menu={true} onClick={closeMenu} src={xIcon} className="shared-markerCard__optionsMenuExitButton"/>
                <div className="shared-markerCard__optionsMenuLabel" onClick={copyLabel}>{label}</div>
                <div className="shared-markerCard__optionsMenuColorCircle" onClick={copyColorFamily} style={{...styleProps, background: color, color: `#${textColor}`}}>{colorFamily}</div>
                <OptionsMenuButton marker={marker} option="isWishlisted" isActive={isWishlisted} icon='star' activeBackgroundColor="orange">{isWishlisted?'Wishlisted!':'Not wishlisted'}</OptionsMenuButton>
                <div className="shared-markerCard__spacer-8px"/>
                <OptionsMenuButton marker={marker} option="isOwned" isActive={isOwned} icon='shopping-bag' activeBackgroundColor="turquoise">{isOwned?'Owned!':'Not owned'}</OptionsMenuButton>
                <div className="shared-markerCard__spacer-8px"/>
                <OptionsMenuButton marker={marker} option="isFavorited" isActive={isFavorited} icon='heart' activeBackgroundColor="red">{isFavorited?'Favorited!':'Not favorited'}</OptionsMenuButton>
                <div className="shared-markerCard__spacer-8px"/>
                <OptionsMenuButton marker={marker} option="isLowInk" isActive={!isLowInk} icon='droplet' activeBackgroundColor="blue">{isLowInk?'Not filled':'Filled!'}</OptionsMenuButton>
            </div>
        </div>
    )
});

const MenuOverlayPortal = memo(({marker, textColor}) => {
    const {state, dispatch} = useContext(store);
    const {color, colorFamily, id, label, isFavorited, isLowInk, isOwned, isWishlisted} = marker;

    if(document.getElementById('color-overlay') && state.currentOptionMenuId === id) {
        return createPortal(<OptionsMenu marker={marker} textColor={textColor}/>, document.getElementById('color-overlay'));
    } else {
        return null;
    }
});

const OptionsMenuButton = memo(({marker, activeBackgroundColor, children, icon, isActive, option}) => {
    const {state, dispatch} = useContext(store);
    const {id} = marker;
    const toggleOptionState = (option) => {
        dispatch({type: 'SET_OPTION_STATE', payload: {
            id,
            option,
            value: !state.markers.find((marker) => marker.id === id)[option]
        }});
    }
    const selectedIcon = iconMap[icon][isActive?'active':'inactive'];
    return (
        <button onClick={() => toggleOptionState(option)} className="shared-markerCard__optionsMenuButton" style={{...isActive?{color: 'white', background: activeBackgroundColor}:{}}}><img src={selectedIcon}/> <span style={{paddingRight: '8px'}}/> {children}</button>
    )
})

export default memo(function MarkerCard({marker: {color, colorFamily, id, label, isFavorited, isLowInk, isOwned, isWishlisted}}) {
    const marker = {color, colorFamily, id, label, isFavorited, isLowInk, isOwned, isWishlisted};
    const {state, dispatch} = useContext(store);

    const textColor = selectBestColorBrightnessFromHex(color);    

    const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);

    const toggleOptionsMenuVisible = () => {
        if(state.currentOptionMenuId === id) {
            dispatch({type: 'SET_CURRENT_OPTION_MENU_ID', payload: null});
        } else {
            dispatch({type: 'SET_CURRENT_OPTION_MENU_ID', payload: id});
        }
    };



    return (
        <React.Fragment>
            <div onClick={toggleOptionsMenuVisible} className="shared-markerCard" style={{background: color, display: 'inline-block', textAlign: 'center'}}>
                <div className="shared-markerCard__colorFamily" style={{color: `#${textColor}`}}>{colorFamily}</div>
            </div>
            <MenuOverlayPortal marker={marker} textColor={textColor}/>
        </React.Fragment>
    )
});
