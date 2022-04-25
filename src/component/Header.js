import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Panel from 'component/Panel'
import UserProfile from 'component/UserProfile';

const Header = props => {
    let navigate = useNavigate();
    const toProfile = () => {
        Panel.open({
            component: UserProfile,
            props: {
                user: props.user
            },
            callback: data => {
                console.log(data);
                if (data === 'logout') {
                    navigate(0);
                }
            }
        })
    }
    return (
    <div className="header">
    <div className="grid">
        <div className="start">
            <Link to="/">Home</Link>
        </div>
        <div className="end">
            
            {props.user.nickname ?(
                <span className='nickname' onClick={toProfile}>
                    <i className='far fa-user'></i>
                    {props.user.nickname}
                </span>
            ) : (
                <React.Fragment>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </React.Fragment>
            )}
        </div>
    </div>
</div>      
)};

export default Header;