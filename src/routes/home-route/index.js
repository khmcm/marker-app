import React, {useContext, useState} from 'react'

import './styles.scss'
import {store} from 'store/provider.js'

import MenuBar from 'components/menu-bar'
import MarkerDot from 'components/marker-card'

import HeartIcon from 'icons/heart-inactive.svg'
import ShoppingBagIcon from 'icons/shopping-bag-inactive.svg'
import StarIcon from 'icons/star-inactive.svg'
import DropletIcon from 'icons/droplet-inactive.svg'
import XIcon from 'icons/x.svg'

import styled from 'styled-components'
import Notification from 'components/notification'

const MarkerCardListHeader = styled.span`
    font-family: 'Inter';
    font-size: 24px;
    display: flex;
    font-weight: bold;
    color: rgb(230, 230, 230);
    width: 100vw;
`;
const MarkerCardListHeaderContainer = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 32px;
`;

const GridList = styled.div`
    position: absolute;
    left: 50vw;
    transform: translateX(-50%);
    user-select: none;
    text-align: center;
    position: absolute;
    top: 100px;
    width: 95vw;
`;

function MarkerCardList(props) {
    const globalState = useContext(store);
    const {state, dispatch} = globalState;

    function MarkerGrid({filter, label, icon}) {
        const [isOpen, setIsOpen] = useState(true);
        const filterResult = state.markers
            .filter(filter)
            .filter(marker => marker.label.toLowerCase().match(state.searchQuery.toLowerCase()) || marker.color.toLowerCase().match(state.searchQuery.toLowerCase()) || marker.colorFamily.toLowerCase().match(state.searchQuery.toLowerCase()));

        if(filterResult.length === 0) {
            return null;
        }
        const toggleIsOpen = () => {
            setIsOpen(!isOpen);
        }
        return (
            <React.Fragment>
                <MarkerCardListHeaderContainer onClick={toggleIsOpen} style={{borderBottom: isOpen?'1px solid rgb(230, 230, 230)':'none'}}>
                    <img src={icon} style={{opacity: '0.1'}}/><span style={{paddingRight: '8px'}}/><MarkerCardListHeader>{label}</MarkerCardListHeader>
                </MarkerCardListHeaderContainer>
            {isOpen?
                filterResult
                .map((marker, i) => {
                    const renders = [
                        <MarkerDot key={`markerDot_${i}`} marker={marker}/>,
                        <span key={`spacer_${i}`} style={{marginRight: `${DOT_MARGIN}px`}}/>
                    ];
                    if(i % (Math.round(MAX_PALETTE_WIDTH, window.innerWidth) / (DOT_SIZE + DOT_MARGIN + 4)) + 1 === 0 && i !== 0 ) {
                        renders.unshift(<br/>);
                    }
                    return <span key={marker.id}>{renders}</span>;
                }) : null
            }
            </React.Fragment>

        )
    }

    const DOT_SIZE = 48;
    const DOT_MARGIN = 10;
    const MAX_PALETTE_WIDTH = Math.floor(window.innerWidth * 0.82);

    return (
        <React.Fragment>
            {(state.notificationText !== '')?<Notification/>:null}
            <GridList style={{maxWidth: `${MAX_PALETTE_WIDTH}px`, lineHeight: `${DOT_MARGIN * 7}px`}}>
                {MarkerGrid({icon: HeartIcon, label: 'Favorited', filter: (marker) => marker.isFavorited === true})}
                {MarkerGrid({icon: DropletIcon, label: 'Needs Refill', filter: (marker) => marker.isLowInk === true})}
                {MarkerGrid({icon: StarIcon, label: 'Wishlisted', filter: (marker) => marker.isWishlisted === true})}
                {MarkerGrid({icon: ShoppingBagIcon, label: 'Owned', filter: (marker) => !marker.isFavorited && !marker.isLowInk && !marker.isWishlisted && marker.isOwned})}
                {MarkerGrid({icon: XIcon, label: 'Not owned', filter: (marker) => !marker.isFavorited && !marker.isLowInk && !marker.isWishlisted && !marker.isOwned})}
            </GridList>
        </React.Fragment>
    );
}

export default function(props) {
    const globalState = useContext(store);

    return (
        <div>
            <div id="color-overlay"></div>
            <MenuBar/>
            <MarkerCardList/>
        </div>
    )
}
