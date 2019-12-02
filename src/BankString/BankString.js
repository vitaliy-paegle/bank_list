import React from 'react';
import './BankString.css';

class BankString extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            edit_status: false,
            status_style: this.editStatusFalse,
            name: this.props.name,
            bik: this.props.bik,
            ks: this.props.ks,
            adress: this.props.adress  
        };
        this.refName = React.createRef(); 
        this.refBik = React.createRef(); 
        this.refKs = React.createRef(); 
        this.refAdress = React.createRef();   
    }

    componentDidUpdate(prevProps) {
        if (this.props.name !== prevProps.name || this.props.bik !== prevProps.bik || this.props.ks !== prevProps.ks || this.props.adress !== prevProps.adress ) 
        {
            this.updateDV();     
        }  
    } 

    componentDidMount() {
        this.updateDV()
    }

    deleteString = () => {
        let data = JSON.parse(localStorage.getItem("db_bank"));
        this.deleteElement(data);
        localStorage.setItem("db_bank", JSON.stringify(data));
        this.props.update();  
    }

    deleteElement(data) {
        data.forEach((elem, index) => {
            if (elem.name === this.props.name) {
                data.splice(index, 1);
                this.deleteElement(data);
            }
        })
    }
    
    editStatusFalse = {
        buttonName: "Редактировать данные",
        field_box_display: "grid",
        input_display: "none"
    }

    editStatusTrue = {
        buttonName: "Сохранить данные",
        field_box_display: "none",
        input_display: "grid"
    }

    changeStatus = () => {                      
        if (this.state.edit_status === false) {           
            this.setState({ edit_status: true, status_style: this.editStatusTrue });
        } else {
            this.setState({ 
               name: this.refName.current.value,
               bik: this.refBik.current.value,
               ks: this.refKs.current.value,
               adress: this.refAdress.current.value
            },() => {
            this.setState({ edit_status: false, status_style: this.editStatusFalse });
            let numObj = this.props.number;
            let db = JSON.parse(localStorage.getItem("db_bank"));  
            let newData = {
                name: this.state.name,
                bik: this.state.bik,
                ks: this.state.ks,
                adress: this.state.adress  
            }          
            db.splice(numObj, 1, newData);            
            localStorage.setItem("db_bank", JSON.stringify(db));
            this.props.update();
            this.updateDV();
            })
        }       
    }

    addValue = (event) => {
        this.setState({[event.target.name]: event.target.value})             
    }

    updateDV = () => {  
        this.refName.current.value = this.props.name;           
        this.refBik.current.value = this.props.bik;      
        this.refKs.current.value = this.props.ks;       
        this.refAdress.current.value = this.props.adress;                    
    }

    render(){
        return(
            <div className="bank-string" > 
                <div style={{ display: this.state.status_style.field_box_display}} className="bank-string__field-box">
                    <div className="name bank-string__field">{this.props.name}</div>
                    <div className="bik bank-string__field">{this.props.bik}</div>
                    <div className="ks bank-string__field">{this.props.ks}</div>
                    <div className="adtess bank-string__field">{this.props.adress}</div>
                </div>
                <div key={this.state.number} style={{ display: this.state.status_style.input_display }} className="bank-string__field-box">
                    <input className="bank-string__field" maxLength="12"  onChange={this.addValue} name="name" ref={this.refName}/>
                    <input className="bank-string__field" maxLength="12" onChange={this.addValue} name="bik" ref={this.refBik}/>
                    <input className="bank-string__field" maxLength="12"  onChange={this.addValue} name="ks" ref={this.refKs}/>
                    <input className="bank-string__field" maxLength="12"  onChange={this.addValue} name="adress" ref={this.refAdress}/>
                </div>
                <div className="bank-string__button-box">
                    <div className="bank-string__edit" onClick={this.changeStatus}>{this.state.status_style.buttonName}</div>
                    <div className="bank-string__delete" onClick={this.deleteString}>Удалить банк</div>
                </div>
            </div>
        )
    }
}

export default BankString;