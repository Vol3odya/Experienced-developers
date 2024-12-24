import AuthForm from "../../components/AuthForm/AuthForm";
import s from "./SignupPage.module.css"


export default function SignupPage() {
  return (
    <div className={s.container}>
 <AuthForm mode="signup" />
    </div>
  );
}