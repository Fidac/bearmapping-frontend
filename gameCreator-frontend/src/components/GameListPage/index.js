import React, {Fragment, useEffect, useState} from 'react';
import {APIUrls} from "../../constants/urls";
import GameForm, {msgType} from "../GameForm";
import GameList from "../MSList";
import LayoutWrapper from "../LayoutWrapper";

export function GameListPage() {

    const [gamesInfo, setGamesInfo] = useState([]);
    const [selectedGame, setSelectedGame] = useState({});
    const [statusMsgType, setStatusMsgType] = useState(msgType.SUCCESS);
    const [statusMsg, setStatusMsg] = useState("");
    const [clearFlag, setClearFlag] = useState(false);

    const selectedCheck = new Set();

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

    // const toggleCheckbox = label => {
    //     if (this.selectedCheckboxes.has(label)) {
    //         this.selectedCheckboxes.delete(label);
    //     } else {
    //         this.selectedCheckboxes.add(label);
    //     }
    // }

    //Is equivalent to class component's componentDidMount,
    // componentDidUpdate and componentWillUnmount lifecycle
    // use of the second argument tells it to run only when it mounts
    // if something is provided in second argument then it
    // runs only when the provided value changes
    useEffect(() => {
        fetchGamesInfo();
    }, []);

    const handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        for (const checkbox of selectedCheck) {
            console.log(checkbox, 'is selected.');
        }

        // Put call to Amr Endpoint sending selection
    }

    const clearStatus = () => {
        setStatusMsgType(msgType.SUCCESS);
        setStatusMsg("");
    };

    const statusClassName = statusMsgType === msgType.ERROR?'error-status': 'success-status';

    //Fragment allows to group a list of children without adding extra nodes to the DOM
    return (
        <Fragment>
            <GameList
                gamesInfo={gamesInfo}
                setSelectedGame={setSelectedGame}
                selectedCheck={selectedCheck}
            />
            <form onSubmit={handleFormSubmit}>
                <button className="btn btn-default" type="submit">Save</button>
            </form>
        </Fragment>
    )
}

const WrappedGameListPage = LayoutWrapper(GameListPage);
export default WrappedGameListPage;
