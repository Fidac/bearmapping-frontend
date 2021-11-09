import React, {Fragment, useEffect, useState} from 'react';
import {APIUrls} from "../../constants/urls";
import GameForm, {msgType} from "../GameForm";
import GameTable from "../GameTable";
import LayoutWrapper from "../LayoutWrapper";

export function GamePage() {

    const [gamesInfo, setGamesInfo] = useState([]);
    const [selectedGame, setSelectedGame] = useState({});
    const [statusMsgType, setStatusMsgType] = useState(msgType.SUCCESS);
    const [statusMsg, setStatusMsg] = useState("");
    const [clearFlag, setClearFlag] = useState(false);

    const fetchGamesInfo = async () => {
        await fetch(`${APIUrls.Game}`)
            .then(res => {
                if (res.ok){
                    return res.json();
                } else {
                    throw new Error("Error while fetching game details");
                }
            })
            .then(data => {
                setGamesInfo(data);
                setStatusMsgType(msgType.SUCCESS);
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                setStatusMsg(error.toString());
            });
    };

    //Is equivalent to class component's componentDidMount,
    // componentDidUpdate and componentWillUnmount lifecycle
    // use of the second argument tells it to run only when it mounts
    // if something is provided in second argument then it
    // runs only when the provided value changes
    useEffect(() => {
        fetchGamesInfo();
    }, []);

    //REST API call
    const createGame = (name, emailOfCreator, dateOfCreation, type, description) => {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'emailOfCreator': emailOfCreator,
                'dateOfCreation': dateOfCreation,
                'type': type,
                'description': description,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Game, data)
            .then(res => {
                if (res.ok) {
                 return res.json();
                } else {
                    throw new Error("EmailOfCreator must be unique.")
                }
            })
            .then(data => {
                fetchGamesInfo();
                setClearFlag(true);
                setStatusMsgType(msgType.SUCCESS);
                setStatusMsg("Saved successfully");
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                console.log(error);
                setStatusMsg( error.toString());
            });
    };

    const updateGame = async (id, name, emailOfCreator, dateOfCreation, type, description) => {
        let data = {
            method: 'PUT',
            body: JSON.stringify({
                'id': id,
                'name': name,
                'emailOfCreator': emailOfCreator,
                'dateOfCreation': dateOfCreation,
                'type': type,
                'description': description,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        fetch(APIUrls.Game, data)
            .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("\"Email of Creator must be unique.\"");
            }
            })
            .then(data => {
                fetchGamesInfo();
                setClearFlag(true);
                setStatusMsgType(msgType.SUCCESS);
                setSelectedGame({});
                setStatusMsg("Updated successfully");
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                setStatusMsg(error.toString());
            });
    };

    const deleteGame = (id) => {
        let fetchData = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${APIUrls.Game}delete/${id}`, fetchData)
            .then(res => {
                if (res.ok) {
                fetchGamesInfo();
                } else {
                    throw new Error("Error while deleting game.");
                }
            })
            .catch(error => {
                setStatusMsgType(msgType.ERROR);
                setStatusMsg(error.toString());
            });
    };

    const clearStatus = () => {
        setStatusMsgType(msgType.SUCCESS);
        setStatusMsg("");
    };

    const statusClassName = statusMsgType === msgType.ERROR?'error-status': 'success-status';

    //Fragment allows to group a list of children without adding extra nodes to the DOM
    return (
        <Fragment>
            <GameForm
                createGame={createGame}
                fetchGamesInfo={fetchGamesInfo}
                updateGame={updateGame}
                clearFlag={clearFlag}
                setClearFlag={setClearFlag}
                selectedGame={selectedGame}
                clearStatus={clearStatus}
            />
            {statusMsg && <div className={statusClassName}>{statusMsg}</div>}
            <GameTable
                gamesInfo={gamesInfo}
                setSelectedGame={setSelectedGame}
                deleteGame={deleteGame}
            />
        </Fragment>
    )
}

const WrappedGamePage = LayoutWrapper(GamePage);
export default WrappedGamePage;