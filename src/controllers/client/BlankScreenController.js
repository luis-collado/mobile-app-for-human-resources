import { useState, useEffect } from 'react';

const BlankScreenController = (email) => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://readoffers-2b2k6woktq-nw.a.run.app/readOffers',
        );
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
  };

  const handleApplyOffer = async (offerId) => {
    try {
      const requestBody = {
        email: email,
        ofertaId: offerId,
      };
  
      const response = await fetch('https://applyoffers-5eplrc7dka-nw.a.run.app/applyOffers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        return true;
      } else {
        const errorText = await response.text();
        throw new Error(` ${errorText}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
   
  };

  const handleGoBack = () => {
    setSelectedOffer(null);
  };

  

  return { offers, selectedOffer, handleSelectOffer, handleApplyOffer, handleGoBack };
};

export default BlankScreenController;
