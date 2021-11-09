import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Divider, Table} from 'antd';
import {isEmpty} from "../../utils/utils";


function MSList(props) {
    // const {msPapers, selectedCheck} = props;
    const msPapers = props.history.location.state?.msPapers
    const selectedCheck = props.history.location.state?.selectedCheck

    const toggleCheckbox = (key) => {
        if (selectedCheck.has(key)) {
            selectedCheck.delete(key);
        } else {
            selectedCheck.add(key);
        }
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: title => <div>{title}</div>
        },
        {
            title: 'Publication Year',
            dataIndex: 'publishDate',
            key: 'publishDate',
            render: publishDate => <div>{publishDate}</div>
        },
        // {
        //     title: 'Area',
        //     dataIndex: 'area',
        //     key: 'area',
        //     render: area => <div>{area}</div>
        // },
        // {
        //     title: 'Pdf Link',
        //     dataIndex: 'pdfLink',
        //     key: 'pdfLink',
        //     render: pdfLink => <div>{pdfLink}</div>
        // },
        {
            title: 'Publisher',
            dataIndex: 'publisher',
            key: 'publisher',
            render: publisher => <div>{publisher}</div>
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
            render: weight => <div>{weight}</div>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, paper) => (
                <input
                    type="checkbox"
                    onChange={toggleCheckbox(paper.key)}
                />
            )
        },
    ];
    const paperData = msPapers.map(paper => {
        return ({
            key: paper.id,
            title: paper.title,
            publishDate: paper.publishDate,
            area: paper.area,
            pdfLink: paper.pdfLink,
            publisher: paper.publisher,
            weight: paper.weight,
        })
    });

    return (
        // <h1>"LIST:"</h1>
        <Table columns={columns} dataSource={paperData}/>
    )
}

MSList.propTypes = {
    // msPapers: PropTypes.array.isRequired,
    // selectedCheck: PropTypes.func.isRequired
};

export default MSList;
