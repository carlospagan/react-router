import React, { Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import Firebase from "../../Firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: ""
    };
  }

  async login(event) {
    event.preventDefault();
    console.log(this.state);
    const { email, senha } = this.state;
    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    try{
      await Firebase.auth().signInWithEmailAndPassword(email, senha);
      this.props.navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Usuário ou senha inválidos.");
    }   
   
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h2>Login</h2>
          <form className="form-group">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => this.setState({ senha: e.target.value })}
            />
            <button onClick={(event) => this.login(event)}>Login</button>
            <p>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
          </form>
        </div>
      </div>
    );
  }

}

export default function RegisterWithNavigate(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}