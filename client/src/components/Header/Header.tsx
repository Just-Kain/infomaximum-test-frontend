import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { carStore } from '../../store/CarStore';
import './Header.css'; 

const Header: FC = observer(() => {
  const { favorites } = carStore;

  return (
    <header className="header-container">
      <h1 className="header-logo">
        <Link to="/" className='first-half'>КУПИ</Link>
        <Link to="/" className='second-half'>АВТО</Link>
      </h1>
      
      <nav className='nav-link'>
        <NavLink 
          className="catalog-nav"
          to="/"
        >
          Каталог
        </NavLink>
        
      </nav>
      
      <div className="contact-info">
        <div className="contact-item">
          <span className="city-label">Москва, Волгоградская пр-кт, 43, стр 1</span>
        </div>
        
        <div className="contact-item">
          <span className="phone-label">+7 800 555 35 35</span>
        </div>
      </div>

      <a href="/favorites" className="favorite-nav">
        <div className="heart-icon"></div>
        Избранное
      </a>
        
    </header>
  );
});

export default Header;