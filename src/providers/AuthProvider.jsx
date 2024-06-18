import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function AuthProvider(props) {
  const navigate = useNavigate();
  const { isLogged } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if(!isLogged) {
      navigate('/auth/login');
    }
  }, []);

  return (
    <>
      {props.children}
    </>
  )
}