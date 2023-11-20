<template>
  <div class="tree">
    <a-input-search style="margin-bottom: 8px; max-width: 240px" v-model="searchKey" />

    <a-tree :data="treeData">
      <template #title="nodeData">
        <template v-if="(index = getMatchIndex(nodeData?.title)) && index < 0">{{ nodeData?.title }}<span class="score"
            style="margin-left: 8px;" v-if="nodeData?.score">`{{ nodeData?.score }}`</span></template>
        <span v-else>
          {{ nodeData?.title?.substr(0, index) }}
          <span style="color: var(--color-primary-light-4);">
            {{ nodeData?.title?.substr(index, searchKey.length) }}
          </span>{{ nodeData?.title?.substr(index + searchKey.length) }}
          <span class="score" style="margin-left: 8px;" v-if="nodeData?.score">`{{ nodeData?.score }}`</span>
        </span>
      </template>
    </a-tree>
  </div>
</template>
<script>
import { ref, computed } from 'vue'

const originTreeData = [
  {
    title: '教学工作量 (S1)',
    key: '0-0',
    children: [
      {
        title: '1.1课堂教学',
        key: '0-0-0',
        children: [
          {
            title: '理论课',
            key: '0-0-0-0',
            score: 10
          },
          {
            title: '实验课',
            key: '0-0-0-1',
            score: 20
          },
          {
            title: '体育课',
            key: '0-0-0-2',
          }
        ]
      },
      {
        title: '1.2实践环节',
        key: '0-0-1',
        children: [
          {
            title: '实习',
            key: '0-0-1-0',
          },
          {
            title: '课程设计',
            key: '0-0-1-1',
          },
          {
            title: '毕业设计（论文）',
            key: '0-0-1-2',
          },
          {
            title: '社会实践',
            key: '0-0-1-3',
            score: 5
          },
          {
            title: '学生竞赛',
            key: '0-0-1-4',
          },
        ]
      },
      {
        title: '1.3其它教学工作',
        key: '0-0-2',
        children: [
          {
            title: '学术报告或讲座',
            key: '0-0-2-0',
            score: 20
          },
          {
            title: '指导学生社团',
            key: '0-0-2-1',
          },

        ]
      }
    ],
  },
  {
    title: '教学效果 (S2)',
    key: '0-1',
    children: [
      {
        title: '2.1课堂教学质量 (S21)',
        key: '0-1-0',
        children: [
          {
            title: '学评教',
            key: '0-1-0-0',
          },
          {
            title: '专家评教',
            key: '0-1-0-1',
          },
          {
            title: '学院评教',
            key: '0-1-0-2',
          }
        ]
      },
      {
        title: '2.2指导学生获奖情况 (S22)',
        key: '0-1-1',
        children: [
          {
            title: '本科生学科竞赛',
            key: '0-1-1-1',
          },
          {
            title: '大学生运动会、锦标赛或单项协会比赛',
            key: '0-1-1-2',
          },
          {
            title: '其它省级以上比赛',
            key: '0-1-1-3',
          }
        ]
      },
      {
        title: '2.3教学奖惩 (S23)',
        key: '0-1-2',
        children: [
          {
            title: '教学成果奖',
            key: '0-1-2-0',
            score: 5
          },
          {
            title: '教学名师奖',
            key: '0-1-2-1',
            score: 6
          },
          {
            title: '其它教学奖励',
            key: '0-1-2-2',
            score: 4
          },
          {
            title: '教学技能奖',
            key: '0-1-2-3',
          },
          {
            title: '教学异常',
            key: '0-1-2-4',
          },
          {
            title: '教学事故',
            key: '0-1-2-5',
          },
        ]
      }


    ]
  },
  {
    key: '0-2',
    title: '教学建设与研究 (S3)',
    children: [
      {
        key: '0-2-0',
        title: '3.1教学研究与改革项目 (S31)',
        children: [
          {
            key: "0-2-0-0",
            title: '教改项目（立项当年）'
          },
          {
            key: "0-2-0-1",
            title: '团队类项目（建设期内）'
          },
          {
            key: "0-2-0-2",
            title: '教学团队（立项当年）'
          },
        ]
      },
      {
        key: '0-2-1',
        title: '3.2教学建设 (S32)',
        children: [
          {
            key: "0-2-1-0",
            title: '专业建设（建设期内）'
          },
          {
            key: "0-2-1-1",
            title: '课程建设（建设期内）'
          },
          {
            key: "0-2-1-2",
            title: '教材建设（立项当年）（注3）'
          },
        ]
      },
      {
        key: '0-2-2',
        title: '3.3教学研究论文或论著 (S33)',
        children: [
          {
            key: "0-2-2-0",
            title: '公开发表论文（注4）'
          },
        ]
      },
    ]
  }

]
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
function findNodeByKey (data, key) {
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
function calculateScores (data) {
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


calculateScores(originTreeData)
// Call the function to calculate the scores

export default {
  setup () {

    const searchKey = ref('')
    function searchData (keyword) {
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
      if (!searchKey.value) return originTreeData
      return searchData(searchKey.value)
    })



    function getMatchIndex (title) {
      if (!searchKey.value) return -1
      return title.toLowerCase().indexOf(searchKey.value.toLowerCase())
    }

    return {
      searchKey,
      treeData,
      getMatchIndex,
      loadMore
    }
  }
}

</script>
<style>
.tree {
  margin-left: 20px;
  height: 600px;
}
</style>

<style>
.score {
  display: inline-block;
  width: 30px;
  height: 20px;
  border-radius: 20%;
  background-color: greenyellow;
}
</style>