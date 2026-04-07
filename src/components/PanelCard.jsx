/* src/components/PanelCard.jsx */

import styles from './PanelCard.module.css';

function PanelCard({ children }) {
  return <article className={`${styles.card} chrome`}>{children}</article>;
}

function Header({ children }) {
  return <div className={styles.header}>{children}</div>;
}

function Body({ children }) {
  return <div className={styles.body}>{children}</div>;
}

function Footer({ children }) {
  return <div className={styles.footer}>{children}</div>;
}

PanelCard.Header = Header;
PanelCard.Body = Body;
PanelCard.Footer = Footer;

export default PanelCard;
