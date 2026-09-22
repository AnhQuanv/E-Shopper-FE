import LoginForm from "../../components/Form/LoginForm";
import RegisterForm from "../../components/Form/RegisterForm";

export default function Login() {
  return (
    <section id="form">
      <div className="container">
        <div className="row">
          <LoginForm />
          <div className="col-sm-1">
            <h2 className="or">OR</h2>
          </div>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
