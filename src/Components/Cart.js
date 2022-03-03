import React, { useContext, useEffect } from 'react'
import { CartContext } from '../Global/CartContext'
import { Navbar } from './Navbar';
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/Config'

export const Cart = ({ user }) => {

    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/');
            }
        })
    })

    return (
        <>
            <Navbar user={user} />
            <div className='cart-container'>
            <h3>Giỏ hàng của bạn: </h3>
                {shoppingCart.length > 0 ? <>
                <div className="row">
                    <div className="col-9">
                    <div className="cart__heading">
                        <div className="row">
                            <div className="col-2">Ảnh sản phẩm</div>
                            <div className="col-2">Tên sản phẩm</div>
                            <div className="col-2">Giá sản phẩm</div>
                            <div className="col-2">Số lượng</div>
                            <div className="col-2">Tổng tiền</div>
                            <div className="col-2">Xóa</div>
                        </div>
                    </div>
                    {shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>
                            <div className='cart-img'>
                                <img src={cart.ProductImg} alt="not found" />
                            </div>

                            <div className='cart-name'>{cart.ProductName}</div>

                            <div className='cart-price-orignal'> {cart.ProductPrice}.000 VND</div>
                            <div className="cart__incDec">
                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_remove} size={14} />
                            </div>
                            <div className='quantity'>{cart.qty}</div>
                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_add} size={14} />
                            </div>
                            </div>
                            <div className='cart-price'>
                                {cart.TotalProductPrice}.000 VND
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    ))
                    }
                    {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                        Giỏ hàng đợi thanh toán
                        </div>
                        <div className='cart-summary-price'>
                            <span>Số lượng</span>
                            <span>{totalQty}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Tổng tiền</span>
                            <span>{totalPrice}.000 VND</span>
                        </div>
                       
                        <Link to='cashout' className='cashout-link'>
                            <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
                                Thanh toán
                        </button>
                        </Link>
                    </div>}

                    </div>
                </div>
                </> :
                    <div>Không có sản phẩm nào trong giỏ hàng của bạn 
                     <Link to="/">Trở lại trang chủ</Link>
                    </div>}
                </div>
        </>
    )
}