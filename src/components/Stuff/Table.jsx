import React, { useState, useEffect } from "react";
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import ModalAdd from "./ModalAdd";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

export default function Table({ headers, data = [], endpoint, identitasColumn, inputData, titleModal, opsiButton = [] }) {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [endpointToSend, setEndpointToSend] = useState({});
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        console.log("Data: ", data);
    }, [data]);

    function handleModalDelete(id) {
        const endpointDelete = endpoint['delete'];
        const endpointDetail = endpoint['data_detail'];

        const replaceUrlDelete = endpointDelete.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);

        const endpointReplaced = {
            "data_detail": replaceUrlDetail,
            "delete": replaceUrlDelete,
        };

        setEndpointToSend(endpointReplaced);
        setIsModalDeleteOpen(true);
    }

    function handleRestore(id) { 
        const endpointRestore = endpoint['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }

    function handlePermanentDelete(id) { 
        const endpointPermanentDelete = endpoint['permanentDelete'].replace("{id}", id); 
        axios.delete(endpointPermanentDelete, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }

    function handleModalEdit(id) {
        const endpointUpdate = endpoint['update'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlUpdate = endpointUpdate.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail": replaceUrlDetail,
            "update": replaceUrlUpdate,
        }
        console.log(endpointReplaced);

        setEndpointToSend(endpointReplaced);
        setIsModalEditOpen(true);
    }

    function handleModalAdd() {
        const endpointToSend = {
            "store" : endpoint['store'],
        };
        setEndpointToSend(endpointToSend);
        setIsModalAddOpen(true);
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
                <div className="flex justify-end">
                    {opsiButton.includes("create") && (
                        <button type="button" onClick={handleModalAdd} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5">Create</button>
                    )}
                    {opsiButton.includes("trash") && (
                        <button type="button" onClick={() => navigate('/stuff/trash')} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5">Trash</button>
                    )}
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {headers.map((header, index) => (
                                <th scope="col" className="px-6 py-3" key={index}>{header}</th>
                            ))}
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}.</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.category}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.total_available}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.total_defac}</td>
                                <td className="px-6 py-4 text-right">
                                    {opsiButton.includes("edit") && (
                                        <button type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleModalEdit(item.id)}>Edit</button>
                                    )}
                                    {opsiButton.includes("delete") && (
                                        <button type="button" className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3" onClick={() => handleModalDelete(item.id)}>Delete</button>
                                    )}
                                    {opsiButton.includes("restore") && (
                                        <button onClick={() => handleRestore(item.id)} type="button" className="font-medium text-green-600 dark:text-blue-500 hover:underline ml-3">Restore</button>
                                    )}
                                    {opsiButton.includes("permanentDelete") && (
                                        <button onClick={() => handlePermanentDelete(item.id)} type="button" className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">Permanent Delete</button>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={headers.length + 1} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} endpoint={endpointToSend} identitasColumn={identitasColumn} />
            <ModalEdit isopen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} endpoint={endpointToSend} inputData={inputData} titleModal={titleModal} />
            <ModalAdd isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} endpoint={endpointToSend} inputData={inputData} titleModal={titleModal} />
        </>
    );
}
