import React, { useState } from 'react';

const ActivityCard = ({data}) => {
  
 


    return (
        <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {data.name} <br />
        <span style={{ fontSize: '1rem' }}>
          is happening on {data.date}
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
          {data.location}
        </blockquote>
      </div>

      
    </div>
  );

   

}


export default ActivityCard;