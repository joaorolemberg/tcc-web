import { useContext } from 'react';
import ReRenderContext from '../context/ReRenderContext';

const useReRender = () => useContext(ReRenderContext);

export default useReRender;
