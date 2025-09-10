// CandleChart.jsx
import React, { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";

export default function CandleChart({ data = [], backgroundColor = "#343434", textColor = "white" }) {
    const containerRef = useRef();
    const chartRef = useRef();
    const seriesRef = useRef();

    // initialize chart + series once
    useEffect(() => {
        const chart = createChart(containerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
                attributionLogo: false
            },
            grid: {
                vertLines: {
                    color: "rgba(197, 203, 206, 0.5)"  // vertical lines
                },
                horzLines: {
                    color: "rgba(197, 203, 206, 0.5)"  // horizontal lines
                }
            },
            rightPriceScale: {
                borderVisible: false, 
                autoScale: true,
            },
            leftPriceScale: {
                borderVisible: false,   
            },
            timeScale: {
                borderVisible: false, 
                timeVisible: true
            },
            width: containerRef.current.clientWidth,
            height: 600,
            
        });

        const series = chart.addCandlestickSeries({
            upColor: '#acf3ae',
            borderUpColor: '#acf3ae',
            wickUpColor: '#acf3ae',
            downColor: '#c43d5a',
            borderDownColor: '#c43d5a',
            wickDownColor: '#c43d5a'
            
        });
        series.setData(data);

        chartRef.current = chart;
        seriesRef.current = series;

        const handleResize = () =>
        chart.applyOptions({ width: containerRef.current.clientWidth });

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, []);

    // update chart when data changes
    useEffect(() => {
        if (seriesRef.current && data.length) {
            const latest = data[data.length - 1];
            console.log(`Latest info ${latest}`)
            seriesRef.current.update(latest);
        }
    }, [data]);

    return (
        <div style={{ backgroundColor, padding: 12, borderRadius: 12 }}>
            <div ref={containerRef} style={{ width: "100%", height: 600, border: 'none' }} />
        </div>
    );
};
