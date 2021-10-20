import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import styled from 'styled-components';

const ResponsiveGridLayout = WidthProvider(Responsive);

const SummaryWidget = () => {

    const [widgetList, setWidgetList] = useState([
        { position: { w: 12, h: 6, x: 0, y: 0, i: 11 }, data: 'One', uniqueId: "11" },
        { position: { w: 12, h: 6, x: 0, y: 6, i: 12 }, data: 'Two', uniqueId: "12" },
        { position: { w: 12, h: 6, x: 0, y: 12, i: 13 }, data: 'Three', uniqueId: "13" }
    ])

    let onLayoutChange = (layout, layouts) => {
        console.log('layout change ', layouts, layout);
    }

    let onResizeStop = () => {
        console.log('onResizeStop');
    }

    return (
        <Root style={{ width: '100%', position: 'relative' }}>

            <h3>summary widget</h3>

            <ResponsiveGridLayout
                className="layout"
                cols={{ lg: 12 }}
                breakpoints={{ lg: 1200 }}
                rowHeight={60}
                isResizable
                isDraggable
                onLayoutChange={onLayoutChange}
                draggableHandle=".grid-item-echart__title"
                onResizeStop={onResizeStop}
            >
                {
                    (widgetList && widgetList.length > 0) &&
                    widgetList.map((widget, index) => {
                        return (
                            // <div key={widget.uniqueId} data-grid={widget.position}>  {widget.data} </div>
                            <SingleWidgetDiv key={`a_${index}`} data-grid={{ x: 0, y: 0, w: 12, h: 2, static: true }}>
                                <div className="flex grid-item-echart__title" style={{ height: '100%', width: '100%' }} >
                                    <div>{widget.data}</div>
                                </div>
                            </SingleWidgetDiv>
                        )
                    })
                }
            </ResponsiveGridLayout>

        </Root>
    )
}

let Root = styled.div`
    width: 100%;
    position: relative;
`;

let SingleWidgetDiv = styled.div`
    overflow: hidden;    
    border: 1px solid #fff;
    Xbackground-color : #000;  
    border-radius:4px;
    position: relative;
`;

export default SummaryWidget;