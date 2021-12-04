import React from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import { DragTable1, DragTable2 } from './Comp/DragTable1';
import styled from 'styled-components';

const ViewDraggable = (props) => {

    let eventControl = (event, info) => {
        console.log('Event name: ', event.type);
        console.log(event, info);
    };

    return (

        <div style={{ position: 'relative', padding: '10px', height: '100vh', width: '100%', border: '1px solid #000' }}>

            <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                scale={1}
                bounds='parent'
                onStart={eventControl}
                onDrag={eventControl}
                onStop={eventControl}
            >
                <div style={{ margin: '2px', width: 'fit-Content', padding: '10px' }}>
                    <div className="handle" style={{ cursor: 'move', height: '3px' }}>&nbsp;</div>
                    <AttributeDiv>
                        <div>
                            <div>CMP</div>
                            <div>3144.3</div>
                        </div>
                        <div>
                            <div>Market Cap</div>
                            <div>3144.3</div>
                        </div>
                        <div>
                            <div>Sector</div>
                            <div>Chemicals</div>
                        </div>
                        <div>
                            <div>Code</div>
                            <div>3144.3</div>
                        </div>
                        <div>
                            <div>Market Cap</div>
                            <div>3144.3</div>
                        </div>
                        <div>
                            <div>BSE</div>
                            <div><a href='#'>ASIAN PAINTS</a></div>
                        </div>
                        <div>
                            <div>NSE</div>
                            <div><a href='#'>ASIANPAINTS</a></div>
                        </div>
                        <div>
                            <div>CMP</div>
                            <div>3144.3</div>
                        </div>
                    </AttributeDiv>
                </div>
            </Draggable>

            <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                scale={1}
                bounds='parent'
                onStop={eventControl}
            >
                <div style={{background : '#eff2f5', margin: '2px', width: 'fit-Content', padding: '10px' }}>
                    <div className="handle" style={{ fontWeight: 'bold', cursor: 'move' }}>Key Indicators</div>
                    <DragTable1 />
                </div>
            </Draggable>

            <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={{ x: 290, y: -303 }}
                position={null}
                scale={1}
                bounds='parent'
                onStart={eventControl}
                onDrag={eventControl}
                onStop={eventControl}
            >
                <div style={{background : '#eff2f5', margin: '2px', width: 'fit-Content', padding: '10px' }}>
                    <div className="handle" style={{ fontWeight: 'bold', cursor: 'move' }}>Growth Matrics</div>
                    <DragTable2 />
                </div>
            </Draggable>

            <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={{ x: 290, y: -303 }}
                position={null}
                scale={1}
                bounds='parent'
                onStart={eventControl}
                onDrag={eventControl}
                onStop={eventControl}
            >
                <div style={{ background : '#eff2f5', margin: '2px', Xborder: '1px solid #000', width: 'fit-Content', padding: '10px' }}>
                    <div className="handle" style={{ fontWeight: 'bold', cursor: 'move' }}>Peer Comparison</div>
                    <DragTable2 />
                </div>
            </Draggable>
        </div>

    )
}

let AttributeDiv = styled.div`
    color : red;
    display:flex;
    justify-content:flex-start;
    flex-wrap:wrap;
    
    div{
        margin-right:32px;
        &:first-child{
            color : #000;            
            font-size:14px;             
            font-weight:500;
        }
        &:last-child{                
            font-size:15px;
            color: #000;
            font-weight:600;
            a{                    
                color: #000;
                border-bottom : 1px solid;
                &:hover{
                    color : orange
                }
            }
        }
    }
`;

export default ViewDraggable;