import React, { useState } from 'react';


const InviteCard = ({data}) => {
  
 


    return (
        <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {data.sender.fullName} <br />
        <span style={{ fontSize: '1rem' }}>
          status: {data.status}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >

        </blockquote>
      </div>

      
    </div>
  );

   

}


export default InviteCard;