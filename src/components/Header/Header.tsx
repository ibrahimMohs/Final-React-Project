import {Link} from 'react-router-dom';
import {User} from '../../models/user';

type HeaderProps = {
    userInfo: User | undefined;
  };
  
  export const Header = (props: HeaderProps) => {
    return (
      <header>
        <div className="container">
          header works
          <nav>
            {props.userInfo ? (
              <>

              </>
            ) : (
              <>

              </>
            )}
          </nav>
        </div>
      </header>
    );
  };
  