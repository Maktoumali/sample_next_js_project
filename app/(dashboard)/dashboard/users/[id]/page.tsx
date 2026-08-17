import React from 'react'
const UserProfile = async ({params}: {params: Promise <{id: string}>}) => {
    const {id} = await params;
  return (
    <div>This is    UserProfile - {id}</div>
  )
}

export default UserProfile;