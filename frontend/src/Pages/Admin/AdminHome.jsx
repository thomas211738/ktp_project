import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';


const AdminHome = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      axios
        .get('http://localhost:3000/user')
        .then((response) => {
          setUsers(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return (
      <div>
        <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>First Name</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Last Name
          </th>
          <th className='border border-slate-600 rounded-md'>
            Strikes
          </th>
          <th className='border border-slate-600 rounded-md'>Pledge Task</th>
          {/* <th className='border border-slate-600 rounded-md'>Operations</th> */}
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {user.firstName}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {user.lastName}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {user.strikes}
            </td>
            <td className='border border-slate-700 rounded-md text-center '>
              {user.pledgeTask}
            </td>
            {/* <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    )
  }
  
  export default AdminHome;