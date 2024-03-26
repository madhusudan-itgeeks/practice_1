import React, { useEffect, useState } from 'react';
import "./dashborad.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Dashboard() {



    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedBy, setSortedBy] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');
    const [limit, setLimit] = useState(12);
    let [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reachedEnd, setReachedEnd] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate=useNavigate()
    console.log(offset);
    const api = `https://freetestapi.com/api/v1/products?limit=50&offset=${offset}`;
  

    const fetchProductData = async () => {
        setLoading(true);
        try {
            const response = await fetch(api);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
           setProducts(data)
            // setProducts((prev) => [...prev, ...data])
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };





    useEffect(() => {
        fetchProductData();
    }, [offset]);







    const fetchProductDataBySearch = async (query,e) => {
        setLoading(true)
        try {
            const response = await fetch(`https://freetestapi.com/api/v1/products?search=${query}&limit=${limit}&offset=${offset}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setProducts(data);
         
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

useEffect(()=>{
fetchProductDataBySearch(searchQuery)
},[searchQuery])

    const handleSearch = (e) => {

        // const filteredProducts = products.filter(product =>
        //     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //     product.price.toString().includes(searchQuery) ||
        //     product.rating.toString().includes(searchQuery)
        // );
        // return filteredProducts;
        setSearchQuery(e.target.value)
        
        if(searchQuery.length>0){
        fetchProductDataBySearch(searchQuery)}
        else{
            setProducts(fetchProductDataBySearch(''))
        }
        console.log('hshhsh');
    };

    const handleSort = (event) => {
        setSortedBy(event.target.value);
    };

    const handleSortOrder = (event) => {
        setSortOrder(event.target.value);
    };

    const handleLoadMore = () => {
        setOffset(offset+=12);
    };


  

    useEffect(() => {

        const sortedProducts = [...products].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[sortedBy] - b[sortedBy];
            } else {
                return b[sortedBy] - a[sortedBy];
            }
        });
        setProducts(sortedProducts);
    }, [sortedBy, sortOrder]);

    const handleLogout = () => {
 
        Cookies.remove('token');
       
        navigate('/');
      };

      const handleConfirmLogout = () => {
        handleLogout();
        setShowModal(false);
      };
    
      const handleCancelLogout = () => {
        setShowModal(false);
      };

    return (
        <div className='main-dashboard'>
               
         
            <div className='search-sort'>
            
                <input
              
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by name, price, or rating"
                />



                <select className='select' onChange={handleSort}>
                    <option value="price">Sort by Price</option>
                    <option value="rating">Sort by Rating</option>
                </select>
                <select className='order-serach' onChange={handleSortOrder}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

              
                <div>
      <button className='log-out' onClick={() => setShowModal(true)}>Logout</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to logout?</p>
            <button onClick={handleConfirmLogout}>Yes</button>
            <button onClick={handleCancelLogout}>Cancel</button>
          </div>
        </div>
      )}
    </div>
            </div>
            <div className='inside-man'>
                {loading ? <div>Loading...</div> :
                    products.map((product, index) => (
                        <div className='content-data' key={index}>
                            <div className='inside-image'>
                                <div className='imag-scale-anima'>
                                    <img src={product.image} alt='/' height={300} width={300}/>
                                </div>
                            </div>
                            <div className='inside-image-content'>
                                <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                                    <p>{product.description}</p>
                                    <div className='price'><span>${product.price}</span></div>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '600' }}>{product.name}</span>
                                    </div>
                                    <div className='border-div'>
                                        <span>Rating:</span>
                                        <span> {product.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="load-more">
                <button className='handle-more' onClick={handleLoadMore}>Load More</button>
            </div>

        </div>
    );
}

export default Dashboard;





   


