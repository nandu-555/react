import { Link, resolvePath, useNavigate, useParams } from "react-router-dom";
import { useDebugValue, useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";
import { CodeBracketSquareIcon } from "@heroicons/react/16/solid";

export default function Customer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState();
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (!customer) return;
        if (!tempCustomer) return;
        let equal = true;
        if (customer.name !== tempCustomer.name) equal = false;

        if (customer.industry !== tempCustomer.industry) equal = false;
        
        if (equal) setChanged(false);
    });


    useEffect(() => {
        console.log('useEffect');
        const url = baseUrl + 'api/customers/' + id;
        fetch(url)
        .then((response) => {
            if(response.status === 404){
                //render a 404 component in this page
                setNotFound(true);
            }

            if (!response.ok)
                // console.log('response', response);
                throw new Error('Something went wrong, try again later');
            
            return response.json();
        })
        .then((data) => {
            setCustomer(data.customer);
            setTempCustomer(data.customer);
            setError(undefined);
        })
        .catch((e) => {
            setError(e.message);
        })
    }, []);

    function updateCustomer(e) {
        e.preventDefault();
        const url = baseUrl + 'api/customers/' + id;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempCustomer)
        })
        .then((response) => {
            // console.log('response', response);
            if (!response.ok) throw new Error('something went wrong');
            return response.json();
        })
        .then((data) => {
            setCustomer(data.customer);
            setChanged(false);
            console.log(data);
            setError(undefined);
        })
        .catch((e) => {
            // console.log('e', e);
            setError(e.message);
        });
    }

    

    return  (
    <div className="p-3"> 
        {notFound ? <p>The customer with id {id} was not found</p> : null}

        {customer ? (
            <div>
                <form className="w-full max-w-sm" id="customer" onSubmit={updateCustomer}>

                <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                <label for="name">Name</label>
                </div>
                {/* <p className="m-2 block px-2" >ID: {tempCustomer.id}  </p> */}
                
                <div className="md:w-3/4">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="name" type="text" value={tempCustomer.name} onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({...tempCustomer, name: e.target.value,});
                }} />
                </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                <label for="industry">Industry</label>
                </div>
                <div className="md:w-3/4">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="industry" type="text" value={tempCustomer.industry} onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({...tempCustomer, industry: e.target.value,});
                }} />
                </div>
                </div>
                </form>
                {changed ? (
                    <div className="mb-2">
                        <button className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 mr-2 rounded" onClick={(e) => {
                            setTempCustomer({...customer});
                            setChanged(false);
                        }}>Cancel</button> 

                        <button form="customer" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" >Save</button>
                    </div> 
                ) : null}

                <div>
                    <button 
                    className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => {
                        const url = baseUrl + 'api/customers/' + id;
                        fetch(url, { method: 'DELETE', headers:{
                            'Content-Type' : 'application/json',
                        },
                    })
                        .then((response) => {
                            if(!response.ok){
                                throw new Error('Something went wrong');
                            }
                            navigate('/customers');
                        } )
                        .catch((e) => {
                            setError(e.message);
                        });
                    }}
                >
                    Delete
                </button>
                </div>
            </div>
        ) : null} 

        {error ? <p>{error}</p> : null}
        <br />
        <Link to='/customers'> 
          <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          ← Go back
          </button>
        </Link>
     </div>
    );
}








