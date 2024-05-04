import React, { Component } from "react";
import Firebase from "../../Firebase";
import { useNavigate } from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            sobrenome: "",
            email: "",
            dataDeNascimento: "",
            senha: "",
            confirmarSenha: "",
            errorMessage: ""
        };

        this.gravar = this.gravar.bind(this);
    }

    async gravar(event) {
        console.log(this.state);
        event.preventDefault();

        const { nome, sobrenome, email, dataDeNascimento, senha, confirmarSenha } = this.state;

        if (!nome || !sobrenome || !email || !dataDeNascimento || !senha || !confirmarSenha) {
            this.setState({ errorMessage: "Preencha todos os campos." });
            return;
        }

        if (senha !== confirmarSenha) {
            this.setState({ errorMessage: "As senhas não conferem." });
            return;
        }

        if(senha.length < 6){
            this.setState({ errorMessage: "A senha deve ter no mínimo 6 caracteres." });
            return;
        }

        try {
            const userExists = await Firebase.firestore().collection("usuarios").where("email", "==", email).get();

            if (!userExists.empty) {
                this.setState({ errorMessage: "Este email já está cadastrado." });
                return;
            }

            let userCreated = await Firebase.auth().createUserWithEmailAndPassword(email, senha);
            console.log(userCreated);

            const userSaved = await Firebase.firestore().collection("usuarios").doc(userCreated.user.uid).set({
                nome,
                sobrenome,
                dataDeNascimento
            })

            console.log(userSaved);

            this.props.navigate("/");
        } catch (error) {
            console.log(error);
            this.setState({ errorMessage: "Ocorreu um erro ao cadastrar o usuário." });
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <form className="form-group">
                        <h2>Cadastro</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            onChange={(e) => this.setState({ nome: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Sobrenome"
                            onChange={(e) => this.setState({ sobrenome: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                        <input
                            type="date"
                            placeholder="Data de Nascimento"
                            onChange={(e) => this.setState({ dataDeNascimento: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={(e) => this.setState({ senha: e.target.value })}
                        />
                         <input
                            type="password"
                            placeholder="Confirmar Senha"
                            onChange={(e) => this.setState({ confirmarSenha: e.target.value })}
                        />
                        <button onClick={(event) => this.gravar(event)}>Cadastrar</button>
                        {this.state.errorMessage && (
                            <div className="alert">{this.state.errorMessage}</div>
                        )}
                    </form>
                </div>
            </div>
        );
    }
}

export default function RegisterWithNavigate(props) {
    const navigate = useNavigate();
    return <Register {...props} navigate={navigate} />;
}