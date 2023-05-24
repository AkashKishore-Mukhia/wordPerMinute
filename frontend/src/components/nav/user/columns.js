export const COLUMNS = [
  {
    Header: "Test No",
    Cell: ({row}) => `${row.index + 1}`
  },
  {
    Header: 'Word Per Minute',
    accessor: 'wordPerMinute',
    Cell: ({value}) => `${value} WPM`
  },
  {
    Header: 'Accuracy',
    accessor: 'accuracy',
    Cell: ({value}) => `${value}%`
  },
  {
    Header: 'Date',
    accessor: 'date'
  }
]
