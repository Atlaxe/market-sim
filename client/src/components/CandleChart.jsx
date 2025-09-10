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
            },
            width: containerRef.current.clientWidth,
            height: 600,
            rightPriceScale: { autoScale: true }
        });

        const series = chart.addCandlestickSeries();
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

            // Refit the chart to make new candle visible
            // chartRef.current.timeScale().fitContent();
        }
    }, [data]);

    return <div ref={containerRef} style={{ width: "100%", height: 600 }} />;
};
