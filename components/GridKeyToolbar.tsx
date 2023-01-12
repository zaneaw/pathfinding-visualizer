import React from 'react';
import GridKeyOption from './GridKeyOption';
import { FiMapPin } from 'react-icons/fi';
import { GiFinishLine, GiStoneWall, GiWeight } from 'react-icons/gi';

const GridKeyToolbar = () => {
    return (
        <div className='flex flex-row items-center justify-around flex-wrap px-2 pb-2 gap-2'>
            <GridKeyOption keyName="Node" />
            <GridKeyOption keyName="Start" keyStyles="bg-green-500" KeyIcon={FiMapPin} />
            <GridKeyOption keyName="End" keyStyles="bg-red-500" KeyIcon={GiFinishLine} />
            <GridKeyOption keyName="Wall" keyStyles="bg-slate-500" KeyIcon={GiStoneWall} />
            <GridKeyOption keyName="Weighted" keyStyles="bg-blue-500" KeyIcon={GiWeight} />
            <GridKeyOption keyName="Visited" keyStyles="bg-purple-500" />
            <GridKeyOption keyName="Shortest Path" keyStyles="bg-yellow-500" />
        </div>
    );
};

export default GridKeyToolbar;
