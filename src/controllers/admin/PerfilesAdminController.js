// src/controllers/admin/PerfilesAdminController.js

import { useState, useEffect } from 'react';

const usePerfilesAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://readapplicants-2b2k6woktq-nw.a.run.app/readApplicants'
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleGoBack = () => {
    setSelectedUser(null);
  };

  const handleOpenCv = (CV) => {
    Linking.openURL(CV);
  };

  return {
    users,
    selectedUser,
    handleSelectUser,
    handleGoBack,
    handleOpenCv,
  };
};

export default usePerfilesAdmin;
