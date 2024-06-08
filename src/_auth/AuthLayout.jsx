import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div >
          <section >
            <Outlet />
          </section>

        </div>
      );
}

export default AuthLayout
