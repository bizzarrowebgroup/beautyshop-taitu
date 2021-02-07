import React, { useState, useEffect } from 'react';
import fire from '../config/fire-config';

import { useTable } from "react-table";

import ModalFotoDetails from "./ModalFotoDetails";
import ModalCreateFoto from './ModalCreateFoto';

function Table({ columns, data, toggleEdit, toggleModify }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });

    return (
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table {...getTableProps()} className="min-w-full leading-normal">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{column.render("Header")}</th>
                                ))}
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">*</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            //console.log("---row---", row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {cell.render("Cell")}
                                        </td>;
                                    })}
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                        <button type="button" className="inline-block text-gray-500 hover:text-gray-700" onClick={() => toggleModify(row.original)}>
                                            <i className="fa fa-pencil fa-lg transition duration-150"></i>
                                        </button>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                        <button type="button" className="inline-block text-gray-500 hover:text-gray-700" onClick={() => toggleEdit(row.original.id)}>
                                            <i className="fa fa-trash fa-lg transition duration-150"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const ShowCommercianti = () => {
    const [showCreateFoto, setCreateModal] = useState(false);
    const [modalDetails, setModalEditDetails] = useState(false);
    const [modalDetailsInfo, setModalDetailsInfo] = useState(undefined);
    const [deleteItemId, setDelete] = useState(undefined);
    const [fotoDB, setFoto] = useState(undefined);
    const [commercianti, setCommercianti] = useState(undefined);
    const [isLoading, setLoading] = useState(true);
    const [commercianteToCreateID, setCommerciante] = useState(undefined)
    const [isNewChecked, setNewCheked] = useState(false);
    const [fotoUrl, setFotoUrl] = useState(undefined);
    const arrayToObject = (array) =>
        array.reduce((obj, item) => {
            obj[item.id] = item
            return obj
        }, {})

    const loadPage = async () => {
        try {
            const fotoRef = fire.firestore().collection('foto');
            const commerciantiRef = fire.firestore().collection('commercianti');

            const [fotoSnapshot, commerciantiSnapshot] = await Promise.all([fotoRef.get(), commerciantiRef.get()]);
            const listFotos = fotoSnapshot.docs;

            const listCommercianti = commerciantiSnapshot.docs;
            if (listCommercianti && listFotos) {
                //Logging
                const fotoFirebase = listFotos.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFoto(fotoFirebase);
                let commerciantiFirebase = listCommercianti.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                commerciantiFirebase = arrayToObject(commerciantiFirebase);
                setCommercianti(commerciantiFirebase);
                setLoading(false)
            } else {

                setLoading(false)
                alert("errore generico firebase", error)
            }


        } catch (error) {
            alert("errore generico firebase", error)
            setLoading(false)
        }
    }
    useEffect(() => {
        loadPage()
    }, []);
    const RenderImage = ({ value }) => {
        return (
            <div className="flex-shrink-0 h-10 w-10">
                <img className="h-10 w-10 rounded-full" src={value.row.original?.url ? value.row.original?.url : ""} alt="" />
            </div>
        )
    }
    const RenderIsMain = ({ value }) => {
        return (
            <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                    {value.row.original?.isMain === true ? "si" : "no"}
                </p>
            </div>
        )
    }
    const RenderCommerciante = ({ value }) => {
        let id = value.row.original?.commercianti ? value.row.original?.commercianti : undefined
        if (id !== undefined) {
            if (commercianti[id]) {
                return (
                    <div>
                        {commercianti[id].title}
                    </div>
                )
            } else return null
        } else return null
    }
    const columns = [

        {
            Header: "Commerciante",
            accessor: "commercianti",
            Cell: props => <RenderCommerciante value={props} />
        },
        {
            Header: "E' principale",
            accessor: "isMain",
            Cell: props => <RenderIsMain value={props} />
        },
        {
            Header: "Foto",
            accessor: "url",
            Cell: props => <RenderImage value={props} />
        },
    ];
    const createFoto = async () => {
        try {
            const newdoc = {
                commercianti: commercianteToCreateID,
                isMain: isNewChecked,
                url: fotoUrl
            }
            // console.log("--NEW OK--", newdoc);
            const res = await fire.firestore().collection('foto').add(newdoc);
            if (res) {
                // console.log("--CANCELLATO OK--");
            }
        } catch (error) {
            console.log(error, "--errorcancellazione--")
        }
        setCreateModal(!showCreateFoto);
        loadPage()
    }
    if (isLoading) {
        return (
            <div className="flex h-screen bg-rose-600">
                <div className="m-auto">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <button onClick={() => setCreateModal(!showCreateFoto)} className={`border-green-400 col-span-1 shadow-sm rounded-md duration-200 focus:outline-none border hover:border-green-400 border-gray-200" type="button`}>{"ADD"}</button>
            {fotoDB !== undefined && commercianti !== undefined && (
                <Table
                    columns={columns}
                    data={fotoDB}
                    toggleModify={(data) => {
                        console.log("---data---", data)
                        setModalEditDetails(!modalDetails);
                        setModalDetailsInfo({ ...data, com: commercianti[data.commercianti] });
                    }}
                />
            )}
            <ModalFotoDetails
                data={modalDetailsInfo}
                onCancel={() => {
                    setModalEditDetails(!modalDetails);
                }}
                show={modalDetails}
            />
            <ModalCreateFoto
                commercianti={commercianti}
                onCancel={() => { setCreateModal(!showCreateFoto) }}
                show={showCreateFoto}
                setCommerciante={(id) => { setCommerciante(id) }}
                createFoto={createFoto}
                isChecked={isNewChecked}
                changeCheck={() => { setNewCheked(!isNewChecked) }}
                fotoUrl={fotoUrl}
                setFotoUrl={(i) => { setFotoUrl(i.target.value) }}
            />
            
        </div>
    )
}
export default ShowCommercianti;