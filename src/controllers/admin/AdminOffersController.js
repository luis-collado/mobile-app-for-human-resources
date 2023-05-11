// src/controllers/admin/AdminOffersScreenController.js

import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Alert } from 'react-native';

const useAdminOffersController = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [refreshOffers, setRefreshOffers] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused || refreshOffers) {
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
    }
  }, [isFocused, refreshOffers]);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (selectedOffer) {
        try {
          const response = await fetch(
            `https://readapplicantsbyoffer-2b2k6woktq-nw.a.run.app/readApplicantsByOffer?ofertaId=${selectedOffer.Codigo}`,
          );

          if (response.status === 404) {
            const message = await response.text();
            setApplicants(message);
          } else {
            const data = await response.json();
            setApplicants(data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchApplicants();
  }, [selectedOffer]);

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
  };

  const handleGoBack = () => {
    setSelectedOffer(null);
  };

  const handleDeleteOffer = async () => {
    try {
      const response = await fetch(`https://deleteoffer-2b2k6woktq-nw.a.run.app/deleteOffer`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: 'teresaiglesiastim@gmail.com', // Reemplaza esto con el email que corresponda
          offerId: selectedOffer.Codigo,
        }),
      });

      if (response.ok) {
        setRefreshOffers(!refreshOffers);
        setSelectedOffer(null);
        Alert.alert('Éxito', 'La oferta se ha eliminado correctamente.');
      } else {
        const errorText = await response.text();
        console.error(`Error al eliminar la oferta: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function parseJsonOrReturnText(input) {
    if (typeof input === 'string' && (input.trim().startsWith('{') || input.trim().startsWith('['))) {
      try {
        const parsedJson = JSON.parse(input);
        return parsedJson;
      } catch (error) {
        return input;
      }
    } else {
      return input;
    }
  }

  return {
    offers,
    selectedOffer,
    applicants,
    handleSelectOffer,
    handleGoBack,
    handleDeleteOffer,
    parseJsonOrReturnText,
  };
};

export default useAdminOffersController;
