import React from 'react';
import { Table, TableBody, TableHead, TableRow, TableHeadCell, TableDataCell } from 'react95';

/**
 * Example of React95 Table component
 * Displays data in a Windows 95-styled table
 */
const TableExample = () => {
  const data = [
    { id: 1, name: 'Visual Basic 6', version: '6.0', year: 1998 },
    { id: 2, name: 'Windows 95', version: '4.0', year: 1995 },
    { id: 3, name: 'Internet Explorer', version: '4.0', year: 1997 },
    { id: 4, name: 'MS Office', version: '97', year: 1997 },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Product Name</TableHeadCell>
          <TableHeadCell>Version</TableHeadCell>
          <TableHeadCell>Year</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableDataCell>{item.id}</TableDataCell>
            <TableDataCell>{item.name}</TableDataCell>
            <TableDataCell>{item.version}</TableDataCell>
            <TableDataCell>{item.year}</TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableExample;
