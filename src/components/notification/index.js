import {useContext, useEffect, useTransition} from 'react'
import 'components/notification/styles.scss'
import {store} from 'store/provider'
import {useSpring, animated} from 'react-spring'

const Notification = () => {
    const {state, dispatch} = useContext(store);

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch({type: 'HIDE_NOTIFICATION', payload: null});
        }, 3000);
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    const hideNotification = () => {
        dispatch({type: 'HIDE_NOTIFICATION', payload: null});
    }

    const animStyle = useSpring({transform: 'translateX(-50%) scale(1.0)', from: {transform: 'translateX(-50%) scale(0.0)'}, config: {mass: 5, tension: 700, friction: 60}});

    return (
        <animated.div onClick={hideNotification} className="notification-card" style={animStyle}>{state.notificationText}</animated.div>
    )
}

export default Notification;