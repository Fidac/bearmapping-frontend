import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types';

import {
    Input,
    Select,
    Row,
    Col,
    Button,
    DatePicker,
} from 'antd';
import {validateEmailOfCreator} from "../../utils/validators";
import moment from "moment";
import {isEmpty, isNumber} from "../../utils/utils";

const {Option} = Select;
const InputGroup = Input.Group;


export const msgType = Object.freeze({'SUCCESS': 'Success', 'ERROR': 'error'});

/**
 * Class component for displaying form, handling validation of input and triggering submission.
 */
export class GameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dateOfCreation: "",
            type: "",
            description: "",
            emailOfCreator: "",
            validation: {
                name: {
                    required: true,
                    error: ""
                },
                dateOfCreation: {
                    required: false,
                    error: ""
                },
                emailOfCreator: {
                    required: true,
                    error: ""
                },
                type: {
                    required: true,
                    error: ""
                },
                description: {
                    required: false,
                    error: ""
                }
            },
        }
    }

    // This function is invoked during an update.
    // Set conditions so the update does not go on loop
    onUpdate(prevProps, prevState) {
        const {clearFlag, setClearFlag, selectedGame} = this.props;
        //checking whether to clear fields or not
        if ((clearFlag !== prevProps.clearFlag) &&
            clearFlag) {
            this.clearForm();
            setClearFlag(false);
        }

        if (!isEmpty(selectedGame) && (prevProps.selectedGame.key !== selectedGame.key)) {
            let {validation} = this.state;
            validation.name.error = "";
            validation.emailOfCreator.error = "";
            validation.dateOfCreation.error = "";
            validation.type.error = "";
            validation.description.error = "";
            this.setState({
                name: selectedGame.name,
                emailOfCreator: selectedGame.emailOfCreator,
                dateOfCreation: selectedGame.dateOfCreation,
                type: selectedGame.type,
                description: selectedGame.description,
                validation: validation,
            })
        }
    }

    clearForm = () => {
        let {
            name, emailOfCreator, dateOfCreation, type, description, validation
        } = this.state;
        name = "";
        emailOfCreator = "";
        dateOfCreation = "";
        type = "";
        description="";
        validation.name.error = "";
        validation.emailOfCreator.error = "";
        validation.dateOfCreation.error = "";
        validation.type.error = "";
        validation.description.error = "";
        this.setState({
            name, emailOfCreator, dateOfCreation, type, description, validation
        });
    };

    // checks if there are validation errors and then calls the create or update accordingly.
    onSubmit = e => {
        e.preventDefault();
        const {name, emailOfCreator, dateOfCreation, type, description, validation} = this.state;
        const {selectedGame, createGame, updateGame} = this.props;
        if (!(validation.name.error || validation.dateOfCreation.error || validation.emailOfCreator.error
            || validation.type.error || validation.description.error)) {
            if (isEmpty(selectedGame)) {
                createGame(
                    name, emailOfCreator, dateOfCreation, type, description
                );
            } else {
                updateGame(
                    selectedGame.key, name, emailOfCreator, dateOfCreation, type, description
                );
            }
        }
    };

    onNameChange = e => {
        this.setState({name: e.target.value});
    };

    onEmailOfCreatorChange = e => {
        this.setState({emailOfCreator: e.target.value});
    };

    onDateOfCreationChange = value => {
        this.setState({dateOfCreation: value});
    };

    onTypeChange = e => {
        this.setState({type: e.target.value});
    };

    onDescriptionChange = e => {
        this.setState({description: e.target.value});
    };

    validateName = () => {
        let {validation} = this.state;
        if (validation.name.required && this.state.name === "") {
            validation.name.error = "This field is required";
        } else {
            validation.name.error = "";
        }
        this.setState({validation: validation});
    };

    validateEmailOfCreator = () => {
        let {validation} = this.state;
        if (this.state.emailOfCreator !== "") {
            if (!validateEmailOfCreator(this.state.emailOfCreator)) {
                validation.emailOfCreator.error = "This field is not valid email.";
            } else {
                validation.emailOfCreator.error = "";
            }
            this.setState({validation: validation});
        } else {
            if (validation.emailOfCreator.required) {
                validation.emailOfCreator.error = "This field is required.";
                this.setState({validation: validation});
            }
        }
    };

    validateType = () => {
        let {validation} = this.state;
        if (validation.type.required && this.state.type === "") {
            validation.type.error = "This field is required.";
        } else {
            validation.type.error = ""
        }
        this.setState({validation: validation});
    };

    disablePastDays = current => {
        return current && current <= moment().endOf('day');
    };

    render() {
        const {selectedGame, clearStatus} = this.props;

        return (
            <Fragment>
                <form>
                    <div className="form-row">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={3}>
                                <label className="required-field">Name</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                    onBlur={this.validateName}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.name.error &&
                                <div className="input-error">{this.state.validation.name.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label className="required-field">Email Of Creator</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.emailOfCreator}
                                    onChange={this.onEmailOfCreatorChange}
                                    onBlur={this.validateEmailOfCreator}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.emailOfCreator.error &&
                                <div className="input-error">{this.state.validation.emailOfCreator.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label>Date of Creation</label>
                            </Col>
                            <div className={{"display": "flex"}} onClick={clearStatus}>
                                <DatePicker
                                    style={{"display": "flex"}}
                                    value={this.state.dateOfCreation ? moment(this.state.dateOfCreation) : null}
                                    onChange={this.onDateOfCreationChange}
                                    disabledDate={this.disablePastDays}
                                />
                            </div>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label className="required-field">Type</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.type}
                                    onChange={this.onTypeChange}
                                    onBlur={this.validateType}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.type.error &&
                                <div className="input-error">{this.state.validation.type.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <div className="form-row">
                        <Row type="flex" justify="start">
                            <Col span={3}>
                                <label className="required-field">Description</label>
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={this.state.description}
                                    onChange={this.onDescriptionChange}
                                    onClick={clearStatus}
                                />
                                {this.state.validation.description.error &&
                                <div className="input-error">{this.state.validation.description.error}</div>}
                            </Col>
                        </Row>
                    </div>
                    <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
                        {isEmpty(selectedGame) ? "Create" : "Update"}
                    </Button>
                </form>
            </Fragment>
        );
    }
}

GameForm.propTypes = {
    createGame: PropTypes.func.isRequired,
    fetchGamesInfo: PropTypes.func.isRequired,
    updateGame: PropTypes.func.isRequired,
    clearFlag: PropTypes.bool.isRequired,
    setClearFlag: PropTypes.func.isRequired,
    selectedGame: PropTypes.object.isRequired,
    clearStatus: PropTypes.func.isRequired
};

export default GameForm;