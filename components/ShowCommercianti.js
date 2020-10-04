import React, { useState, useEffect } from 'react';
import fire from '../config/fire-config';
//import Link from 'next/link';
//import ReactTable from 'react-table';

import { useTable } from "react-table";

import Modal from "./Modal";
import ModalDetails from "./ModalDetails";

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
                      {/*<p className="text-gray-900 whitespace-no-wrap">*/}
                      {cell.render("Cell")}
                      {/*</p>*/}
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
  const [blogs, setBlogs] = useState([]);
  const [fotos, setFotos] = useState([]);
  //const [orari, setOrari] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);
  const [modalDetailsInfo, setModalDetailsInfo] = useState(undefined);
  const [modalFotos, setModalFotos] = useState(undefined);
  //const [modalOrari, setModalOrari] = useState(undefined);
  const [deleteItemId, setDelete] = useState(undefined);
  const [days, setDay] = React.useState(undefined);
  useEffect(() => {
    fire.firestore()
      .collection('commercianti')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
      });
    fire.firestore()
      .collection('foto')
      .onSnapshot(snap => {
        const fotos = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFotos(fotos);
      });

  }, []);
  const renderOrari = async (ID) => {
    const orariRef = fire.firestore().collection('orari');
    const snapshot = await orariRef.where('commercianti', '==', ID).get();
    if (!snapshot.empty) {
      let hours = [];
      snapshot.forEach(async (doc) => {
        const orariRefInternal = fire.firestore().collection('orari').doc(doc.id).collection('orario');
        const snapshotInternal = await orariRefInternal.get();
        if (snapshotInternal.empty) {
          console.log('No matching orario');
        }
        snapshotInternal.forEach(doc => {
          hours.push({ id: doc.id, ...doc.data() });
        })
        hours.forEach(h => {
          switch (h.day) {
            case 1:
              if (h.open === "" || h.close === "") {
                setDay(day => ({ ...day, lunedi: { closed: true, start: null, end: null } }))
              } else {
                setDay(day => ({ ...day, lunedi: { closed: false, start: h.open, end: h.close } }))
              }
              break;
            case 2:
              if (h.open === "" || h.close === "") {
                setDay(day => ({ ...day, martedi: { closed: true, start: null, end: null } }))
              } else {
                setDay(day => ({ ...day, martedi: { closed: false, start: h.open, end: h.open } }))
              }
              break;
            case 3:
              if (h.open === "" || h.close === "") {
                setDay(day => ({ ...day, mercoledi: { closed: true, start: null, end: null } }))
              } else {
                setDay(day => ({ ...day, mercoledi: { closed: false, start: h.open, end: h.open } }))
              }
              break;
            case 4:
              if (h.open === "" || h.close === "") {
                setDay(day => ({ ...day, giovedi: { closed: true, start: null, end: null } }))
              } else {
                setDay(day => ({ ...day, giovedi: { closed: false, start: h.open, end: h.open } }))
              }
              break;
            case 5:
              if (h.open === "" || h.close === "") {
                setDay(day => ({ ...day, venerdi: { closed: true, start: null, end: null } }))
              } else {
                setDay(day => ({ ...day, venerdi: { closed: false, start: h.open, end: h.open } }))
              }
              break;
            case 6:
              if (h.open === "" || h.close === "") {
                setDay(day => ({ ...day, sabato: { closed: true, start: null, end: null } }))
              } else {
                setDay(day => ({ ...day, sabato: { closed: false, start: h.open, end: h.open } }))
              }
              break;
            case 7:
              if (h.open === "" || h.close === "") {
                setDay(day => ({ ...day, domenica: { closed: true, start: null, end: null } }))
              } else {
                setDay(day => ({ ...day, domenica: { closed: false, start: h.open, end: h.open } }))
              }
              break;
          }
        })
      });
    } else {
      setDay(undefined)
    }
  }
  const TipologiaCommerciante = ({ value }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    let firstSpan = value == 0 ? "text-green-900" : "text-orange-900";
    let secondSpan = value == 0 ? "bg-green-200" : "bg-orange-200";
    return (
      <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${firstSpan}`}>
        <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${secondSpan}`}></span>
        <span className="relative">{value == 0 ? "Parrucchiere" : "Estetista"}</span>
      </span>
    );
  };
  const TitoloCommericante = ({ value }) => {
    //console.log("---value---", value)
    return (
      <div className="ml-3">
        <p className="text-gray-900 whitespace-no-wrap">
          {value.row.original?.title ? value.row.original.title : "NA"}
        </p>
        <p className="text-gray-600 whitespace-no-wrap text-xs">{value.row.original?.via ? value.row.original.via : "NA"}</p>
      </div>
    );
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Nome Commerciante",
        accessor: "title",
        Cell: props => <TitoloCommericante value={props} />
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Tel",
        accessor: "phone"
      },
      {
        Header: "Tipo",
        accessor: "tipo",
        Cell: ({ cell: { value } }) => <TipologiaCommerciante value={value} />
      },
    ],
    []
  );
  return (
    <div>
      <Table columns={columns} data={blogs}
        toggleEdit={(id) => {
          setModalShow(!modalShow);
          setDelete(id);
        }}
        toggleModify={(data) => {
          setModalDetails(!modalDetails);
          //let index = fotos.findIndex(f => f.commercianti == data.id);
          var filteredArray = fotos.filter(f => f.commercianti === data.id);
          renderOrari(data.id)
          setModalDetailsInfo(data);
          setModalFotos(filteredArray);
        }}
      />
      <ModalDetails
        isEnabled={modalDetails}
        data={modalDetailsInfo}
        fotos={modalFotos}
        orari={days}
        onCancel={() => {
          setModalDetails(!modalDetails);
        }}
      />
      <Modal
        isEnabled={modalShow}
        title="Attenzione" desc="Sei sicuro di voler eliminare il seguente commericante?"
        onConfirm={async () => {
          try {
            const res = await fire.firestore().collection('commercianti').doc(deleteItemId).delete();
            if (res) {
              console.log("--CANCELLATO OK--");
            }
          } catch (error) {
            console.log(error, "--errorcancellazione--")
          }
          setModalShow(!modalShow);
        }}
        onCancel={() => {
          setModalShow(!modalShow);
        }}
      />
      {/*<ul>
        {blogs.map(blog =>
          <Link href="/commercianti/[id]" as={'/commerciante/' + blog.id}>
            <a>{blog.title}</a>
          </Link>
        )}
      </ul>*/}
    </div >
  )
}
export default ShowCommercianti;