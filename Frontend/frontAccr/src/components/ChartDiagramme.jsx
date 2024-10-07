import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants nécessaires auprès de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDiagramme = ({ labels, datasets}) => {
    const data = {
        labels: labels ? labels : [' '],
        datasets: [
            {
                label: '#',
                data: datasets ? datasets : [' '],
                backgroundColor: [
                    'rgb(255,99,99)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(56,244,150,1)',
                    'rgba(238,56,244,0.89)',
                    'rgba(56,87,244,0.87)',
                    'rgba(125,255,17,0.87)',
                ],
                borderColor: [
                    'rgb(255,255,255)',
                    'rgb(255,255,255)',
                    'rgb(255,255,255)',
                    'rgb(255,255,255)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Doughnut data={data} />
        </div>
    );
};

export default ChartDiagramme;
