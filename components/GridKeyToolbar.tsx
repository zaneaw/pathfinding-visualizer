import React from 'react';
import GridKeyOption from './GridKeyOption';
import { FiMapPin } from 'react-icons/fi';
import { GiFinishLine } from 'react-icons/gi';

const GridKeyToolbar = () => {
    return (
        <div className='flex flex-row items-center justify-around flex-wrap px-2 pb-2 gap-2'>
            <GridKeyOption keyName="Node" />
            <GridKeyOption keyName="Start" KeyIcon={FiMapPin} keyStyles="bg-green-500" />
            <GridKeyOption keyName="End" KeyIcon={GiFinishLine} keyStyles="bg-red-500" />
            <GridKeyOption keyName="Wall" keyStyles="bg-slate-500" />
            <GridKeyOption keyName="Visited" keyStyles="bg-purple-500" />
            <GridKeyOption keyName="Shortest Path" keyStyles="bg-yellow-500" />
        </div>
    );
};

export default GridKeyToolbar;
