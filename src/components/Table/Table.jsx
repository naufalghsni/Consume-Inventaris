import React from 'react'

export default function Table(props) {
    const data = [
        {
          nama : 'Naufal',
          rombel : 'PPLG XI-5',
          rayon : 'Cicurug 1'
        },
        {
          nama : 'Ardan',
          rombel : 'PPLG XI-5',
          rayon : 'Ciawi 5'
        },
        {
          nama : 'TauROG',
          rombel : 'PPLG XI-5',
          rayon : 'Cicurug 4'
        }
      ];

  return (
    <>
        <table border={1}>
            <thead>
                <tr>
                    {
                        props.title.map((val, i) => (
                            <td>{val}</td>
                        ))
                    }
                        {/* <td>No</td>
                        <td>Nama</td>
                        <td>Rombel</td>
                        <td>Rayon</td> */}
                </tr>
            </thead>
            <tbody>
                {props.data}
            </tbody>
        </table>
    </>
  )
}
