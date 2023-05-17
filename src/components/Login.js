import axios from "axios";
import {Navigate} from "react-router-dom";
import {useState,useRef } from "react";

export const Login = () => {
    const [phoneNumber, setphoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState(null);

    const submit = async e => {



        e.preventDefault();
        try {

        // const {data} = await axios.get('http://localhost:9009/api/v0/login', {
        //   phoneNumber, password
        // }, {withCredentials: true});

        const response = await axios.post('http://localhost:9009/api/v0/login', {
            phoneNumber: phoneNumber,
            password: password
          }, {withCredentials: true});

        console.log(response.data);
        //axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;
        //localStorage.setItem('tocken',response.data.token)

        setNavigate(true);
    }
    catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response');
          return false;
        } else if (err.response?.status === 401) {
          setErrMsg('User UNAUTHORIZED');
          return false;
        } else {
          setErrMsg('User Not Genrated ')
          return false;
        }
    }
    }
    if (navigate) {
        return <Navigate to="/"/>;
    }

    return <main className="form-signin">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="Number" className="form-control" id="floatingInput" placeholder="+91 phoneNumber"
                       onChange={e => setphoneNumber(e.target.value)}
                />
                <label htmlFor="floatingInput">Phone Number</label>
            </div>

            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                       onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    </main>
}
