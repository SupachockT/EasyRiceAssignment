import { NavLink, useLocation } from 'react-router-dom';
import compassIcon from '../assets/compass.png';

export default function Navigation() {
    const { pathname: path } = useLocation();

    const inspectionLabel = () => {
        if (path === '/result') return 'Inspection --- result';
        if (path === '/edit') return 'Inspection --- edit';
        return 'Inspection';
    };

    return (
        <div className="h-16 grid grid-cols-3 items-center bg-slate-800">
            <img src={compassIcon} alt="compass-icon" className="w-10 h-10 ml-10" />
            <div className="flex justify-evenly items-center text-lg text-white">
                <NavLink to="/" className={({ isActive }) => isActive ? 'cursor-pointer text-blue-300' : ''}>
                    History
                </NavLink>
                <NavLink
                    to={['/result', '/edit'].includes(path) ? '/' : '/inspection'}
                    className={({ isActive }) => isActive ? 'cursor-pointer text-blue-300' : ''}
                >
                    {inspectionLabel()}
                </NavLink>
            </div>
        </div>
    );
}
