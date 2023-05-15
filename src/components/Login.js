import axios from "axios";
import {Navigate} from "react-router-dom";
import {useState} from "react";

export const Login = () => {
    const [phoneNumber, setphoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault();

        const {data} = await axios.get('http://localhost:9009/api/v0/login', {
          phoneNumber, password
        }, {withCredentials: true});

        console.log(data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;

        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/"/>;
    }

    return <main className="form-signin">
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
