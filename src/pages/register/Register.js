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
            senha: ""
        };

        this.gravar = this.gravar.bind(this);
    }

    async gravar(event) {
        console.log(this.state);
        event.preventDefault();

        const { nome, sobrenome, email, dataDeNascimento, senha } = this.state;

        if (!nome || !sobrenome || !email || !dataDeNascimento || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const userExists = await Firebase.firestore().collection("usuarios").where("email", "==", email).get();

            if (!userExists.empty) {
                alert("Este email já está cadastrado. Por favor, use outro email.");
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
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <h2>Cadastro</h2>
                    <form className="form-group">
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
                        <button onClick={(event) => this.gravar(event)}>Cadastrar</button>
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