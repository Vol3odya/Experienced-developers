import AuthForm from "../../components/AuthForm/AuthForm.jsx";
import s from "./SiginPage.module.css"
export default function SigninPage() {
  return (
    <div className={s.container}>
      <AuthForm mode="signin" />
    </div>
  );
}
