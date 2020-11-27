import React, { Component } from 'react';
import { Container, Row, Col, Table, Pagination, PaginationItem, PaginationLink, Button, Input, } from 'reactstrap';
import Header from '../components/header';
import { connect } from 'react-redux';
import '../App.scss';
import './../scss/login.scss';
import '../Global.scss';
import { GetTableDataAction } from './../actions/TablePageAction';


// let statData = {
//     "Index": "",
//     "CREID ID": "120399345",
//     "Country": "U.K",
//     "City": "London",
//     "Postcard": "SW& 2QE",
//     "Address": "Penthouse",
//     "Type": "Flat",
//     "Tenure": "L",
//     "Beds": "3",
//     "Baths": "4",
//     "Receptions": "2",
//     "Gardens": "N",
//     "Internal": "1350",
//     "External": "650",
//     "Year Built": "1960",
//     "Conditions": "****",
//     "Last Sold": "May, 2013",
//     "Sale Price": "$12,56,678",
//     "A.I price": "$34,56,678",
//     "Accuracy": "83%",
//     "Valuation": "$34,56,678"
// }

// for (let i=0; i<this.state.lastIndex; i++) {
//     dataList.push({...dataList, Index: i});
// }

let tableKey = [
    "CREID ID",
    "Country",
    "City",
    "Postcard",
    "Address",
    "Type",
    "Tenure",
    "Beds",
    "Baths",
    "Receptions",
    "Gardens",
    "Internal",
    "External",
    "Year Built",
    "Conditions",
    "Last Sold",
    "Sale Price",
    "A.I price",
    "Accuracy",
    "Valuation",
]


let dataInEachPage = 2;
let firstPage = 0;


class TablePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chkbox: true,
            currentDataList: [],
            currentPage: 0,
            pageNumbers: []
        }
    }

    componentDidMount() {
        this.props.dispatch(GetTableDataAction((res) => {
            this.setState({ currentDataList: res.list, lastIndex: res.totalData, lastPage: Math.ceil(res.totalData / dataInEachPage)}, () => {
                let totalPage = [];
                for (let i = 0; i < this.state.lastPage; i++) {
                    totalPage.push(i + 1);
                }
                this.setState({ pageNumbers: totalPage })
            })
        }))
    }

    onKeyPress(event) {
        if (event.which === 13) {
            this.search();
        }
    }

    handleChange(e) {
        this.setState({ search: e.target.value });
    }

    addFilter = () => {

    }

    handlePagination(page) {
        console.log('pagination change', page);
        // if (page === this.state.currentPage) {
        //     return
        // } else {
        //     this.setState({currentPage: page})
        // }
        // let startIndex;
        // let endIndex;
        // if (page = -1) {
        //     endIndex = lastIndex;
        //     startIndex = lastIndex - lastIndex % dataInEachPage;
        // } else {
        //     startIndex = page * dataInEachPage;
        // }
        // endIndex = startIndex + dataInEachPage;
        // if (endIndex > this.state.currentDataList.length) {
        //     endIndex = this.state.currentDataList.length;
        // }
        // this.setState({currentDataList: this.currentDataList.slice(startIndex, endIndex)})
        // console.log(this.state.currentPage, this.state.currentDataList);
    }

    render() {

        return (

            <div>
                {this.state && this.state.currentDataList ?
                <>
                <div className='mb-5'>
                    <Header></Header>
                </div>
                <div className='p-5 w-100 position-fixed bgColor'>
                    <div className="d-flex justify-content-center " >
                        <div className="d-flex searchInput">
                            <Row sm='12' className="input">
                                <Col sm='9' className="inputCol">
                                    <Input className="inputPlace" placeholder="search" onChange={(e) => this.handleChange(e)} onKeyPress={(e) => this.onKeyPress(e)}></Input>
                                </Col>
                                <Col sm='3' className="inputCol">
                                    <Button color='' className="inputButton" onClick={() => this.addFilter()}>+ Add Filter</Button>
                                </Col>
                            </Row>
                        </div>

                    </div>
                </div>
                <div className='tableBody'>
                    <Table className="w-100 h-100 bgColor">

                        <thead>
                            <tr>
                                <th></th>
                                {
                                    tableKey.map((creidObjKey, index) =>
                                        <th key={index}>{creidObjKey}</th>
                                    )
                                }
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.currentDataList.map((creidObj, index) => (
                                    <tr key={index}>
                                        <th scope="row">
                                            <input type="checkbox" defaultChecked={this.state.chkbox} onChange={() => this.handleChangeChk()} />
                                        </th>
                                        {
                                            tableKey.map((creidObjKey, index) =>
                                                <td key={index}>{creidObj[creidObjKey]}</td>
                                            )
                                        }
                                    </tr>
                                ))
                            }

                        </tbody>
                    </Table>

                </div>
                <div className="flex justify-content-center">
                    <nav>
                        <Pagination>
                            <PaginationItem>
                                {this.state.currentPage === firstPage ? <></> :
                                    <PaginationLink onClick={() => this.handlePagination(0)}>First</PaginationLink>
                                }
                            </PaginationItem>
                            <PaginationItem>
                                {this.state.currentPage === firstPage ? <></> :
                                    <PaginationLink onClick={() => this.handlePagination(this.state.currentPage - 1)}>Prev</PaginationLink>
                                }
                            </PaginationItem>
                            {
                                this.state.pageNumbers.map((number, i) =>
                                    <Pagination key={number}>
                                        <PaginationItem active={this.state.currentPage === i ? true : false} >
                                            <PaginationLink onClick={() => this.handlePagination(i)}>
                                                {number}
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                )}

                            <PaginationItem>
                                {
                                    this.state.currentPage === this.state.lastPage ? <></> :
                                        <PaginationLink onClick={() => this.handlePagination(this.state.currentPage + 1)}>Next</PaginationLink>
                                }
                            </PaginationItem>

                            <PaginationItem>
                                {
                                    this.state.currentPage === this.state.lastPage ? <></> :
                                        <PaginationLink onClick={() => this.handlePagination(-1)}>Last</PaginationLink>
                                }
                            </PaginationItem>
                        </Pagination>
                    </nav>
                </div>
                </> : <></>}
            </div>
        )
    }
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(TablePage);
