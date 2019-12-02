import React from 'react';
import './SortBank.css';

class SortBank extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           search_name: "",
           search_bik: ""
        }
    }

    sortName = () => {        
        let db = JSON.parse(localStorage.getItem("db_bank"));
        db.sort((a,b) => {
            if (a.name > b.name) {return 1}
            else if (a.name < b.name) {return -1}
            else {return 0};
        });
        localStorage.setItem("db_bank", JSON.stringify(db));
        this.props.update();
    }

    sortBik = () => {
        let db = JSON.parse(localStorage.getItem("db_bank"));
        db.sort((a, b) => {
            if (a.bik > b.bik) { return 1 }
            else if (a.bik < b.bik) { return -1 }
            else { return 0 };
        });
        localStorage.setItem("db_bank", JSON.stringify(db));
        this.props.update();
    }

    searchBik = () => {
        this.props.searchBank(this.state.search_bik, "bik");
    }

    searchName = () => {
        this.props.searchBank(this.state.search_name, "name");
    }
    addValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className="sort-bank">
                <div className="sort-bank__radio-block">
                    <input className="radio-button" type="radio" name="sort-bank" id="sort-name" onChange={this.sortName} />
                    <label className="radio-label" htmlFor="sort-name">Сортировать по названию</label>
                    <input className="radio-button" type="radio" name="sort-bank" id="sort-bik" onChange={this.sortBik} />
                    <label className="radio-label" htmlFor="sort-bik">Сортировать по БИК</label>
                </div>
                <div className="sort-bank__search-block">
                    <input type="text" className="search" name="search_name" maxLength="14" onChange={this.addValue}/>
                    <div className="search-button" onClick={this.searchName}>Искать банк по названию</div>
                    <input type="text" className="search" name="search_bik" maxLength="14" onChange={this.addValue} />
                    <div className="search-button" onClick={this.searchBik}>Искать банк по БИК</div>
                </div>
            </div>
        )
    }
}

export default SortBank;