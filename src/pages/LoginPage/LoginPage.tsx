import './LoginPage.scss';

export const LoginPage = () => {
    return (
      <div className="login-page">
        <div className="container">
          <form>
            <label className="email">
              Email
              <div>
                <input type="text" />
              </div>
              Password
              <div>
               
                <input type="password" />
              </div>
            </label>

            <div>
              <button>Sign In</button>
            </div>
          </form>
        </div>
      </div>
    );
};