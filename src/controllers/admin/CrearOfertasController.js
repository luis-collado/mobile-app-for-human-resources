// CrearOfertasController.js

import React,{ useState, useRef} from 'react';
import { Alert, Keyboard } from 'react-native';

const CrearOfertasController = (navigation) => {
  const [offerData, setOfferData] = useState({
    Codigo: '',
    Fecha: '',
    Oferta: '',
    Empresa: '',
    Estado: '',
    Cubierta: '',
    Tipo_contrato: '',
    Duracion: '',
    Observaciones_duracion: '',
    Puestos: '',
    Expdte_asociados: '',
    Expdte_asociados_por_sondeo: '',
    Expdte_asociados_online: '',
    Enviados_entrevista: '',
    Contratados: '',
    CNAE: '',
    Idiomas: '',
    Vehiculo: '',
    Formacion: '',
    Tamaño_empresa: '',
    Persona_contacto: '',
    Telefono_contacto: '',
    Email_contacto: '',
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const fieldRefs = useRef(
    Object.keys(offerData).reduce((acc, key) => {
      acc[key] = React.createRef();
      return acc;
    }, {})
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    handleChange('Fecha', date.toISOString().split('T')[0]);
    hideDatePicker();
  };

  const handleChange = (field, value) => {
    setOfferData({ ...offerData, [field]: value });
  };

  const handleSubmit = async () => {
    const email = 'teresaiglesiastim@gmail.com';
    try {
      const response = await fetch(
        'https://createoffer-2b2k6woktq-nw.a.run.app/createOffer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, offerData }),
        }
      );
      const responseJson = await response.json();
  
      if (responseJson.message === "Oferta creada correctamente") {
        Alert.alert(
          'Oferta creada',
          'La oferta se ha creado correctamente',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('OfertasAdmin'),
            },
          ]
        );
      } else {
        Alert.alert(
          'Error al crear la oferta',
          responseJson.message || 'La oferta no se ha creado correctamente',
          [
            {
              text: 'OK',
            },
          ]
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error en la solicitud',
        'Ha ocurrido un error al realizar la solicitud. Por favor, inténtalo de nuevo.',
        [
          {
            text: 'OK',
          },
        ]
      );
    }
  };

  const onSubmitEditing = (nextField) => {
    if (nextField && fieldRefs.current[nextField]) {
      fieldRefs.current[nextField].focus();
    } else {
      Keyboard.dismiss();
    }
  };

  const getKeyboardType = (key) => {
    return [
      'Puestos',
      'Enviados_entrevista',
      'Contratados',
      'Telefono_contacto',
      'Expdte_asociados',
      'Expdte_asociados_por_sondeo',
      'Expdte_asociados_online',
      'Enviados_entrevista',
      'Contratados',
    ].includes(key)
      ? 'numeric'
      : 'default';
  };

  const getReturnKeyType = (index, arr) => {
    return index === arr.length - 1
      ? 'done'
      : 'next';
  };

  return {
    offerData,
    isDatePickerVisible,
    fieldRefs,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    handleChange,
    handleSubmit,
    onSubmitEditing,
    getKeyboardType,
    getReturnKeyType
  };
};

export default CrearOfertasController;