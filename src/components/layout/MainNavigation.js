import classes from './MainNavigation.module.css';
import {NavLink} from 'react-router-dom';

const MainNavigation = props => {

return (
    <header className={classes.header}>
      <p className={classes.logo}>Great Quotes</p>
      <nav className={classes.nav}>
        <ul>
          <li><NavLink to='/quotes' activeClassName={classes.active}>All Quotes</NavLink></li>
          <li><NavLink to='/new' activeClassName={classes.active}>Add Quotes</NavLink></li>
        </ul>
      </nav>
    </header>
);
};

export default MainNavigation;