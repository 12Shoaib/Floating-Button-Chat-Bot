import home from './home.module.css'
import Navbar from '../Navbar.js/Navbar'
import {BsFillChatDotsFill} from 'react-icons/bs'
import {IoMdClose} from 'react-icons/io'
import { useState , useEffect } from 'react'

const Home = () => {
    const [show , setShow] = useState(false)
    const [pageNo , setPageNo] = useState(0)
    const [captureInput , setCaptureInput] = useState()
    const [phone , setPhone] = useState('')
    const [pickup , setPickup] = useState('')
    const [delilvery , setDelivery] = useState('')
    const [orderId , setOrderId] = useState('')
    const [userDetails , setUserDetails] = useState([])
    const [orderStatus , setOrderStatus] = useState('')

    useEffect(() => {
        if(localStorage?.details){
            setUserDetails([JSON.parse(localStorage.getItem('details'))])
        }
    },[])  

    const handleTrack = () => {
        const details=  userDetails.filter((element) => element.orderedId == captureInput)
    if(details.length>0){
        setOrderStatus("Your Order is in progress and will be delivered soon")
    }else{
        setOrderStatus("No orders found with this orderId")
    }
    }
    const showDialog = () => {
        setShow((prev) => !prev)
    }
    const handleNextPage =() => {
        if(pageNo===3) {
            setPageNo(3)
        }else if(pageNo == 2 && pickup===''){
            alert('enter the pickup location')
        }else{
        setPageNo(pageNo+1)
        }
    }
    const generateOrderId = () => {
        if(pageNo===3) {
            setPageNo(3)
        }else if(phone == ''){
            alert('please enter mobile number')
        }else{
        setPageNo(pageNo+1)
        const order_Number = Math.random()*90000000
        setOrderId(Math.floor(order_Number))
        }

    }
    const  redirectHome = () => {
        setPageNo(0)
        setOrderStatus('')
    }
    const handlePreviousPage = () => {
        setPageNo(pageNo-1)
    }
    const handleSubmitButton = () => {
        if(pageNo==3 && delilvery===''){
            setOrderStatus('provide the delivery location')
        }else{
            setOrderStatus(`Your Order with OrderId:${orderId} is successfull`)
        const myTimeOut = setTimeout(redirectHome, 3000)
        const obj = {
            phoneNummber : phone,
            pickupLocation : pickup,
            delilveryLocation : delilvery,
            orderedId : orderId
        }
        localStorage.setItem("details" , JSON.stringify(obj))
        }
    }
    return (
        <div className={home.main_Component}>
            <Navbar/>
           {show && <div className={home.dialog_Box}>
            <div className={home.header}>
                <span className={home.heading}>Track Order</span>
            </div>
         {pageNo===0 && <div className={home.middle_Section}>
                <input onChange={(e) => setCaptureInput(e.target.value)} className={home.input_Field} type='text' placeholder='Check Order Status' />
                <button onClick={handleNextPage} className={home.order_Button}>Place order</button>
                <button onClick={handleTrack} className={home.order_Button}>Track order</button>
                <p className={home.paragraph}>{orderStatus}</p>
                <p className={home.paragraph}>Hello sir/madam please tell us about your query</p>
            </div>}
           {pageNo ===1 && <div className={home.place_Order}>
            <input onChange={(e) => setPhone(e.target.value)} className={home.input_Field} type='text' placeholder='Mobile number' />
            <button onClick={handlePreviousPage} className={home.order_Button}>Back</button>
            <button onClick={generateOrderId} className={home.order_Button}>Next</button>
            </div>}     
          {pageNo===2 &&  <div className={home.place_Order}>
          <input onChange={(e) =>setPickup(e.target.value)} className={home.input_Field} type='text' placeholder='Pickup location' />
            <button onClick={handlePreviousPage} className={home.order_Button}>Back</button>
            <button onClick={handleNextPage} className={home.order_Button}>Next</button>
            {orderId && <><p className={home.order_Id}>Your OrderId: {orderId}</p>
            <span className={home.note}>Note : please save your order Id</span></>}
            </div>    }
            {pageNo===3 &&  <div className={home.place_Order}>
          <input onChange={(e) => setDelivery(e.target.value)} className={home.input_Field} type='text' placeholder='Delivery location' />
            <button onClick={handlePreviousPage} className={home.order_Button}>Back</button>
            <button onClick={handleSubmitButton} className={home.order_Button}>Submit</button>
            <p className={home.paragraph}>{orderStatus}</p>
            </div>}


            </div>}
            <div className={home.fixed__Button}>
            <button onClick={showDialog} className={home.button_Wrapper}>
               {show ? 
                <IoMdClose  className={home.message_Logo2} />
               :
               <BsFillChatDotsFill className={home.message_Logo} />}
            </button>
            </div>

        </div>
    )
    
}

export default Home