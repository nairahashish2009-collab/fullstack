import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
function StudentsTable() {
  const[student,setstudent]=useState([])
  const[name,setname]=useState("")
  const[email,setemail]=useState("")
  const[phone,setphone]=useState("")
  async function getdata() {
    const respons=await axios.get("http://localhost:3000/get")
    console.log(respons)
    setstudent(respons.data)
  }
  async function deletstudent(id) {
    await axios.delete(`http://localhost:3000/delete/${id}`)
    getdata()
    
  }
   async function addstudent(e) {
    e.preventDefault()
    await axios.post("http://localhost:3000/add",{name,email,phone})
      getdata()
      setname("")
      setemail("")
      setphone("")  
  }
  useEffect(()=>{getdata()},[])
  return (
    <div className="min-h-screen bg-[#eef7fa] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-700">
            Add New Student
          </h2>
          <form onSubmit={addstudent}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <input
            onChange={(e)=>setname(e.target.value)}
            value={name}
              type="text"
              placeholder="Student Name"
              className="h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
            <input onChange={(e)=>setemail(e.target.value)}
            value={email}
              type="email"
              placeholder="Email"
              className="h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
            <input onChange= {(e)=>setphone(e.target.value)}
            value={phone}
              type="text"
              placeholder="Phone"
              className="h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
            <button 
              type="submit"
              className="h-11 rounded-lg bg-green-500 px-5 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              Submit
            </button>
          </div>
          </form>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-700">
              Students List
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              All registered students
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
               {student.map((student)=>( <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {student.id}
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-gray-700">
                    {student.name}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {student.email}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {student.phone}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button onClick={()=>deletstudent(student.id)}
                      type="button"
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                    >
                      <FaTrash size={15} />
                    </button>
                  </td>
                </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsTable;

