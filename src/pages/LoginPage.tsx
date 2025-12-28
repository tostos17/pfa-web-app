import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../redux/hooks";
// import { doLogin } from "../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth, type AuthUser } from "../context/UserContext";
import axios from "axios";
import type { ApiResponse } from "../redux/playerSlice";
import Header from "../components/Header";


const LoginPage = () => {
    // const dispatch = useAppDispatch();
    
    const userRef = useRef<HTMLInputElement>(null);

    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.location?.pathname || "/";

    const initialFormState = {
        username: "",
        password: ""
    }

    const [form, setForm] = useState(initialFormState);

    const postLogin = async (data: FormData) => {
      const apiResponse = await axios.post<ApiResponse<AuthUser>>(
                            `${import.meta.env.VITE_BASE_API_URL}/api/auth/login`,
                            data,
                          {
                              headers: { "Content-Type": "application/json" }
                          }
      );
      return apiResponse;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("submitted")

        const fd = new FormData();
        fd.append("username", form.username);
        fd.append("password", form.password);

        // console.log("about to dispatch")
        // dispatch(doLogin(fd));

        const responseObject = await postLogin(fd);
        console.log("Access token :")
        console.log(responseObject.data.body.accessToken);
        console.log(from)

        if(responseObject.data.success) {
          login({
          name: responseObject.data.body.name,
          accessToken: responseObject.data.body.accessToken
        })
          navigate(from, { replace: true })
        }
        
      };

      const{loading} = useAppSelector((state) => state.user)
      
      useEffect(() => {
        userRef.current?.focus();
      }, []);


  return (
    <>
        <Header />

        <div className="login">
          {loading && <p>Processing...</p>}

          <h2>Login</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" ref={userRef} value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />

            <button>Login</button>
          </form>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
    </>
    
  )
}

export default LoginPage
