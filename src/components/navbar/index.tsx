import './style.css';
import Links from './Links';
import Profile_link from './profile';

function Navbar () {
  return (
    <>
      <nav className={true ? 'navbar' : 'navbar -left-24'}>
        <Profile_link />
        <Links />
      </nav>
    </>
  );
}
export default Navbar;
