import React from "react";
import Firebase from "../../Firebase";
import { useNavigate } from "react-router-dom";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            sobrenome: "",
            dataDeNascimento: ""
        };
    }

    formatDate(data) {
        const partes = data.split('-');
        if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`; 
        }
        return data;
    }

    async componentDidMount() {
        await Firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                let uid = user.uid;

                const userData = await Firebase.firestore().collection("usuarios").doc(uid).get()
                    
                this.setState({
                    nome: userData.data().nome,
                    sobrenome: userData.data().sobrenome,
                    dataDeNascimento: userData.data().dataDeNascimento
                });
            }
            if (!user) {
                this.props.navigate("/");
            }
        });
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="card-header">
                        <h3>Usuário</h3>
                    </div>
                    <div className="card-body">
                        <p>Nome: {this.state.nome + " " + this.state.sobrenome}!</p>
                        <p> Data de nascimento: {this.formatDate(this.state.dataDeNascimento)}</p>
                    </div>
                </div>
            </div>

        );
    }
}

export default function RegisterWithNavigate(props) {
    const navigate = useNavigate();
    return <Home {...props} navigate={navigate} />;
}