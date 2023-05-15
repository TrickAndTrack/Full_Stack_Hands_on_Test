import {useEffect, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";

export const Home = () => {
    const [firstName, setfirstName] = useState('');
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('http://localhost:9009/api/v0/login');

                setfirstName(data.firstName);
            } catch (e) {
                setNavigate(true);
            }
        })();
    }, []);

    const logout = async () => {
        await axios.post('logout', {}, {withCredentials: true});

        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/login"/>;
    }

    return <div className="form-signin mt-5 text-center">
        <h3>Hi {firstName}</h3>

        <a href="javascript:void(0)" className="btn btn-lg btn-primary"
           onClick={logout}
        >Logout</a>
    </div>
}
