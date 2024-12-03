<template>
  <div style="position:relative">
      <div
          class="imgContainer"
          ref="imgContainerRef"
          @click="clickImg"
          @mousedown.prevent="dragStart"
          @mousemove.prevent="dragDuring"
          @mouseup="dragEnd"
          @wheel.prevent="wheelZoom"
          :style="{
              transform: `translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale})`,
          }"
      >
          <template v-for="item of iconList" :key="item.id">
              <el-button
                  class="imgContainer-icon"
                  :style="{ left: `${item.x}px`, top: `${item.y}px` }"
                  :link="true"
                  :icon="MapLocation"
                  @click.stop="() => editIcon(item)"
              />
          </template>
      </div>
      <MyModal
          :visible="state.visible"
          @onUpdate:visible="() => (state.visible = false)"
          @deleteIcon="updateIconList"
          @handleSuccess="updateIconList"
          :record="record"
          :actionType="record?.id ? 'EDIT' : 'ADD'"
      />
  </div>
</template>

<script setup>
import MyModal from './components/MyModal.vue';
import { ref, onMounted, reactive, nextTick, onUnmounted } from 'vue';
import { MapLocation } from '@element-plus/icons-vue';
import info from './store';

const imgContainerRef = ref(null); // 图片容器元素
const record = ref();   // 当前icon数据
const isMove = ref(false); // 是否在拖拽的过程中
const state = reactive({
  startX: 0, // 拖拽开始时的x轴位置
  startY: 0, // 拖拽开始时的y轴位置
  isDragging: false, // 是否正在拖拽
  translateX: 0, // 拖拽期间x轴偏移量，即x轴拖拽的距离
  translateY: 0, // 拖拽期间y轴偏移量，即y轴拖拽的距离
  scale: 1, // 当前缩放比例
  prevX: 0, // 上一次打点的坐标X
  prevY: 0, // 上一次打点的坐标Y
  visible: false,
});
const iconList = ref(); // 打点的集合列表

// 获取icon列表
const getIconList = () => {
  const { innerHeight, innerWidth } = window;
  iconList.value = info.getInfosValue()?.map((item) => {
      return {
          ...item,
          x: ((innerWidth / item.currentWidth) * item.x).toFixed(0),
          y: ((innerHeight / item.currentHeight) * item.y).toFixed(0),
      };
  });
};
// 获取缩放值
const getScaleNum = (scale) => {
  const MIN_SCALE = 1;
  const MAX_SCALE = 10;
  return Math.min(Math.max(scale, MIN_SCALE), MAX_SCALE);
};
// 更新icon列表
const updateIconList = () => {
  getIconList();
};
// 编辑icon
const editIcon = (item) => {
  record.value = item;
  state.visible = true;
};

// 点击图片-打点
const clickImg = (event) => {
  // 在拖拽的过程中不允许打点
  if (isMove.value) {
      isMove.value = false;
      return;
  }
  const { clientX, clientY } = event;
  const { scale } = state;
  let imgRect = imgContainerRef.value?.getBoundingClientRect() || {}; // 获取元素的实际位置和尺寸
  let offsetX = imgRect.left; // 图片相对于视口的左边缘偏移量
  let offsetY = imgRect.top; // 图片相对于视口的顶部偏移量

  // 考虑到缩放和平移的影响， 取整数
  let x = ((clientX - offsetX) / scale).toFixed(0); // 打点处距离图片左侧的距离
  let y = ((clientY - offsetY) / scale).toFixed(0);
  const { innerHeight, innerWidth } = window; // 浏览器窗口
  let isChange = false; // 判断是否跟上一次打点一个位置，是否有改变
  if (state.prevX !== x) {
      state.prevX = x;
      isChange = true;
  }
  if (state.prevY !== y) {
      state.prevY = y;
      isChange = true;
  }
  // 弹出对话框的信息
  if (isChange) {
      record.value = {
          x, // 打点处距离图片左侧的距离
          y, // 打点处距离图片顶部的距离
          currentWidth: innerWidth, // 当前窗口的宽度
          currentHeight: innerHeight, // 当前窗口的高度
      };
      state.visible = true;
  }
};
// ====================== 鼠标相关 START============================
// 拖拽开始
const dragStart = (e) => {
  state.isDragging = true;
  state.startX = e.clientX - state.translateX;
  state.startY = e.clientY - state.translateY;
};
// 拖拽移动期间
const dragDuring = (e) => {
  nextTick(() => {
      if (state.isDragging) {
          if (!isMove.value) {
              isMove.value = true;
          }
          state.translateX = e.clientX - state.startX;
          state.translateY = e.clientY - state.startY;
      }
  });
};
// 拖拽结束
const dragEnd = () => {
  state.isDragging = false;
};
// 鼠标滚轮-监听滚动，控制图片缩放
const wheelZoom = (event) => {
  event.preventDefault();
  // event.deltaY<0 向上滚, event.deltaY>0 向下滚
  // event.wheelDelta>0 向上滚, event.wheelDelta<0 向下滚
  // 如果向下滚delta为1, 如果向下滚delta为-1
  // const delta = Math.max(-1, Math.min(1, event.deltaY || -event.wheelDelta));
  const delta = event.deltaY < 0 ? 1 : -1;
  const step = 0.1; // 缩放步进值
  state.scale = getScaleNum(state.scale + delta * step); // 设置缩放范围
};
// ======================== 鼠标相关 END ======================================
// ============================ 触摸监听 START ==============================================
// 启用图片的触摸监听
const enableImgTouchWatch = () => {
  imgContainerRef.value?.addEventListener('touchstart', touchStart, {
      passive: false,
  });
  imgContainerRef.value?.addEventListener('touchmove', touchMove, {
      passive: false,
  });
  imgContainerRef.value?.addEventListener('touchend', touchEnd);
};
const startDistance = ref();
const lastPoint = ref({ clientX: 0, clientY: 0 });
// 触摸开始（暂时有点问题）
const touchStart = (e) => {
  if (e.touches.length === 2) {
      // 获取当前触摸点的位置
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      // 初始化两点之间的起始距离
      const firstTouchStart = { x: touch1.clientX, y: touch1.clientY };
      const secondTouchStart = { x: touch2.clientX, y: touch2.clientY };

      // 计算初始距离
      startDistance.value = calculateDistance(
          firstTouchStart,
          secondTouchStart
      );
  } else if (e.touches.length === 1) {
      // 单指拖动逻辑
      const { clientX, clientY } = e.touches[0];
      lastPoint.value = { clientX, clientY };
  }
};
// 触摸移动
const touchMove = (e) => {
  e.preventDefault();
  if (e.touches.length === 2 && startDistance.value) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      // 获取当前触摸点的位置
      const firstTouchCurrent = { x: touch1.clientX, y: touch1.clientY };
      const secondTouchCurrent = { x: touch2.clientX, y: touch2.clientY };
      // 计算当前距离
      const currentDistance = calculateDistance(
          firstTouchCurrent,
          secondTouchCurrent
      );
      if (Math.abs(currentDistance - startDistance.value) > 10) {
          // 计算缩放比例
          state.scale = getScaleNum(currentDistance / startDistance.value);
      }
  } else if (e.touches.length === 1) {
      // 单指拖动逻辑
      const { clientX, clientY } = e.touches[0];
      const newX = state.translateX + clientX - lastPoint.value.clientX;
      const newY = state.translateY + clientY - lastPoint.value.clientY;
      const { clientWidth, clientHeight } = imgContainerRef.value;
      // 设定边界限制
      const padding = 20;
      const boundaryLeft =
          (clientWidth * state.scale - window.innerWidth) / 2 + padding;
      const boundaryRight =
          (-clientWidth * state.scale + window.innerWidth) / 2 - padding;
      const boundaryTop =
          (clientHeight * state.scale - window.innerHeight) / 2 + padding;
      const boundaryBottom =
          (window.innerHeight - clientHeight * state.scale) / 2 - padding;
      state.translateX = Number(
          Math.min(boundaryLeft, Math.max(newX, boundaryRight)).toFixed(0)
      );
      state.translateY = Number(
          Math.min(boundaryTop, Math.max(newY, boundaryBottom)).toFixed(0)
      );
      lastPoint.value = { clientX, clientY };
  }
};
// 触摸结束
const touchEnd = (e) => {
  startDistance.value = 0;
};
// 移除图片触摸监听
const removeImgTouchWatch = () => {
  // 移除事件监听器
  imgContainerRef.value?.removeEventListener('touchstart', touchStart);
  imgContainerRef.value?.removeEventListener('touchmove', touchMove);
  imgContainerRef.value?.removeEventListener('touchend', touchEnd);
};
// 计算两点间距离的辅助函数
function calculateDistance(pointA, pointB) {
  const dx = pointA.x - pointB.x;
  const dy = pointA.y - pointB.y;
  return Math.sqrt(dx * dx + dy * dy);
}
// ============================ 触摸监听 END ================================================

onMounted(() => {
  getIconList();
  enableImgTouchWatch(); // 允许移动端的双指缩放和拖动
});
onUnmounted(() => {
  removeImgTouchWatch(); // 移除图片触摸监听
});
</script>

<style scoped lang="less">
.imgContainer {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("../../../assets/functionDemo/map.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .imgContainer-icon {
      position: absolute;
      z-index: 3;
      color: #f00;
      font-size: 30px;
  }
}
</style>
