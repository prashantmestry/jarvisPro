import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import styled from 'styled-components';

const ResponsiveGridLayout = WidthProvider(Responsive);

const SummaryWidget = () => {

    const [widgetList, setWidgetList] = useState([
        { position: { w: 12, h: 2, x: 0, y: 0, i: "11" }, data: 'One', uniqueId: "11" },
        { position: { w: 12, h: 2, x: 0, y: 6, i: "12" }, data: 'Two', uniqueId: "12" },
        { position: { w: 12, h: 2, x: 0, y: 12, i: "13" }, data: 'Three', uniqueId: "13" }
    ])

    let onLayoutChange = (layout, layouts) => {
        console.log('layout change ', layouts, layout);
    }

    let onResizeStop = () => {
        // console.log('onResizeStop');
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
                    <div key={`a`} className="myBox" data-grid={{ x: 0, y: 0, w: 12, h: 2 }}>
                        <div className="flex" style={{ height: '100%', width: '100%', border: '1px solid #dee8f1' }}>
                            <div style={{ width: '100%', background: '#dee8f1' }}>
                                <div className="flex">
                                    <div className="grid-item-echart__title flex-g-1">&nbsp;</div>
                                </div>
                                <div className="flex grid-item-echart__title" style={{ height: '100%', width: '100%' }} >
                                    <div>one</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div key={`b`} className="myBox" data-grid={{ x: 0, y: 0, w: 12, h: 2 }}>
                        <div className="flex" style={{ height: '100%', width: '100%', border: '1px solid #dee8f1' }}>
                            <div style={{ width: '100%', background: '#dee8f1' }}>
                                <div className="flex">
                                    <div className="grid-item-echart__title flex-g-1">&nbsp;</div>
                                </div>
                                <div className="flex grid-item-echart__title" style={{ height: '100%', width: '100%' }} >
                                    <div>two</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div key={`c`} className="myBox" data-grid={{ x: 0, y: 0, w: 12, h: 2 }}>
                        <div className="flex" style={{ height: '100%', width: '100%', border: '1px solid #dee8f1' }}>
                            <div style={{ width: '100%', background: '#dee8f1' }}>
                                <div className="flex">
                                    <div className="grid-item-echart__title flex-g-1">&nbsp;</div>
                                </div>
                                <div className="grid-item-echart__title" style={{ height: '100%', width: '100%' }} >
                                    <div>three</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </ResponsiveGridLayout>
            }


            {/* <ResponsiveGridLayout
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
                            <SingleWidgetDiv id={`a_${widget.uniqueId}`} key={`a_${widget.uniqueId}`}
                                data-grid={widget.position}
                                Xdata-grid={{ x: 0, y: 0, w: 12, h: 2 }}>
                                <div className="flex" style={{ height: '100%', width: '100%', border: '1px solid #dee8f1' }}>
                                    <div style={{ width: '100%', background: '#dee8f1' }}>
                                        <div className="flex align-center  justify-between">
                                            <div className="grid-item-echart__title flex-g-1">&nbsp;</div>
                                        </div>
                                        <div className="flex grid-item-echart__title" style={{ height: '100%', width: '100%' }} >
                                            <div>{widget.data}</div>
                                        </div>
                                    </div>
                                </div>
                            </SingleWidgetDiv>
                        )
                    })
                }
            </ResponsiveGridLayout> */}

        </Root>
    )
}

let Root = styled.div`
    width: 100%;
    position: relative;

    .myBox{
        display:flex;
        overflow:hidden,
        position :relative;
        border : 1px solid gray;
    }
    .flex{
        display:flex;
    }
`;

let SingleWidgetDiv = styled.div`
    overflow: hidden;    
    border: 1px solid #000;    
    border-radius:4px;
    position: relative;
    width:100%;
    padding:10px;
`;

export default SummaryWidget;