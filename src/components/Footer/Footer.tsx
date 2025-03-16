import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={'footer ' + styles.footer}>
      <Link to={'/'} className={styles.footer__logo}>
        <HiOutlineDevicePhoneMobile fontSize={60} />
        <div>
          <h1>Ne DNS</h1>
          <p>магазин телефонов</p>
          <p>@ Все права (не) защищены</p>
        </div>
      </Link>
    </div>
  );
};
