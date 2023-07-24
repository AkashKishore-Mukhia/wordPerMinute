import React, { useEffect, useState, useMemo } from 'react'
import { COLUMNS } from './columns'
import { usePagination, useTable } from 'react-table';
import { Chart } from "react-google-charts";
import Footer from '../../footer/footer';
import './user.css';

export default function User({ id, username, email}) {
  const [data, setData] = useState([]);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const [best, setBest] = useState(0);
  const [display, setDisplay] = useState({ pleaseWait: 'block' });
  const [gpData, setGpData] = useState([
    [
      "test",
      "Word Per Minute",
      "Accuracy",
    ],
  ])

  const findAvarage = (rows) => {
    let sum = 0;
    rows.map(row => {
      sum += row.wordPerMinute;
    })

    return Math.floor(sum/rows.length);
  }

  const fetchData = async (id) => {
    const response = await fetch('https://wild-red-prawn-hat.cyclic.app/api/v1/user/data', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });
    const userData = await response.json();
    setDisplay({ pleaseWait: 'none' });
    userData.data.map((data, index) => {
      gpData.push([index + 1, Number(data.wordPerMinute), Number(data.accuracy)]);
      setGpData(gpData);
    })
    const dataArray = userData.data.reverse();
    setAvgSpeed(findAvarage(dataArray.slice(0, 10)));
    setBest(userData.best);
    setData(dataArray);
  }


  const columns = useMemo(() => COLUMNS, []);
  const row = useMemo(() => data, [data])

  const tableInstance = useTable({ columns, data: row }, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    prepareRow,
  } = tableInstance

  const options = {
    chart: {
      title: "Word per Minute and Accuracy",
      subtitle: "",
    },
  };


  useEffect(() => {
    fetchData(id);
  }, []);

  const { pageIndex } = state;

  return (
    <>
      <div className='profile'>
        <h2>Your Profile</h2>
        <hr></hr>
        <div className='user-info'>
          <div className='basic-info'>
            <h2 title='Username' className='username'>{username}</h2>
            <p className='email'><span>Email: </span>{email}</p>
          </div>
          <div className='wpm'>
            <h2 title='Best speed'>{best} WPM</h2>
          </div>
        </div>
        <div className='Test-info'>
          <div className='avg-speed'>
            <p title='Average of last 10 test'>Average Speed <span>{avgSpeed} WPM</span></p>
          </div>
          <div className='no-of-tests'>
            <p>No of Tests <span>{data.length}</span></p>
          </div>
        </div>
      </div>

      <div className='typing-data'>
        <h2>Your Latest Test Results</h2>
        <table {...getTableProps()}>
          <thead>
            {// Loop over the header rows
              headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {// Loop over the headers in each row
                    headerGroup.headers.map(column => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {// Render the header
                          column.render('Header')}
                      </th>
                    ))}
                </tr>
              ))}
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {// Loop over the table rows
              page.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {// Loop over the rows cells
                      row.cells.map(cell => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {// Render the cell contents
                              cell.render('Cell')}
                          </td>
                        )
                      })}
                  </tr>
                )
              })}
          </tbody>
        </table>

        <div className='btn'>
          <h4 style={{ display: display.pleaseWait }}>please wait...</h4>
          <span>
            page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
          </span>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>previous</button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>next</button>
        </div>
      </div>

      <div className='chart-container'>
        <div className='chart'>
          <Chart
            chartType="Line"
            width="70vw"
            height="400px"
            data={gpData}
            options={options}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
