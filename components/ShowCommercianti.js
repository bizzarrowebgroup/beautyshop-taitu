import React, { useState, useEffect } from 'react';
import fire from '../config/fire-config';
//import Link from 'next/link';
//import ReactTable from 'react-table';

import { useTable } from "react-table";

import Modal from "./Modal";

function Table({ columns, data, toggleEdit }) {
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
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {cell.render("Cell")}
                      </p>
                    </td>;
                  })}
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button type="button" class="inline-block text-gray-500 hover:text-gray-700" onClick={toggleEdit}>
                      <svg class="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                      </svg>
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
  const [modalShow, setModalShow] = useState(false);
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
  }, []);
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
      <div class="ml-3">
        <p class="text-gray-900 whitespace-no-wrap">
          {value.row.original?.title ? value.row.original.title : "NA"}
        </p>
        <p class="text-gray-600 whitespace-no-wrap">{value.row.original?.via ? value.row.original.via : "NA"}</p>
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
        toggleEdit={() => {
          //console.log("premuto");
          setModalShow(!modalShow);
        }}
      />
      {/*@click="reportModal = true"}*/}
      <Modal isEnabled={modalShow}
        title="Attenzione" desc="Sei sicuro di voler eliminare il seguente commericante?"
        onConfirm={() => {
          //console.log("FANCULO")
          setModalShow(!modalShow);
        }}
        onCancel={() => {
          //console.log("FINALMENTE")
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