// Visualization JavaScript for SVG Graphics

// ===== Data Visualization: Temperature Bar Chart =====
function createTemperatureVisualization() {
    const data = [
        { month: 'Jan', temp: 5, color: '#3b82f6' },
        { month: 'Feb', temp: 7, color: '#3b82f6' },
        { month: 'Mar', temp: 12, color: '#60a5fa' },
        { month: 'Apr', temp: 16, color: '#93c5fd' },
        { month: 'May', temp: 20, color: '#fbbf24' },
        { month: 'Jun', temp: 25, color: '#f59e0b' },
        { month: 'Jul', temp: 28, color: '#ef4444' },
        { month: 'Aug', temp: 27, color: '#f97316' },
        { month: 'Sep', temp: 22, color: '#fb923c' },
        { month: 'Oct', temp: 16, color: '#93c5fd' },
        { month: 'Nov', temp: 10, color: '#60a5fa' },
        { month: 'Dec', temp: 6, color: '#3b82f6' }
    ];

    const width = 900;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const maxTemp = Math.max(...data.map(d => d.temp));
    const barWidth = chartWidth / data.length - 10;

    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', 'auto');

    // Create gradient definitions
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Create gradient for each bar
    data.forEach((d, i) => {
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', `gradient-${i}`);
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', `stop-color:${d.color};stop-opacity:1`);
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', `stop-color:${d.color};stop-opacity:0.6`);
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
    });
    
    svg.appendChild(defs);

    // Add decorative border frame
    const borderFrame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    borderFrame.setAttribute('x', '5');
    borderFrame.setAttribute('y', '5');
    borderFrame.setAttribute('width', width - 10);
    borderFrame.setAttribute('height', height - 10);
    borderFrame.setAttribute('fill', 'none');
    borderFrame.setAttribute('stroke', '#667eea');
    borderFrame.setAttribute('stroke-width', '5');
    borderFrame.setAttribute('rx', '12');
    borderFrame.setAttribute('opacity', '0.5');
    svg.appendChild(borderFrame);

    // Add inner border
    const innerBorder = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    innerBorder.setAttribute('x', '15');
    innerBorder.setAttribute('y', '15');
    innerBorder.setAttribute('width', width - 30);
    innerBorder.setAttribute('height', height - 30);
    innerBorder.setAttribute('fill', 'none');
    innerBorder.setAttribute('stroke', '#764ba2');
    innerBorder.setAttribute('stroke-width', '2');
    innerBorder.setAttribute('stroke-dasharray', '8,4');
    innerBorder.setAttribute('rx', '8');
    innerBorder.setAttribute('opacity', '0.4');
    svg.appendChild(innerBorder);

    // Create main group for chart
    const chartGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    chartGroup.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);

    // Draw Y-axis
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', '0');
    yAxis.setAttribute('y1', '0');
    yAxis.setAttribute('x2', '0');
    yAxis.setAttribute('y2', chartHeight);
    yAxis.setAttribute('stroke', '#94a3b8');
    yAxis.setAttribute('stroke-width', '2');
    chartGroup.appendChild(yAxis);

    // Draw X-axis
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', '0');
    xAxis.setAttribute('y1', chartHeight);
    xAxis.setAttribute('x2', chartWidth);
    xAxis.setAttribute('y2', chartHeight);
    xAxis.setAttribute('stroke', '#94a3b8');
    xAxis.setAttribute('stroke-width', '2');
    chartGroup.appendChild(xAxis);

    // Draw grid lines
    for (let i = 0; i <= 5; i++) {
        const y = (chartHeight / 5) * i;
        const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        gridLine.setAttribute('x1', '0');
        gridLine.setAttribute('y1', y);
        gridLine.setAttribute('x2', chartWidth);
        gridLine.setAttribute('y2', y);
        gridLine.setAttribute('stroke', '#e2e8f0');
        gridLine.setAttribute('stroke-width', '1');
        gridLine.setAttribute('stroke-dasharray', '4,4');
        chartGroup.appendChild(gridLine);

        // Y-axis labels
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', '-10');
        label.setAttribute('y', y + 5);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('font-size', '12');
        label.setAttribute('fill', '#64748b');
        label.textContent = Math.round(maxTemp - (maxTemp / 5) * i) + '°C';
        chartGroup.appendChild(label);
    }

    // Draw bars with animation
    data.forEach((d, i) => {
        const x = (barWidth + 10) * i + 10;
        const barHeight = (d.temp / maxTemp) * chartHeight;
        const y = chartHeight - barHeight;

        // Create bar group for interactivity
        const barGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        barGroup.setAttribute('class', 'bar-group');

        // Bar rectangle with animation
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', chartHeight);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', '0');
        rect.setAttribute('fill', `url(#gradient-${i})`);
        rect.setAttribute('rx', '4');
        rect.setAttribute('class', 'temperature-bar');
        rect.style.cursor = 'pointer';
        rect.style.transition = 'all 0.3s ease';

        // Animate bar height
        setTimeout(() => {
            rect.setAttribute('y', y);
            rect.setAttribute('height', barHeight);
        }, i * 50);

        // Month label
        const monthLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        monthLabel.setAttribute('x', x + barWidth / 2);
        monthLabel.setAttribute('y', chartHeight + 25);
        monthLabel.setAttribute('text-anchor', 'middle');
        monthLabel.setAttribute('font-size', '14');
        monthLabel.setAttribute('font-weight', '600');
        monthLabel.setAttribute('fill', '#475569');
        monthLabel.textContent = d.month;

        // Tooltip group
        const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        tooltip.setAttribute('class', 'tooltip');
        tooltip.setAttribute('opacity', '0');
        tooltip.style.transition = 'opacity 0.3s ease';

        // Tooltip background
        const tooltipBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        tooltipBg.setAttribute('x', x + barWidth / 2 - 40);
        tooltipBg.setAttribute('y', y - 40);
        tooltipBg.setAttribute('width', '80');
        tooltipBg.setAttribute('height', '30');
        tooltipBg.setAttribute('fill', '#1e293b');
        tooltipBg.setAttribute('rx', '6');
        tooltipBg.setAttribute('opacity', '0.9');

        // Tooltip text
        const tooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tooltipText.setAttribute('x', x + barWidth / 2);
        tooltipText.setAttribute('y', y - 20);
        tooltipText.setAttribute('text-anchor', 'middle');
        tooltipText.setAttribute('font-size', '14');
        tooltipText.setAttribute('font-weight', 'bold');
        tooltipText.setAttribute('fill', 'white');
        tooltipText.textContent = `${d.temp}°C`;

        tooltip.appendChild(tooltipBg);
        tooltip.appendChild(tooltipText);

        // Mouse events
        rect.addEventListener('mouseenter', function() {
            this.setAttribute('opacity', '0.8');
            tooltip.setAttribute('opacity', '1');
        });

        rect.addEventListener('mouseleave', function() {
            this.setAttribute('opacity', '1');
            tooltip.setAttribute('opacity', '0');
        });

        barGroup.appendChild(rect);
        barGroup.appendChild(tooltip);
        chartGroup.appendChild(barGroup);
        chartGroup.appendChild(monthLabel);
    });

    // Chart title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', width / 2);
    title.setAttribute('y', 25);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-size', '18');
    title.setAttribute('font-weight', 'bold');
    title.setAttribute('fill', '#1e293b');
    title.textContent = 'Average Monthly Temperatures (°C)';
    svg.appendChild(title);

    svg.appendChild(chartGroup);

    return svg;
}


// ===== Initialize Visualizations =====
document.addEventListener('DOMContentLoaded', function() {
    // Temperature Visualization
    const tempVizContainer = document.getElementById('temperatureViz');
    if (tempVizContainer) {
        const tempChart = createTemperatureVisualization();
        tempVizContainer.appendChild(tempChart);
    }

});
