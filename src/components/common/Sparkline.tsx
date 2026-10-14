import React from 'react';

interface SparklineProps {
  data: number[];
  color?: 'emerald' | 'indigo' | 'amber' | 'rose' | 'sky' | 'zinc';
  width?: number;
  height?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = 'indigo',
  width = 96,
  height = 28
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  const strokeColorMap = {
    emerald: '#10b981',
    indigo: '#6366f1',
    amber: '#f59e0b',
    rose: '#f43f5e',
    sky: '#0284c7',
    zinc: '#71717a'
  };

  const stroke = strokeColorMap[color] || strokeColorMap.zinc;

  // Solid functional trend line (Anti-Slop: zero transparent gradient fills)
  return (
    <svg 
      width={width} 
      height={height} 
      className="overflow-visible shrink-0" 
      aria-hidden="true"
    >
      <path 
        d={pathD} 
        fill="none" 
        stroke={stroke} 
        strokeWidth="1.75" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};
