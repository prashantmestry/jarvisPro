import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import styled from 'styled-components';

const ResponsiveGridLayout = WidthProvider(Responsive);

const SummaryWidget = () => {

    let onLayoutChange = (layout, layouts) => {
        console.log('layout change ', layouts, layout);
    }

    return (
        <Root style={{ width: '100%', position: 'relative' }}>
            {
                <ResponsiveGridLayout
                    className="layout"
                    cols={{ lg: 12 }}
                    breakpoints={{ lg: 1200 }}
                    rowHeight={50}
                    isResizable
                    isDraggable
                    onLayoutChange={onLayoutChange}
                    draggableHandle=".grid-item-echart__title"
                >
                    <div key={`a`} className="myBox" data-grid={{ x: 0, y: 0, w: 5, h: 2 }}>
                        <div className="flex">
                            <div style={{ width: '100%' }}>
                                {/* <div className="flex">
                                    <div className="grid-item-echart__title flex-g-1">&nbsp;</div>
                                </div> */}
                                <div className="flex grid-item-echart__title" style={{ height: '100%', width: '100%' }} >
                                    <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div key={`b`} className="myBox" data-grid={{ x: 5, y: 0, w: 7, h: 2 }}>
                        <div className="flex">
                            <div style={{ width: '100%' }}>
                                <div className="flex grid-item-echart__title" style={{ height: '100%', width: '100%' }} >
                                    <div>two</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div key={`c`} className="myBox" data-grid={{ x: 0, y: 2, w: 12, h: 2 }}>
                        <div className="flex">
                            <div style={{ width: '100%' }}>
                                <div className="grid-item-echart__title" style={{ height: '100%', width: '100%' }} >
                                    <div>three</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </ResponsiveGridLayout>
            }

        </Root>
    )
}

let Root = styled.div`
    width: 100%;
    position: relative;

    .myBox{
        display:flex;
        padding:5px;
        overflow:hidden,
        position :relative;
        border : 1px solid gray;        
    }
    .flex{
        display:flex;
    }
`;


export default SummaryWidget;