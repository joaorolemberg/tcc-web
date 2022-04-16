import { useContext } from 'react';
import ConsultContext from '../context/ConsultContext';

const useConsult = () => useContext(ConsultContext);

export default useConsult;
