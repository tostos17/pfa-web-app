import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../redux/hooks";
// import { doLogin } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth, type AuthUser } from "../context/UserContext";
import axios from "axios";
import type { ApiResponse } from "../redux/playerSlice";
import Header from "../components/Header";


const LoginPage = () => {
    // const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userRef = useRef<HTMLInputElement>(null);

    const { login, user } = useAuth();

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
        console.log(responseObject)

        if(responseObject.data.success) {
          login({
          name: responseObject.data.body.name,
          accessToken: responseObject.data.body.accessToken
        })
          navigate('/')
        }
        
      };

      const{loginResponse, loading} = useAppSelector((state) => state.user)
      
      useEffect(() => {
        userRef.current?.focus();
      }, []);

      useEffect(() => {
        console.log(loginResponse)
        if(loginResponse.code === 0) return;

        if(loginResponse.success) {
            console.log("user after login");
            console.log(user);
            navigate("/home")
        }else {
            toast.error( loginResponse.message )
        }
      }, [loginResponse])

  return (
    <>
        <Header />

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
    </>
    
  )
}

export default LoginPage
