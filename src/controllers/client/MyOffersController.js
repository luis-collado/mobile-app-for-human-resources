// MyOffersController.js
import { useState, useEffect } from 'react';

import {Alert } from 'react-native';

const MyOffersController = (email, isFocused) => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [refreshOffers, setRefreshOffers] = useState(false);

  useEffect(() => {
    if (isFocused || refreshOffers) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://readmyoffers-2b2k6woktq-nw.a.run.app/readOffers/${email}`,
          );
          const data = await response.json();
          setOffers(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [isFocused, refreshOffers]);

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
  };

  const handleGoBack = () => {
    setSelectedOffer(null);
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await fetch(
        `https://unsubscribeoffers-2b2k6woktq-nw.a.run.app/unsubscribeOffers`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            ofertaId: selectedOffer.Codigo,
          }),
        },
      );

      if (response.ok) {
        setSelectedOffer(null);
        setRefreshOffers(!refreshOffers);
        Alert.alert('Oferta desaplicada con éxito');
      } else {
        throw new Error('Error al desaplicar la oferta');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error al desaplicar la oferta');
    }
  };

  return {
    offers,
    selectedOffer,
    handleSelectOffer,
    handleGoBack,
    handleUnsubscribe,
  };
};

export default MyOffersController;
