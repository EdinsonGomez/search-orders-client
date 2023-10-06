import { axios } from './api';

export const getDocumentTypes = () => {
  return axios.get('/clients/document/types')
    .then((res) => res.data)
}
