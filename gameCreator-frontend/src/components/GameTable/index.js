import React from 'react';
import PropTypes from 'prop-types';

import {Divider, Table} from 'antd';
import {isEmpty} from "../../utils/utils";

function GameTable(props) {
    const {gamesInfo, setSelectedGame, deleteGame} = props;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: name => <div>{name}</div>
        },
        {
            title: 'Email Of Creator',
            dataIndex: 'emailOfCreator',
            key: 'emailOfCreator',
            render: emailOfCreator => <div>{emailOfCreator}</div>
        },
        {
            title: 'Date of Creation',
            dataIndex: 'dateOfCreation',
            key: 'dateOfCreation',
            render: dateOfCreation => <div>{isEmpty(dateOfCreation) ? "-" : dateOfCreation.substring(0, 10)}</div>
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: type => <div>{type}</div>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: description => <div>{description}</div>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, game) => (
                <span>
                        <a onClick={() => setSelectedGame(game)}>Edit</a>
                        <Divider type="vertical"/>
                        <a onClick={() => deleteGame(game.key)}>Delete</a>
                    </span>
            )
        },
    ];
    const gamesData = gamesInfo.map(game => {
        return ({
            key: game.id,
            name: game.name,
            emailOfCreator: game.emailOfCreator,
            dateOfCreation: game.dateOfCreation,
            type: game.type,
            description: game.description,
        })
    });
    return (
        <Table columns={columns} dataSource={gamesData}/>
    )
}

GameTable.propTypes = {
    gamesInfo: PropTypes.array.isRequired,
    setSelectedGame: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired
};

export default GameTable;