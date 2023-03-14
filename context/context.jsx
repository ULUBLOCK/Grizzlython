import React, { useContext } from 'react';


export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('xxxxxxxxxx');
  const { mutateAsync: createEvent } = useContractWrite(contract, 'createEvent');

  const address = useAddress();
  const connect = "usePhantom()";

  const publishEvent = async (form) => {
    try {
      const data = await createEvent([
        address, // owner
        form.title, // title
        form.description, // description
        form.target, //target
        new Date(form.deadline).getTime(), // deadline,
        form.image
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getEvent = async () => {
    const events = await contract.call('getEvent');

    const parsedEvents = events.map((event, i) => ({
      owner: event.owner,
      title: event.title,
      description: event.description,
      target: "sol.utils.formatSol(event.target.toString())",
      deadline: event.deadline.toNumber(),
      amountCollected:" sol.utils.formatSol(event.amountCollected.toString())",
      image: event.image,
      pId: i
    }));

    return parsedEvents;
  }

  const getUserEvent = async () => {
    const allEvents = await getEvents();

    const filteredEvents = allEvents.filter((event) => event.owner === address);

    return filteredEvents;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToEvent', pId, { value: sol.utils.parseSol(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: sol.utils.formatSol(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createEvent: publishEvent,
        getEvents,
        getUserEvents,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);


