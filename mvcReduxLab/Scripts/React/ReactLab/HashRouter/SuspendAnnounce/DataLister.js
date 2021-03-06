﻿import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions, { Ks } from 'CommonFF/actions.js'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'
import { Button, FormGroup } from 'reactstrap'
import { FormBlock, FormPanel, TextField, CheckboxField, RadioField, SelectField, ButtonGroupField, FilterSelectField, FilterSelectProField } from 'CommonMA/FormInputFields.js'
import moment from 'moment';

const targetReducer = 'SuspendAnnounceReducer';

class DataLister extends Component {
    constructor(props) {
        super(props)

        this.state = {
            queryParams: {
                param1: '',
                param2: '',

            }
        }

        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleGoBack = this.handleGoBack.bind(this)
        this.hanldeItemClick = this.hanldeItemClick.bind(this)
        this.handleParamChange = this.handleParamChange.bind(this)
    }


    render() {
        const { queryParams } = this.state
        const { dataList } = this.props
        const today = moment().format('YYYY/MM/DD')
        
        return (
            <div>
                <div className="py-1">
                    <span className="lead">今日({today})客輪航班<span className="text-danger">停航資訊</span></span>
                </div>

                <ListGroup>
                    {/* 樣板
                    <ListGroupItem className="px-0">
                        <Row noGutters>
                            <Col xs={1} className="my-auto text-center" onClick={() => alert('OK')}>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                            </Col>
                            <Col xs={10}>
                                <Row noGutters>
                                    <Col xs={6}>ATXG108001727</Col>
                                    <Col xs={6}>015990 (BR4042)</Col>
                                    <Col xs={12}>
                                        <span className="lead">
                                            臺港22602號 (TIPM22602)
                                    </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={1} className="my-auto text-center" onClick={() => alert('OK')}>
                                <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                            </Col>
                        </Row>
                    </ListGroupItem>*/}
                </ListGroup>
                <div className="alert alert-light text-center">
                    公告至底
                </div>

                <FormGroup className="text-right text-sm-center">
                    {/*<Button color="primary m-1">載入更多</Button>*/}
                    <Button color="secondary m-1">重新載入</Button>
                    <Button color="secondary m-1" onClick={() => location = '#/'}>回上一頁</Button>
                </FormGroup>
            </div >
        )
    }

    handleValueChange(name, value) {
        this.setState({ [name]: value })
    }

    handleGoBack() {
        this.props.dispatch({ type: Ks.SETUP_FROM_MODE, form_mode: 'QUERY', targetReducer })
    }

    hanldeItemClick(item, index) {
        // 模擬查詢情境
        this.props.setBlocking(true)
        setTimeout(() => {
            this.props.dispatch({ type: Ks.SETUP_FROM_MODE, form_mode: 'VIEW', targetReducer })
            this.props.setBlocking(false)
        }, 1000)
    }

    handleParamChange(name, value) {
        let { queryParams } = this.state
        queryParams[name] = value
        this.setState({ queryParams })
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        appInfo: state.appInfo,
        dataList: state.SuspendAnnounceData.dataList,
        //form_mode: state.formData.form_mode,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
        setBlocking: (flag) => {
            dispatch(actions.setBlocking(flag))
        },
        setupFormMode: (form_mode) => {
            dispatch({ type: Ks.SETUP_FROM_MODE, form_mode, targetReducer })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataLister);
