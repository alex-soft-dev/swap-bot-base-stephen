import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component"
import { TransactionListItemProps } from "../pages/HomePage";

export const WalletTable = () => {
    

    type DataRow = {
        no: number,
        address: string
    }
    const columns: TableColumn<DataRow>[] = [
        {
            name: 'No',
            selector: row => row.no
        },
        {
            name: 'Address',
            selector: row => row.address
        },
    ];

    const data = [
        {
            no: 1,
            address: 'HfpM...PASq'
        },
        {
            no: 2,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 3,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 4,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 5,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 6,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 7,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 8,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 9,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 10,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 11,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 12,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
        {
            no: 13,
            address: 'HfpMt47kLLLv1euzL9ujCk4QdTkUwFZuRVAtbaYCPASq'
        },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '32px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057'
            }
        },
        headRow: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                background: '#0D1521',
                color: 'white',
                border: '1px solid #495057',
                fontSize: '16px'
            },
        },
        pagination: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057',
            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '30px',
                width: '30px',
                padding: '3px',
                margin: '2px',
                cursor: 'pointer',
                transition: '0.4s',
                color: 'white',
                filter: 'invert(1)'
            },
        }
    };

    const paginationRowsPerPageOptions = {
        rowsPerPageText: '',
        rangeSeparatorText: 'de',
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Todos',
        noRowsPerPage: true,
    }

    return (
        <div className="WalletTable">
            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles}
                paginationPerPage={5}
                paginationComponentOptions={paginationRowsPerPageOptions}
            />
        </div>
    )
}

interface DataProps {
    data: TransactionListItemProps[]
}


export const TransactionTable: React.FC<DataProps> = (data) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const columns: TableColumn<TransactionListItemProps>[] = [
        {
            name: 'Date',
            cell: row => {
                const date = new Date(row.updatedAt);
                const formattedDate = date.toISOString().replace(/-/g, '/').replace('T', ' ').slice(0, 19);
                return <span>{formattedDate}</span>;
            },
            width:windowWidth >= 768 ? "20%" : ""
        },
        {
            name: 'Wallet',
            selector: row => (row.wallet).slice(0, 6) + "..." + (row.wallet).slice(-4),
            // width:windowWidth >= 768 ? "20%": ""
        },
        {
            name: 'Hash',
            cell: row => <a href={`https://basescan.org/tx/${row.hash}`} target="_blank" className="nav-link text-primary">{(row.hash).slice(0, 6) + "..." + (row.hash).slice(-4)}</a>,
            // width:windowWidth >= 768 ? "20%" : ""
        },
        {
            name: 'ETH',
            selector: row => row.eth,
            // width:windowWidth >= 768 ? "10%" : ""
        },
        {
            name: 'Token',
            selector: row => row.token,
            // width:windowWidth >= 768 ? "10%" : ""
        },
        {
            name: 'Action',
            cell: row => row.action === "BUY" ? <span className="text-success fw-bold">BUY</span> : <span className="text-danger fw-bold">SELL</span>,
            // width:windowWidth >= 768 ? "10%" : ""
        },
        
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '32px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057'
            }
        },
        headRow: {
            style: {
                background: '#0D1521',
                color: 'white',
                border: '1px solid #495057',
                fontSize: '16px'
            },
        },
        pagination: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                background: '#131C2B',
                color: 'white',
                border: '1px solid #495057',
            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '30px',
                width: '30px',
                padding: '3px',
                margin: '2px',
                cursor: 'pointer',
                transition: '0.4s',
                color: 'white',
                filter: 'invert(1)'
            },
        },
        cells: {
            style: {
                width: '100%',
            },
        },
    };

    return (
        <div className="TransactionTable">
            <DataTable
                columns={columns}
                data={data.data}
                pagination
                customStyles={customStyles}
            />
        </div>
    )
}