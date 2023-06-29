import React from 'react';
import './Transaction.css';

const Transaction = props => {
    

    return (
        <li>
            <div>💰 {props.name}</div>
            <div className="uid">{props.user_id}</div>
            <div className="date">{props.date}</div>
            
            <div>{props.type === 'deposit' ? (
                <span className="deposit"> + ₹{props.price} 📈</span>
            ) : (
                <span className="expense">
                    - ₹{props.price} 📉
                </span>
                
            )}</div>
            
        </li>
    );
}

export default Transaction;