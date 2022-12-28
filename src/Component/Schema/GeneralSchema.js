import React, { useContext, useEffect, useState } from 'react';
import * as actions from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
//import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';
//import SortableTree, { removeNodeAtPath, changeNodeAtPath } from '@nosferatu500/react-sortable-tree';
import { Tooltip, Checkbox, Radio, Popconfirm } from 'antd';

// import SortableTree from "@nosferatu500/react-sortable-tree";
// import "@nosferatu500/react-sortable-tree/style.css"; // This only needs to be imported once in your app
// import FileExplorerTheme from '@nosferatu500/theme-file-explorer';

import { MyThemeContext } from '../../Context/MyThemeContext';


const GeneralSchema = () => {

    const { theme } = useContext(MyThemeContext);
    const history = useHistory();
    const dispatch = useDispatch();
    const [treeData, setTreeData] = useState([]);
    const generalSchema = useSelector(state => state.generalSchema);

    const [editInfo, setEditInfo] = useState({
        displayModel: false,
        editTitle: '',
        dpts: null,
        fmt: null,
        nodeInfo: null
    });

    const getNodeKey = ({ treeIndex }) => treeIndex;

    const operationList = [
        { key: 'add', label: 'Add' },
        { key: 'subtract', label: 'Subtract' },
        { key: 'exclude', label: 'Exclude' }
    ]

    // const onRadioChange = (node, path, treeData, e) => {
    //     node.operation = e.target.value;
    //     setTreeData(changeNodeAtPath({
    //         treeData: treeData,
    //         path,
    //         getNodeKey,
    //         newNode: node
    //     }));
    // }

    // const onShowTotalCheck = (node, path, treeData, e) => {
    //     node.showTotal = e.target.checked || false;
    //     /* if parent is second level */
    //     if (path?.length !== 1) {
    //         node.showOperation = e.target.checked;
    //     }
    //     /* if parent element's 'show total' checkbox is checked then show childrens 'include in sum' chechbox */
    //     if (node?.children?.length > 0) {
    //         node.children.forEach(val => {
    //             val.showOperation = e.target.checked ? true : false;
    //             val.showTotal = e.target.checked;
    //             if (e.target.checked) {
    //                 val.operation = val.operation || 'add';
    //             }
    //         })
    //     }

    //     setTreeData(changeNodeAtPath({
    //         treeData: treeData,
    //         path,
    //         getNodeKey,
    //         newNode: node
    //     }));
    // }

    // const [editFormulaNode, setEditFormulaNode] = useState(null);
    // const handleEditFormulaNode = (node, path, treeIndex, e) => {
    //     //setOpenFormulaBuilder(true);
    //     setEditFormulaNode({
    //         ...node,
    //         nodeInfo: {
    //             node: node,
    //             path: path
    //         }
    //     });
    // }

    // const handleEditNode = (node, path, treeIndex, e) => {
    //     setEditInfo({
    //         displayModel: true,
    //         editTitle: node?.title || '',
    //         dpts: node?.dpts,
    //         fmt: node?.fmt,
    //         nodeInfo: {
    //             node: node,
    //             path: path
    //         }
    //     })
    // }

    // const handleNodeDelete = (node, path, treeIndex, e) => {
    //     let childArray = (node?.children || []).map(val => {
    //         return {
    //             ...val, showOperation: false
    //         }
    //     })
    //     setTreeData([
    //         ...childArray,
    //         ...removeNodeAtPath({
    //             treeData: treeData,
    //             path: path,
    //             getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
    //                 return number;
    //             },
    //             ignoreCollapsed: true
    //         })]);
    // }

    // const getTooltipText = (node) => {
    //     if (node?.children?.length > 0) {
    //         return (
    //             <div>
    //                 Delete this parent? <br /> Underlying items will be moved to the top level.
    //             </div>
    //         )
    //     } else {
    //         return <div>Delete this parent item: <strong>{node?.title}</strong></div>
    //     }
    // }

    // const updateChildLevel = (item, level) => {
    //     for (let i = 0; i < item.length; i++) {
    //         item[i].level = level;
    //         if (item[i]?.children?.length > 0) {
    //             updateChildLevel(item[i].children, level + 1);
    //         }
    //     }
    //     return item;
    // }

    // const onMoveNodeHandler = (nodeInfo) => {
    //     //console.log('nodeInfo', nodeInfo);

    //     let { node, path, treeData, nextParentNode } = nodeInfo;
    //     node.showOperation = false;
    //     node.level = path?.length;

    //     /* if parent node is manually added and its 'show total' checkbox is checked then  show childrens 'include in sum checkbox' */
    //     if (nextParentNode?.addedBy === 'manually') {
    //         node.showOperation = true;
    //         node.operation = 'add';
    //     }

    //     /* if current node is manually added and it has childrens then show 'show total' checkbox */
    //     if (node?.addedBy === 'manually' && node?.children?.length > 0) {
    //         node.showTotalCheckbox = true;
    //     }

    //     if (node?.addedBy === 'manually' && node?.children?.length < 1) {
    //         node.showTotalCheckbox = false
    //     }

    //     /* change children's level if parent is moved */
    //     if (node?.children?.length > 0) {
    //         const childA = updateChildLevel(node?.children, path?.length + 1);
    //         node.children = childA;
    //     }

    //     setTreeData(changeNodeAtPath({
    //         treeData: treeData,
    //         path,
    //         getNodeKey,
    //         newNode: node
    //     }));

    //     /* If parent node is manually added then show show total checkbox  */
    //     const updateParentNode = (item) => {
    //         for (let i = 0; i < item.length; i++) {
    //             if (item[i]?.addedBy === 'manually') {
    //                 if (nextParentNode?.frml_id && item[i].frml_id === nextParentNode?.frml_id) {
    //                     item[i].showTotalCheckbox = true;
    //                     item[i].showTotal = true;
    //                 }
    //                 if (!item[i].children || item[i]?.children?.length < 1) {
    //                     item[i].showTotalCheckbox = false;
    //                 }
    //             }
    //             if (item[i]?.children?.length > 0) {
    //                 updateParentNode(item[i].children);
    //             }
    //         }
    //         return item;
    //     }

    //     setTimeout(() => {
    //         let tempTreeData = JSON.parse(JSON.stringify(treeData));
    //         const output = updateParentNode(tempTreeData, path?.length);
    //         setTreeData(output);
    //     }, 100);
    // }



    return (
        <div className='padding-16'>
            <div className='flex flex-direc-col margin-t-8'>
                <div>Schema name</div>
                <input
                    style={{ width: 250 }}
                    value={generalSchema?.schemaName}
                    onChange={e => {
                        dispatch(actions.updateSchemaDetail({
                            ...generalSchema,
                            schemaName: e.target.value
                        }));
                    }}
                    placeholder="Enter name"
                />
            </div>

            <div>
                {/* <SortableTree
                    theme={FileExplorerTheme}
                    treeData={this.state.treeData}
                    onChange={(treeData) => this.setState({ treeData })}
                /> */}
            </div>

            {/* <div>
                {
                    (treeData && treeData.length > 0) &&
                    <StyledSortableTree
                        isVirtualized={false}
                        //theme={FileExplorerTheme}
                        //style={theme}
                        treeData={treeData}
                        onChange={(treeData) => setTreeData(treeData)}
                        generateNodeProps={({ node, path, treeIndex }) => ({
                            title: (
                                <div style={{
                                    overflowX: 'hidden',
                                    width: `${!node?.level ? '450px' : 472 - ((node?.level + (node?.level - 1)) * 22) + 'px'}`,
                                }}>
                                    <span
                                    //style={{ color: ` ${node?.addedBy === 'manually' ? theme.color.primary.highlight : ''} ` }}
                                    >
                                        {
                                            node?.title?.trim()?.length > 35 ?
                                                <Tooltip placement="topLeft" title={node?.title?.trim()}>
                                                    {node?.title.trim()?.substring(0, 40) + '...'}
                                                </Tooltip>
                                                :
                                                node?.title?.trim()
                                        }
                                    </span>
                                </div>
                            ),
                            listIndex: treeIndex,
                            lowerSiblingCounts: [],
                            buttons: [
                                <div className='flex justify-end margin-l-16 padding-l-8'
                                    style={{
                                        width: '330px',
                                        //opacity: `${node?.hidden ? '.5' : '1'}`
                                    }}>
                                    {
                                        (node?.addedBy === 'manually' && node?.showTotalCheckbox) &&
                                        <div className='margin-r-8'>
                                            <Checkbox
                                                checked={node?.showTotal}
                                                onChange={e => onShowTotalCheck(node, path, treeData, e)}
                                            /><span className='margin-l-8'>Show total</span>
                                        </div>
                                    }
                                    {
                                        (node.showOperation) &&
                                        <>
                                            <Radio.Group value={node?.operation}
                                                size='small'
                                                disabled={node?.hidden}
                                                customStyles={{ fontWeight: 'normal' }}
                                                buttonStyle="solid" onChange={(e) => {
                                                    onRadioChange(node, path, treeData, e)
                                                }}>
                                                {
                                                    operationList.map((item, key) =>
                                                        <Radio.Button key={item.key} value={item.key}>
                                                            <span style={{ XtextTransform: 'uppercase', fontSize: '12px' }}>{item.label}</span>
                                                        </Radio.Button>
                                                    )
                                                }
                                            </Radio.Group>

                                        </>
                                    }
                                    {
                                        <div className='flex align-center justify-between borderLeft'>
                                            {
                                                (node?.source === 'formula_builder' || node?.addedBy === 'manually') &&
                                                <Tooltip placement="top" title={`Edit ${node?.source === 'formula_builder' ? 'Formula' : 'Parent'}`}>
                                                    <EditOutlined
                                                        style={{ color: '#68b1d8', marginRight: '6px', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            if (node?.source === 'formula_builder') {
                                                                handleEditFormulaNode(node, path, treeIndex, e);
                                                            }
                                                            if (node?.addedBy === 'manually') {
                                                                handleEditNode(node, path, treeIndex, e);
                                                            }
                                                        }}
                                                    />
                                                </Tooltip>
                                            }
                                            {
                                                //(node?.addedBy === 'manually') ?
                                                // <Tooltip placement="top" title='Remove node'>
                                                <Popconfirm
                                                    title={getTooltipText(node)}
                                                    onConfirm={(e) => handleNodeDelete(node, path, treeIndex, e)}
                                                    onCancel={null}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Tooltip placement="top" title='Delete'>
                                                        <DeleteOutlined
                                                            style={{ color: '#f06868' }}
                                                        //onClick={(e) => handleNodeDelete(node, path, treeIndex, e)}
                                                        />
                                                    </Tooltip>
                                                </Popconfirm>

                                            }
                                        </div>
                                    }
                                </div>
                            ]
                        })}
                        onMoveNode={node => onMoveNodeHandler(node)}
                        canNodeHaveChildren={(node) => {
                            return true;
                        }}
                        rowHeight='50px'
                    />
                }
            </div> */}
        </div>
    )
}

// const StyledSortableTree = (SortableTree)`    
//     margin-top: 5px;    
//     height: ${props => props.treeHeight}px!important;
//     .borderLeft{
//         border-left:1px solid ${props => props.style.color.primary.border};        
//         padding-left:5px;
//     }    
//     .rstcustom__rowWrapper{
//         padding : 2px 0px !important;
//     }
//     .rst__node{
//         height:35px !important;
//     }
//     .rstcustom__rowContents {                
//         border-radius: 7px;
//         background: ${props => props.style.color.primary.main};
//         border: 1px solid ${props => props.style.color.primary.border};
//         color: ${props => props.style.color.primary.text};
//         font-weight: 100;
//         box-shadow: none;
//         .rstcustom__rowTitle {
//             font-weight : normal;
//             font-size : 14px;
//             letter-spacing: .5px;
//         }
//     }
//     .rstcustom__toolbarButton{
//         font-size:12px;
//     }
//     .ant-btn-icon-only {
//         width: 24px;
//         height: 24px;
//         padding: 0;
//         font-size: 14px;
//         border-radius: 4px;
//         background-color: ${props => props.theme.currentTheme === 'dark' ? '#031721' : props.style.color.primary.light};
//         border: 1px;
//         color: red;
//     }
//     .ant-btn-icon-only:hover, .ant-btn-icon-only:focus {
//         color: #fff;
//         background-color: #ff7875;        
//         border-color: #ff7875;
//     }
// `

export default GeneralSchema;