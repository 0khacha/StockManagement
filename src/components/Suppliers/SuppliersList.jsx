// // SupplierList.js
//
// import React from 'react';
//
// function SupplierList() {
//     // Dummy data for demonstration
//     const suppliers = [
//         { id: 1, name: 'Supplier 1', email: 'supplier1@example.com', phone: '123-456-7890' },
//         { id: 2, name: 'Supplier 2', email: 'supplier2@example.com', phone: '234-567-8901' },
//         { id: 3, name: 'Supplier 3', email: 'supplier3@example.com', phone: '345-678-9012' },
//     ];
//
//     return (
//         <div className="supplier-list">
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {suppliers.map(supplier => (
//                         <tr key={supplier.id}>
//                             <td>{supplier.id}</td>
//                             <td>{supplier.name}</td>
//                             <td>{supplier.email}</td>
//                             <td>{supplier.phone}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
//
// export default SupplierList;
