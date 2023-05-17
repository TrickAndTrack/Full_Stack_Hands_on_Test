import {useState, useRef } from "react";
import axios from "axios";
import {Navigate} from 'react-router-dom';

export const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState(null);




    const submit = async e => {
        e.preventDefault();
        try {

        await axios.post('http://localhost:9009/api/v0/register', {
            firstName, lastName, phoneNumber, password
        });

        setNavigate(true);
    } catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response');
          return false;
        } else if (err.response?.status === 400) {
          setErrMsg('Phone Number already exists');
          return false;
        } else {
          setErrMsg('User Not Genrated ')
          return false;
        }
    }
}
    if (navigate) {
        return <Navigate to="/login"/>;
    }

    return <main className="form-signin">

<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <div className="form-floating">
                <input className="form-control" placeholder="First Name"
                       onChange={e => setFirstName(e.target.value)}
                />
                <label>First Name</label>
            </div>
            <div className="form-floating">
                <input className="form-control" placeholder="Last Name"
                       onChange={e => setLastName(e.target.value)}
                />
                <label>Last Name</label>
            </div>

            <div className="form-floating">
                <input type="Number" className="form-control" id="floatingInput" placeholder="+91 0000000000"
                       onChange={e => setPhoneNumber(e.target.value)}
                />
                <label htmlFor="floatingInput">Phone Number</label>
            </div>

            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                       onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="filebutton"> Image</label>
                <div className="col-md-4">
                    <input id="filebutton" name="filebutton" className="input-file" type="file" />
                </div>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </main>
}
