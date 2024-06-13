import React, { useEffect, useState } from "react";
import Case from '../../components/Case';
import Table from "../../components/User/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TrashUser() {
    const [usersTrash, setUsersTrash] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/user/trash', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setUsersTrash(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }, [navigate]);

    const headers = [
        "No",
        "Username",
        "Email",
        "Role"
    ];

    const endpointModal = {
        "restore": "http://localhost:8000/user/restore/{id}",
        "permanentDelete": "http://localhost:8000/user/permanent/{id}",
    };

    const inputData = {};

    const title = 'User';

    const columnIdentitasDelete = 'name';

    const buttons = [
        "restore",
        "permanentDelete",
    ];

    const tdColumn = {
        "username": null,
        "email": null,
        "role": null,
    };

    return (
        <Case>
            <Table headers={headers} data={usersTrash} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn} />
        </Case>
    );
}