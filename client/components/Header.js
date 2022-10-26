import Link from 'next/link';

const Header = ({ currentUser }) => {
  // create links array with 2 possible states:
  // user signed in =
  // [false, false, { label: 'Sign Out', href: '/auth/signout' }];
  // user not signed in =
  // [{ label: 'Sign Up', href: '/auth/signup' },{ label: 'Sign In', href: '/auth/signin' },false]
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return <li key={href}>{label}</li>;
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a href="" className="navbar-brand">
          Ticketing App
        </a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
