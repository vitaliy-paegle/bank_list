import React from 'react';
import './AddBank.css';

class AddBank extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            bik: "",
            ks: "",
            adress: ""
        }
    }
    addStateValue = (event) => {
        let stateName  = event.target.name;
        this.setState({[stateName]: event.target.value});
    }

    addBankToDb = () => {
        if (this.state.name[0] !== '"') {
            this.setState({ name: '"' + this.state.name + '"' }, () => {
                let db = JSON.parse(localStorage.getItem("db_bank"));
                db = JSON.stringify(db.concat(this.state));
                localStorage.setItem("db_bank", db);
                this.props.update();
            });            
        }
        else {
        let db = JSON.parse(localStorage.getItem("db_bank"));
        db = JSON.stringify(db.concat(this.state));
        localStorage.setItem("db_bank", db);
        this.props.update();
        }
    }

    render(){
        return(
            <div className="add-bank">
                <h4 className="headline add-bank__headline-name">Название банка</h4>
                <input className="field add-bank__field-name" name="name" maxLength="12" onInput={this.addStateValue} />
                <h4 className="headline" >БИК</h4>
                <input className="field" name="bik" maxLength="12" onInput={this.addStateValue} />
                <h4 className="headline">Кор. счет</h4>
                <input className="field" name="ks" maxLength="12" onInput={this.addStateValue} />
                <h4 className="headline" >Адрес</h4>
                <input className="field" name="adress" maxLength="12" onInput={this.addStateValue} />
                <div className="bottom" onClick={this.addBankToDb}>Добавить банк</div>             
            </div>
        )
    }
}

export default AddBank;