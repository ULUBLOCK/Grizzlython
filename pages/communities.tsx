import React, { useState, useEffect } from 'react'

import { DisplayEvents } from '../components';
import { useStateContext } from '../context/context'

const communities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  //const { address, contract, getCampaigns } = useStateContext();

  const address="xxxxxxxxx"
  const contract="xxxxxxxxx"
  

  const fetchCampaigns = async () => {
    setIsLoading(true);
   // const data = await getCampaigns();
   // setCampaigns(data);
    setIsLoading(false);
  }

  /*useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);
*/
  return (
    <div className=''>
    <h1 className='text-3xl text-center'>All Community Events</h1>
    <DisplayEvents 
      title="All Community events"
      isLoading={isLoading}
      campaigns={campaigns}
    />
    </div>
  )
}

export default communities