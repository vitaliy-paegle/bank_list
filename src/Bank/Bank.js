import React from 'react';
import './Bank.css';
import AddBank from '../AddBank/AddBank';
import SortBank from '../SortBank/SortBank.js'
import BankString from '../BankString/BankString';

class Bank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            db: this.getBankDB()
        }
    }

    setStartDB(){
        const db_bank =
            [
                {
                    name: '"Открытие"',
                    bik: '12121212',
                    ks: '13131313',
                    adress: 'г.Москва'
                },
                {
                    name: '"ВТБ"',
                    bik: '21212121',
                    ks: '31313131',
                    adress: 'г.Самара'
                },
                {
                    name: '"Альфа-Банк"',
                    bik: '15151515',
                    ks: '42424242',
                    adress: 'г.Казань'
                }
            ]

        localStorage.setItem("db_bank", JSON.stringify(db_bank))
    }
    
    getBankDB = () => {
        if (localStorage.getItem("db_bank") == null ) {
            this.setStartDB();
        } 
        return JSON.parse(localStorage.getItem("db_bank"));
    }
  
    updateDB = () => {
        let data = JSON.parse(localStorage.getItem("db_bank"));
        this.setState({ db: data });
    }

    searchBank = (param, type) => {
        let data = JSON.parse(localStorage.getItem("db_bank"));
        this.findElem(data,type,param);
    }

    findElem = (data,type,param) => {
        if (type === "name") {param = '"' + param + '"'};
        let bank = data.find(item => item[type] === param);            
        if (bank !== undefined) {
            bank = [].concat(bank)
            this.setState({db: bank},()=>{console.log(this.state.db)})
        };      
    }
  
    render(){

        return(
            <div className="bank">
                <AddBank update={this.updateDB} />
                <SortBank update={this.updateDB} searchBank={this.searchBank}/>
                <div className="bank__list-headline">
                    <h3 className="headline bank-string__headline-name">Название банка</h3>
                    <h3 className="headline" >БИК</h3>
                    <h3 className="headline">Кор. счет</h3>
                    <h3 className="headline" >Адрес</h3>
                </div>
                <div className="bank__list">
                    {this.state.db.map((elem, index) => <BankString update={this.updateDB} key={index} number={index} name={elem.name} bik={elem.bik} ks={elem.ks} adress={elem.adress} />)}                                  
                </div>                
            </div>
        )
    }
}

export default Bank;