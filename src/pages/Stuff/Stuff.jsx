import React, { useEffect, useState } from "react";
import Case from '../../components/Case'
import Table from "../../components/Stuff/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Stuff() {
    const [stuffs, setStuffs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getStuffs()
    }, []);

    function getStuffs() {
        axios.get('http://localhost:8000/stuffs', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            } else {
                console.error("Gagal mengambil data stuff:", err);
            }
        });
    }

    const headers = [
        "No",
        "Name",
        "Category",
        "Total Available",
        "Total Defect"
    ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/stuff/{id}",
        "delete": "http://localhost:8000/stuff/{id}",
        "update" : "http://localhost:8000/stuff/update/{id}",
        "store" : "http://localhost:8000/stuff/store",
    }

    const columnIdentitasDelete = 'name';

    const inputData = {
        "name": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "category" : {
            "tag": "select",
            "type": "select",
            "option": ["HTL", "KLN", "Teknisi/Sarpras"]
        },
    }

    const titleModal = 'Stuff';

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
    ];

    const tdColumn = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_": "total_defac",
    }

    return (
        <Case>
            <div className="mt-20">
                <h1 className="mr-2 text-sm font-semibold uppercase text-center text-white">Data Stuff</h1>
            </div>
            <Table headers={headers} data={stuffs} endpoint={endpointModal} identitasColumn={columnIdentitasDelete} inputData={inputData} titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}