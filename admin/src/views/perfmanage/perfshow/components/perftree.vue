<template>
    <a-tabs>
        <a-tab-pane key="1" title="当前应用">
            <div class="tree" v-if="typeof treeData !== 'undefined'">
                <a-input-search style=" max-width: 240px;margin-bottom: 8px" v-model="searchKey" />
                <a-popconfirm content="请再次确认修改">
                    <a-button type="primary" style=" right: 30px;float: right">提交修改</a-button>
                </a-popconfirm>

                <a-tree :data="treeData">
                    <template #title="nodeData">

                        <template v-if="(index = getMatchIndex(nodeData?.title)) && index < 0">{{ nodeData?.title }}
                            <icon-edit style="position: absolute; top: 10px; right: -50px; font-size: 12px;"
                                @click="handleEdit(nodeData)" />
                            <a-input v-if="nodeData.isEdit" v-model="nodeData.title" :placeholder="nodeData.title"
                                @blur="moveOff(nodeData), uNode(nodeData)" autofocus></a-input>
                            <icon-delete style="position: absolute; top: 10px; right: -70px; font-size: 12px;"
                                @click="deleteNode(nodeData), DNode(nodeData)" />
                            <icon-plus style="position: absolute; top: 10px; right: -90px; font-size: 12px;"
                                @click="addNewNode(nodeData), addNode(nodeData)" />
                            <a-checkbox v-model="nodeData.isAssign"
                                style="position: absolute; top: 0; right: -150px; font-size: 12px;">赋分</a-checkbox>
                        </template>

                        <span v-else>
                            {{ nodeData?.title?.substr(0, index) }}
                            <span style="color: var(--color-primary-light-4);">
                                {{ nodeData?.title?.substr(index, searchKey.length) }}
                            </span>{{ nodeData?.title?.substr(index + searchKey.length) }}


                        </span>

                    </template>
                </a-tree>



            </div>
        </a-tab-pane>
    </a-tabs>
</template>
<script>
import { ref, computed, onMounted, nextTick, onUpdated } from 'vue'
import { getPointerList, saveNewNode, deleteANode, updateNode } from '@/api/perfmanage'

const originTreeData = ref();


const loadMore = (nodeData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            nodeData.children = [
                { title: `leaf`, key: `${nodeData.key}-1`, isLeaf: true },
            ]
            resolve()
        }, 1000)
    })
}
// Define a helper function to find a node by key
function findNodeByKey(data, key) {
    for (let i = 0; i < data.length; i += 1) {
        const node = data[i]
        if (node.key === key) {
            return node
        }
        if (node.children) {
            const result = findNodeByKey(node.children, key)
            if (result) {
                return result
            }
        }
    }
    return null
}
// Define a recursive function to calculate the scores
function calculateScores(data) {
    // Iterate over the tree data
    for (let i = 0; i < data.length; i += 1) {
        const node = data[i]

        // Check if the node has children
        if (node.children) {
            // Recursively calculate scores for the children
            calculateScores(node.children)

            // Calculate the sum of scores for the children
            let sum = 0
            for (let j = 0; j < node.children.length; j += 1) {
                const child = node.children[j]
                if (child.score) {
                    sum += child.score
                }
            }

            // Update the score of the current node with the sum
            node.score = sum
        }

        // Check if the node is a third-level node
        if (node.key && node.key.includes('-')) {
            // Find the corresponding parent node
            const parentKey = node.key.substring(0, node.key.lastIndexOf('-'))
            const parent = findNodeByKey(data, parentKey)

            // Update the score of the parent node with the score of the current node
            if (parent && node.score) {
                parent.score = (parent.score || 0) + node.score
            }
        }
    }
}

function convertToOriginTreeData(data) {
    const nodeMap = new Map();
   
    Object.values(data).forEach(nodeData => {
        const { id, pointer_number, pointer_used, super_id, name, assign } = nodeData;
        let b = false
        if(assign){
            b = true
        }
        const node = {
            id,
            title: name,
            key: pointer_used,
            super_id,
            isEdit: false,
            isAssign: b,
            children: []
        };
        nodeMap.set(id, node);

        if (super_id !== 0) {
            const parentNode = nodeMap.get(super_id);
            parentNode.children.push(node);
        }
    });

    const OTD = Array.from(nodeMap.values()).filter(node => /^0-\d$/.test(node.key));

    return OTD;
}

calculateScores(originTreeData)
// Call the function to calculate the scores
/*    function onIconClick(nodeData) {
           const children = nodeData.children || []
           children.push({
               title: 'new tree node',
               key: nodeData.key + '-' + (children.length + 1),
           })
           nodeData.children = children

           treeData.value = [...treeData.value];
       }
*/


export default {
    setup() {

        async function getPointers() {
            const res = await getPointerList({

            })

            originTreeData.value = convertToOriginTreeData(res.data);
            console.log(originTreeData.value)
        }
        /* async function addNewNode() {
            const res = await saveNewNode({

            })
            
        } */
        async function addNewNode(nodeData) {
            const res = await saveNewNode({
                "pointer_used": `${nodeData.key}-${nodeData.children.length}`,
                "super_id": nodeData.id,
                "name": "new tree data",
                "divide": 0,
                "note": "无"
            })

        }
        async function uNode(nodeData) {
            let a = 0
            if (nodeData.isAssign) {
                a = 1
            }
            const res = await updateNode({
                "id": nodeData.id,
                "pointer_used": nodeData.key,
                "super_id": nodeData.super_id,
                "name": nodeData.title,
                "assign": a,
                "divide": 0,
                "note": "无"
            })
            console.log(a);
        }
        async function DNode(nodeData) {
            const res = await deleteANode({
                "id": nodeData.id
            })

            await getPointerList();
            console.log(originTreeData);
        }


        onMounted(() => {
            getPointers();
        });




        const searchKey = ref('')
        function searchData(keyword) {
            const loop = (data) => {
                const result = []
                data.forEach(item => {
                    if (item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                        result.push({ ...item })
                    } else if (item.children) {
                        const filterData = loop(item.children)
                        if (filterData.length) {
                            result.push({
                                ...item,
                                children: filterData
                            })
                        }
                    }
                })
                return result
            }

            return loop(originTreeData)

        }

        const treeData = computed(() => {
            if (!searchKey.value) return originTreeData.value
            return searchData(searchKey.value)
        })






        function handleEdit(nodeData) {
            nodeData.isEdit = !nodeData.isEdit;


        }
        function moveOff(nodeData) {
            nodeData.isEdit = false;
        }
        function deleteNode(nodeData) {

            const parentKey0 = nodeData.key.substr(0, 1);
            const parentKey1 = nodeData.key.substr(2, 1);
            const parentKey2 = nodeData.key.substr(4, 1);
            const parentKey3 = nodeData.key.substr(6, 1);
            const parentKey4 = nodeData.key.substr(8, 1);
            if (parentKey4 !== '') {
                const parentKey = nodeData.key.substr(0, 7)
                const parent = originTreeData.value.find(m => m.key === parentKey.substr(0, 3)).children.find(m => m.key === parentKey.substr(0, 5)).children.find(m => m.key === parentKey);
                const index = parent.children.findIndex(item => item.key === nodeData.key)
                parent.children.splice(index, 1);
            } else if (parentKey3 !== '') {
                const parentKey = nodeData.key.substr(0, 5)
                const parent = originTreeData.value.find(m => m.key === parentKey.substr(0, 3)).children.find(m => m.key === parentKey);
                const index = parent.children.findIndex(item => item.key === nodeData.key)
                parent.children.splice(index, 1);
            } else if (parentKey2 !== '') {
                const parentKey = nodeData.key.substr(0, 3)
                const parent = originTreeData.value.find(m => m.key === parentKey)
                const index = parent.children.findIndex(item => item.key === nodeData.key)
                parent.children.splice(index, 1);
            } else {
                const parentKey = nodeData.key.substr(0, 1)
                const index = originTreeData.value.findIndex(item => item.key === nodeData.key)
                originTreeData.value.splice(index, 1);

            }

        }

        function addNode(nodeData) {
            const children = nodeData.children || []
            children.push({
                title: 'new tree node',
                isEdit: 0,
                key: `${nodeData.key}-${children.length}`
            })
            nodeData.children = children
            console.log(`${nodeData.key}-${nodeData.children.length}`);

            originTreeData.value = [...originTreeData.value];
        }




        function getMatchIndex(title) {
            if (!searchKey.value) return -1
            return title.toLowerCase().indexOf(searchKey.value.toLowerCase())
        }

        /*    function onIconClick(nodeData) {
               const children = nodeData.children || []
               children.push({
                   title: 'new tree node',
                   key: nodeData.key + '-' + (children.length + 1),
               })
               nodeData.children = children
   
               treeData.value = [...treeData.value];
           }
           
    */



        return {
            searchKey,
            treeData,
            getMatchIndex,
            loadMore,
            handleEdit,
            moveOff,
            deleteNode,
            DNode,
            uNode,
            addNode,
            addNewNode,
            getPointers,
        }
    }
}


</script>

<style>
.tree {
    height: 870px;
    margin-left: 20px;
    overflow: auto;
}
</style>
  