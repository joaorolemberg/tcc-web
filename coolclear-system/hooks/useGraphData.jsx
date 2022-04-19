import { useContext } from 'react';
import GraphDataContext from '../context/GraphDataContext';

const useGraphData = () => useContext(GraphDataContext);

export default useGraphData;
