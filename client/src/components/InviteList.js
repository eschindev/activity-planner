import React from 'react';
import { Link } from 'react-router-dom';
import InviteCard from './InviteCard';
import Container from '@mui/material/Container';

const InviteList = ({invites}) => {
    return (
        <Container maxWidth="sm">
            {invites ? (
                invites.map((invite) => {
                    return <InviteCard key={invite._id} data={invite}/>;
                })
            ) : (
                <div>There is currently no invites</div>
            )}
        </Container>
    );
            
};


export default InviteList;
