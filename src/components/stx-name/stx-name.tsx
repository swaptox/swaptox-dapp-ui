
import './stx-name.css';
import css from './stx-name.module.css';


export default function StxName() {
  return (
    <div className="app-name-body-text select-none"
	>Swapto<span className={`${css['name-text-x']} select-none`}>X</span></div>
  );
}