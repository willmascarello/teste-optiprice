import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [optipriceData, setOptipriceData] = useState([])
  const [optipriceDataFiltered, setOptipriceDataFiltered] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all')

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          setOptipriceData(response.data)
          setOptipriceDataFiltered(response.data)
        })
        .catch(error => {
          console.error('Error:', error)
        })
    }, [])

  useEffect(() => {
    const filteredData = optipriceData.filter(item => {
      return (
        filterBy === 'title' ?
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) :
          filterBy === 'body' ?
            item.body.toLowerCase().includes(searchTerm.toLowerCase()) : 
            // all
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.body.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    });

    setOptipriceDataFiltered(filteredData);
  }, [searchTerm, filterBy])

  const handleEdit = (id, field, value) => {
    const updatedData = optipriceData.map(post => {
      if (post.id === id) {
        return { ...post, [field]: value };
      }
      return post;
    });
    setOptipriceData(updatedData);
    setOptipriceDataFiltered(updatedData);
  };

  return (
    <>   
      <div className="flex items-center justify-between py-4 dark:border-gray-700">
        <div className="pb-4">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="text" id="table-search" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 default-height" placeholder="Search for items" 
              onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
      
        <div className="pb-4">
          <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 default-height"
          onChange={(e) => setFilterBy(e.target.value)} 
          >
            <option defaultValue value="all">Title and Body</option>
            <option value="title">Title</option>
            <option value="body">Body</option>
          </select>
        </div>
      </div>

      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 w-1/12">
                          User ID
                      </th>
                      <th scope="col" className="px-6 py-3 w-5/12">
                          Title
                      </th>
                      <th scope="col" className="px-6 py-3 w-6/12">
                          Body
                      </th>
                  </tr>
              </thead>
              <tbody>
                {optipriceDataFiltered.map((post) => (
                  <tr key={post.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4">
                          {post.userId}
                      </td>
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <input
                            type="text"
                            value={post.title}
                            maxLength={100}
                            onChange={(e) => handleEdit(post.id, 'title', e.target.value)}
                            className="p-2 w-full bg-transparent border-none"
                          />
                      </td>
                      <td className="px-6 py-4">
                          <textarea
                            cols="100"
                            rows="4"
                            maxLength="500"
                            type="text"
                            value={post.body}
                            onChange={(e) => handleEdit(post.id, 'body', e.target.value)}
                            className="p-2 w-full h-auto bg-transparent border-none resize-none"
                          />
                      </td>
                  </tr>
                ))}
              </tbody>
          </table>
      </div>

    </>
  )
}

export default App
