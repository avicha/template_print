<template>
    <div class="template-editor">
        <div class="menu-bar">
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isBackAvailable}" @click="backBtnHandler">
                    <i class="icon back-icon" title="返回"></i><span class="menu-item-text">返回</span>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isSaveAvailable}" @click="saveBtnHandler">
                    <i class="icon save-icon" title="保存"></i><span class="menu-item-text">保存</span>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isUndoAvailable}" @click="undoBtnHandler">
                    <i class="icon undo-icon" title="撤销"></i>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isRedoAvailable}" @click="redoBtnHandler">
                    <i class="icon redo-icon" title="重做"></i>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isAlignLeftAvailable}" @click="alignLeftBtnHandler">
                    <i class="icon align-left-icon" title="左对齐"></i>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignCenterAvailable}" @click="alignCenterBtnHandler">
                    <i class="icon align-center-icon" title="水平对齐"></i>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignRightAvailable}" @click="alignRightBtnHandler">
                    <i class="icon align-right-icon" title="右对齐"></i>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignTopAvailable}" @click="alignTopBtnHandler">
                    <i class="icon align-top-icon" title="顶部对齐"></i>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignMiddleAvailable}" @click="alignMiddleBtnHandler">
                    <i class="icon align-middle-icon" title="垂直居中"></i>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignBottomAvailable}" @click="alignBottomBtnHandler">
                    <i class="icon align-bottom-icon" title="底部对齐"></i>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignVCenterAvailable}" @click="alignVCenterBtnHandler">
                    <i class="icon align-v-center-icon" title="垂直居中分布"></i>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignHCenterAvailable}" @click="alignHCenterBtnHandler">
                    <i class="icon align-h-center-icon" title="水平居中分布"></i>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isCombineAvailable}" @click="combineBtnHandler">
                    <i class="icon combine-icon" title="组合"></i>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isSplitAvailable}" @click="splitBtnHandler">
                    <i class="icon split-icon" title="拆分"></i>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isRotateLeftAvailable}" @click="rotateLeftBtnHandler">
                    <i class="icon rotate-left-icon" title="向左旋转"></i>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isRotateRightAvailable}" @click="rotateRightBtnHandler">
                    <i class="icon rotate-right-icon" title="向右旋转"></i>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isRotateCanvasLeftAvailable}" @click="rotateCanvasLeftBtnHandler">
                    <i class="icon rotate-canvas-left-icon" title="旋转画布"></i>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item percentage" :class="{disabled: !menuItems.isPercentageAvailable}">
                    <i class="icon plus-icon" title="放大" @click="plusPercentageBtnHandler"></i><input class="percentage-input" v-model="canvas.percentage" /><i class="icon minus-icon" title="缩小" @click="minusPercentageBtnHandler">-</i>
                </div>
                <div class="menu-item width" :class="{disabled: !menuItems.isWidthAvailable}">
                    <span>宽(mm)</span><input type="number" class="width-input" v-model="canvas.width">
                </div>
                <div class="menu-item height" :class="{disabled: !menuItems.isHeightAvailable}">
                    <span>高(mm)</span><input type="number" class="height-input" v-model="canvas.height">
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isPreviewAvailable}" @click="previewBtnHandler">
                    <i class="icon preview-icon" title="预览"></i><span class="menu-item-text">预览/打印</span>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isLoadDataAvailable}" @click="loadDataBtnHandler">
                    <button class="load-data-btn">数据载入</button>
                </div>
            </div>
        </div>
        <div class="main-panel">
            <div class="right-panel">
                <TextSettingComponent ref="textSettingComponent" v-show="setting.isTextComponent" @changeComponentData="(data, shouldUpdate) => {this.changeComponentData(this.activeComponents[0], data, shouldUpdate)}" @record="record"></TextSettingComponent>
                <ImageSettingComponent ref="imageSettingComponent" v-show="setting.isImageComponent" @changeComponentData="(data, shouldUpdate)=>{this.changeComponentData(this.activeComponents[0], data, shouldUpdate)}" @record="record"></ImageSettingComponent>
                <ContainerSettingComponent ref="containerSettingComponent" v-show="setting.isContainerComponent" @changeComponentData="(data, shouldUpdate)=>{this.changeComponentData(this.activeContainers[0], data, shouldUpdate)}" @record="record"></ContainerSettingComponent>
                <PropertySettingComponent ref="propertySettingComponent" v-show="setting.isPropertyComponent"  @changeComponentData="(data, shouldUpdate) => {this.changeComponentData(this.activeComponents[0], data, shouldUpdate)}" @record="record"></PropertySettingComponent>
                <ItemListSettingComponent ref="itemListSettingComponent" v-show="setting.isItemListComponent" @changeComponentData="(data, shouldUpdate) => {this.changeComponentData(this.activeComponents[0], data, shouldUpdate)}" @record="record"></ItemListSettingComponent>
            </div>
            <div class="left-panel">
                <h4 class="title">基本元件</h4>
                <div class="menu-component-list">
                    <button class="menu-component" @dblclick="()=>{this.addText(this.canvas.width/2, this.canvas.height/2)}" draggable="true" @dragstart="componentDragStartHandler($event, 'addText')">文本
                        <div class="text-preview">
                            <span>文本</span>
                        </div>
                    </button>
                    <button class="menu-component image-btn">图片<input class="image-input" type="file" accept="image/jpeg,image/jpg,image/png,image/gif;" @change="addImage"/></button>
                    <div class="menu-component background-image-btn" :class="{active: isBackgroundImageActive}" @click="toggleBackgroundImageActive">背景图片
                        <ul class="background-image-menu-list">
                            <li class="change-background-image">替换<input ref="backgroundImageInput" class="background-image-input" type="file" accept="image/jpeg,image/jpg,image/png,image/gif;" @change="changeBackgroundImage"/></li>
                            <li class="remove-background-image" @click="removeBackgroundImage">删除</li>
                        </ul>
                    </div>
                    <button v-show="this.template.type == '1'" class="menu-component" @dblclick="()=>{this.addItemList(this.canvas.width/2, this.canvas.height/2)}" draggable="true" @dragstart="componentDragStartHandler($event, 'addItemList')">动态数据域</button>
                </div>
                <p class="prop-text">动态数据项</p>
                <div class="el-tree">
                    <div class="el-tree-node" v-for="propData in propListData" :class="{'is-expanded': propData.isExpanded}">
                        <div class="el-tree-node__content" style="padding-left: 0px;" @click="propData.isExpanded = !propData.isExpanded">
                            <span class="el-tree-node__expand-icon" :class="{expanded: propData.isExpanded}"></span>
                            <span class="el-tree-node__label">{{ propData.prop.name }}</span>
                        </div>
                        <div class="el-tree-node__children" v-show="propData.isExpanded">
                            <div class="el-tree-node" v-for="sub_prop in propData.prop.subList">
                                <div class="el-tree-node__content" style="padding-left: 16px;" @dblclick="handlePropClick(sub_prop)"  draggable="true" @dragstart="componentDragStartHandler($event, 'addProp', sub_prop)">
                                    <span class="el-tree-node__expand-icon is-leaf"></span>
                                    <span class="el-tree-node__label">{{ sub_prop.name }}</span>
                                </div>
                                <div class="el-tree-node__children" style="display: none;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="canvas-container">
                <div class="canvas" ref="canvas" :style="canvasStyle" @mousedown.prevent="canvasMousedownHandler" @mousemove.prevent="canvasMousemoveHandler" @mouseup.prevent="canvasMouseupHandler" @dragover.prevent="canvasDragoverHandler" @drop="canvasDropHandler">
                    <component v-for="component in canvas.components" :is="component.type" class="component" :class="{active: component.active}" :data="component.data" :templateData="templateData" @changeComponentData="changeComponentData(component, $event)" @updateItemListId="updateItemListId" :isPreview="false">
                    </component>
                    <ContainerComponent v-for="container in canvas.containers" class="component" :class="{active: container.active}" :data="container.data" @changeComponentData="changeComponentData(container, $event)"></ContainerComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {Tree} from 'element-ui'
Vue.use(Tree)

import TextComponent from '../components/Text'
import ImageComponent from '../components/Image'
import ContainerComponent from '../components/Container'
import PropertyComponent from '../components/Property'
import ItemListComponent from '../components/ItemList'
import TextSettingComponent from '../components/TextSetting'
import ImageSettingComponent from '../components/ImageSetting'
import ContainerSettingComponent from '../components/ContainerSetting'
import PropertySettingComponent from '../components/PropertySetting'
import ItemListSettingComponent from '../components/ItemListSetting'
import * as types from '../store/mutation_types'

import {readImageAsDataURL} from '../services/utils'
import extend from 'lodash/extend'
import find from 'lodash/find'

export default {
    data(){
        return {
            ppi: 96,
            ready: false,
            _isDraging: false,
            _dragingComponent: null,
            _startX: null,
            _startY: null,
            _endX: null,
            _endY: null,
            stack: [],
            stackIndex: -1,
            isBackgroundImageActive: false,
            _copyComponents: [],
            _copyContainers: [],
            propListData: this.propList.map(prop => {
                return {
                    prop,
                    isExpanded: false
                }
            }),
            menuItems:{
                isBackAvailable: true,
                isSaveAvailable: false,
                isUndoAvailable: false,
                isRedoAvailable: false,
                isAlignLeftAvailable: false,
                isAlignCenterAvailable: false,
                isAlignRightAvailable: false,
                isAlignTopAvailable: false,
                isAlignMiddleAvailable: false,
                isAlignBottomAvailable: false,
                isAlignHCenterAvailable: false,
                isAlignVCenterAvailable: false,
                isCombineAvailable: false,
                isSplitAvailable: false,
                isRotateLeftAvailable: false,
                isRotateRightAvailable: false,
                isRotateCanvasLeftAvailable: true,
                isPercentageAvailable: true,
                isWidthAvailable: true,
                isHeightAvailable: true,
                isPreviewAvailable: true,
                isLoadDataAvailable: false
            },
            canvas: {
                percentage: 100,
                width: 0,
                height: 0,
                backgroundImage: '',
                rotateDeg: 0,
                components: [
                    
                ],
                containers: [

                ]
            },
        }
    },
    components:{
        TextComponent,
        ImageComponent,
        ContainerComponent,
        PropertyComponent,
        ItemListComponent,
        TextSettingComponent,
        ImageSettingComponent,
        ContainerSettingComponent,
        PropertySettingComponent,
        ItemListSettingComponent,
    },
    computed: {
        canvasStyle() {
            let translate = ''
            let rotateDeg = (this.canvas.rotateDeg + 360)%360
            switch(rotateDeg){
                case 90:
                    translate = ' translateY(-' + this.canvas.height*this.canvas.percentage/100 +'mm)'
                    break;
                case 180:
                    translate = ' translate(-' + this.canvas.width*this.canvas.percentage/100 +'mm, -' + this.canvas.height*this.canvas.percentage/100 + 'mm)'
                    break;
                case 270:
                    translate = ' translateX(-' + this.canvas.width*this.canvas.percentage/100 +'mm)'
                    break;
            }
            return {
                width: this.canvas.width + 'mm',
                height: this.canvas.height + 'mm',
                backgroundImage: this.canvas.backgroundImage && ('url(' + this.canvas.backgroundImage + ')'),
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                transform: 'rotate(' + rotateDeg + 'deg)' + translate + ' scale(' + this.canvas.percentage/100 + ')',
                transformOrigin: '0 0',
            }
        },
        activeComponents() {
            return this.canvas.components.filter(component => {
                return component.active
            })
        },
        activeContainers() {
            return this.canvas.containers.filter(container => {
                return container.active
            })
        },
        setting() {
            return {
                isTextComponent: !this.activeContainers.length && this.activeComponents.length == 1 && this.activeComponents[0].type == 'TextComponent',
                isImageComponent: !this.activeContainers.length && this.activeComponents.length == 1 && this.activeComponents[0].type == 'ImageComponent',
                isContainerComponent: !this.activeComponents.length && this.activeContainers.length == 1 && this.activeContainers[0].type == 'ContainerComponent',
                isPropertyComponent: !this.activeContainers.length && this.activeComponents.length == 1 && this.activeComponents[0].type == 'PropertyComponent',
                isItemListComponent: !this.activeContainers.length && this.activeComponents.length == 1 && this.activeComponents[0].type == 'ItemListComponent',
            }
        },
    },
    props: ['propList', 'template', 'templateData'],
    watch:{
        //改变菜单的显示
        activeComponents(){
            this.showMenu()
        },
        //改变菜单的显示
        activeContainers(){
            this.showMenu()
        },
        //根据操作记录显示撤回和重做菜单
        stackIndex(i){
            if(i){
                this.menuItems.isSaveAvailable = true
            }
            if(this.stack[i - 1]){
                this.menuItems.isUndoAvailable = true
            } else {
                this.menuItems.isUndoAvailable = false
            }
            if(this.stack[i + 1]){
                this.menuItems.isRedoAvailable = true
            } else {
                this.menuItems.isRedoAvailable = false
            }
        },
        propList(){
            this.propListData = this.propList.map(prop => {
                return {
                    prop,
                    isExpanded: false
                }
            })
        },
    },
    mounted(){
        //加载成功重置组件数据，记录canvas状态
        this.$on('set_canvas', canvas_str => {
            this.reset()
            this.canvas = this.restoreCanvas(canvas_str)
            this.record()
            Vue.nextTick(() => {
                this.ready = true
            })
        })
        //删除选中的组件和容器
        this.$on('delete_keyup',() => {
            if(this.activeComponents.length || this.activeContainers.length){
                if(window.confirm('确认删除选中的组件')){
                    this.activeContainers.forEach(container => {
                        this.removeContainer(container)
                    })
                    this.activeComponents.forEach(component => {
                        this.removeComponent(component)
                    })
                    this.updateItemListId()
                    this.record()
                }
            }
        })
        //复制选中的组件和容器
        this.$on('copy_keyup', () => {
            let components = [], containers = []
            this.activeContainers.forEach(container => {
                let container_str = JSON.stringify(container)
                containers.push(container_str)
            })
            this.activeComponents.forEach(component => {
                let component_str = JSON.stringify(component)
                components.push(component_str)
            })
            this._copyComponents = components
            this._copyContainers = containers
        })
        //粘贴之前复制的组件和容器
        this.$on('paste_keyup', () => {
            if(this._copyComponents.length || this._copyContainers.length){
                let components = [], containers = []
                this._copyComponents.forEach(component_str => {
                    let component = JSON.parse(component_str)
                    component.data.id = Math.round(Date.now() + Math.random() * 100)
                    //把组件移到右下方5mm
                    this.moveComponent(component, {left: 5, top: 5})
                    components.push(component)
                })
                this._copyContainers.forEach(container_str => {
                    let container = JSON.parse(container_str)
                    //改变容器下的组件children
                    container.data.children = container.data.children.map(child => {
                        //容器下的组件也进行复制，并改变组件的id
                        child.id = Math.round(Date.now() + Math.random() * 100)
                        this.moveComponent(child, {left: 5, top: 5})
                        components.push(child)
                        return child
                    })
                    container.data.id = Math.round(Date.now() + Math.random() * 100)
                    this.moveComponent(container, {left: 5, top: 5})
                    containers.push(container)
                })
                //把复制的组件和容器添加到canvas
                this.canvas.components = this.canvas.components.concat(components)
                this.canvas.containers = this.canvas.containers.concat(containers)
                this.updateItemListId()
                this.record()
            }
        })
        this.$on('undo_keyup', () => {
            this.undoBtnHandler()
        })
        this.$on('move_keyup', (direction) => {
            let pos = {}
            let step = 1
            switch(direction){
                case 'left':
                    pos = {left: -step}
                    break
                case 'up':
                    pos = {top: -step}
                    break
                case 'right':
                    pos = {left: step}
                    break
                case 'down':
                    pos = {top: step}
            }
            this.activeComponents.forEach(component => {
                this.moveComponent(component, pos)
            })
            this.activeContainers.forEach(container => {
                this.moveComponent(container, pos)
            })
            if(this.setting.isTextComponent || this.setting.isImageComponent || this.setting.isPropertyComponent || this.setting.isItemListComponent){
                this.showItemSetting(this.activeComponents[0])
            } else {
                if(this.setting.isContainerComponent){
                    this.showItemSetting(this.activeContainers[0])
                }
            }
            this.record()
        })
    },
    methods:{
        //重置数据
        reset(){
            this.ready = false
            this.stack = []
            this.stackIndex = -1
            this._copyComponents = []
            this._copyContainers = []
        },
         //记录canvas数据，因为canvas是深度克隆出来的，所以容器的children需要改变指针
        record(){
            let canvas = JSON.stringify(this.canvas)
            this.stack[++this.stackIndex] = canvas
            if(this.stack[this.stackIndex + 1]){
                this.stack.splice(this.stackIndex + 1, this.stack.length)
            }
        },
        restoreCanvas(canvas_str){
            let canvas = JSON.parse(canvas_str)
            //因为canvas是反序列化得来的，所以要为容器下的children恢复指针指向组件
            canvas.containers.forEach(container => {
                container.data.children = container.data.children.map(child => {
                    return find(canvas.components, component => component.data.id == child.data.id)
                })
            })
            this.updateItemListId()
            return canvas
        },
        //记录鼠标按下时的位置和选中的组件
        canvasMousedownHandler(e){
            if(e.which == 1){
                let {offsetX, offsetY} = this._getPointerOffset(e)
                this._startX = offsetX
                this._startY = offsetY
                this._dragingComponent = this._getComponentByPos({offsetX, offsetY}, true)    
            }
        },
        //拖动鼠标时，如果有选中的组件，则拖动组件
        canvasMousemoveHandler(e){
            if(this._dragingComponent && e.which == 1){
                this._isDraging = true
                let {offsetX, offsetY} = this._getPointerOffset(e)
                this._endX = offsetX
                this._endY = offsetY
                this.moveComponent(this._dragingComponent, {left: this._endX - this._startX, top: this._endY - this._startY})
                this._startX = this._endX
                this._startY = this._endY
            }
        },
        //松开鼠标时，如果在拖动，则停止拖动，否则显示选中的组件信息，或者取消所有组件的选中状态
        canvasMouseupHandler(e){
            if(e.which == 1){
                let {offsetX, offsetY} = this._getPointerOffset(e)
                if(this._isDraging){
                    this._endX = offsetX
                    this._endY = offsetY
                    this.moveComponent(this._dragingComponent, {left: this._endX - this._startX, top: this._endY - this._startY})
                    this.showItemSetting(this._dragingComponent)
                    this.record()
                } else {
                    let clickingComponent = this._getComponentByPos({offsetX, offsetY}, false)
                    if(clickingComponent){
                        this.activeComponent(clickingComponent, !(e.ctrlKey || e.metaKey))
                    } else {
                        this.resetComponentsActiveState()
                    }
                }
                this._isDraging = false
                this._dragingComponent = null
            }
        },
        //根据点击事件，获取相对于canvas的点击位置
        _getPointerOffset(e){
            let canvas = this.$refs.canvas
            let p = e.target
            let offsetX = e.offsetX
            let offsetY = e.offsetY
            while(p!= canvas){
                offsetX += p.offsetLeft
                offsetY += p.offsetTop
                p = p.parentNode
            }
            offsetX = Math.round(offsetX/this.ppi*2.54*10)
            offsetY = Math.round(offsetY/this.ppi*2.54*10)
            return {
                offsetX,
                offsetY,
            }
        },
        //根据相对于canvas的位置，判断选中的组件
        _getComponentByPos({offsetX, offsetY}, isActive){
            let items = []
            let components = isActive ? this.activeComponents : this.canvas.components
            let containers = isActive ? this.activeContainers : this.canvas.containers
            components.forEach(component => {
                if(offsetX > component.data.left && offsetX < component.data.left + component.data.width && offsetY > component.data.top && offsetY < component.data.top + component.data.height){
                    items.push(component)
                }
            })
            containers.forEach(container => {
                if(offsetX > container.data.left && offsetX < container.data.left + container.data.width && offsetY > container.data.top && offsetY < container.data.top + container.data.height){
                    items.push(container)
                }
            })
            items = items.sort((a, b) => b.data.zIndex - a.data.zIndex)
            return items[0]
        },
        //根据不同的组合情况，显示适当的菜单项
        showMenu(){
            let l1 = this.activeComponents.length
            let l2 = this.activeContainers.length
            let g0 = {
                isAlignLeftAvailable: false,
                isAlignCenterAvailable: false,
                isAlignRightAvailable: false,
                isAlignTopAvailable: false,
                isAlignMiddleAvailable: false,
                isAlignBottomAvailable: false,
                isAlignHCenterAvailable: false,
                isAlignVCenterAvailable: false,
                isCombineAvailable: false,
                isSplitAvailable: false,
                isRotateLeftAvailable: false,
                isRotateRightAvailable: false,
                isLoadDataAvailable: false,
            }
            let g1 = {
                isAlignLeftAvailable: true,
                isAlignCenterAvailable: true,
                isAlignRightAvailable: true,
                isAlignTopAvailable: true,
                isAlignMiddleAvailable: true,
                isAlignBottomAvailable: true,
            }
            let g2 = {
                isAlignHCenterAvailable: true,
                isAlignVCenterAvailable: true,
            }
            let g3 = {
                isCombineAvailable: true,
            }
            let g4 = {
                isSplitAvailable: true,
            }
            let g5 = {
                isRotateLeftAvailable: true,
                isRotateRightAvailable: true,
            }
            let g6 = {
                isLoadDataAvailable: true,
            }
            if(l1 + l2 >= 3){
                extend(this.menuItems, g0, g1, g2, g3)
            } else {
                if(l1 + l2 == 2){
                    extend(this.menuItems, g0, g1, g3)
                } else {
                    if(l1){
                        if(['ItemListComponent', 'PropertyComponent'].includes(this.activeComponents[0].type)){
                            extend(this.menuItems, g0, g5, g6)
                        } else {
                            extend(this.menuItems, g0, g5)    
                        }
                        Vue.nextTick(() => {
                            this.showItemSetting(this.activeComponents[0])
                        })
                    } else {
                        if(l2) {
                            extend(this.menuItems, g0, g4, g5)
                            Vue.nextTick(() => {
                                this.showItemSetting(this.activeContainers[0])
                            })
                        } else {
                            extend(this.menuItems, g0)
                        }
                    }
                }
            }
        },
        //返回
        backBtnHandler(){
            if(this.menuItems.isBackAvailable){
                if(window.confirm('还未保存，是否确认要退出？')){
                    this.$router.go(-1)
                }    
            }
        },
        //保存按钮
        saveBtnHandler(){
            if(this.menuItems.isSaveAvailable){
                if(this.template.templateId){
                    let templateData = {
                        templateId: this.template.templateId,
                        content: JSON.stringify(this.canvas),
                        width: this.canvas.width,
                        height: this.canvas.height,
                    }
                    //调用store发送更新请求，请求成功也同步更新template数据，不过按道理子组件不应该直接调用store，为了方便
                    this.$store.dispatch('updateTemplate', templateData).then(json => {
                        if(json.state == 200){
                            this.$store.commit(types.TEMPLATE_DETAIL_UPDATED, templateData)
                            alert('保存成功')
                        }
                    })
                }
            }
        },
        //撤回
        undoBtnHandler(){
            if(this.menuItems.isUndoAvailable){
                this.canvas = this.restoreCanvas(this.stack[--this.stackIndex])
            }
        },
        //重做
        redoBtnHandler(){
            if(this.menuItems.isRedoAvailable){
                this.canvas = this.restoreCanvas(this.stack[++this.stackIndex])
            }
        },
        //左对齐，记录
        alignLeftBtnHandler(){
            if(this.menuItems.isAlignLeftAvailable){
                let items = [].concat(this.activeComponents, this.activeContainers)
                let left = Math.min.apply(this, items.map(component => component.data.left))
                items.forEach(component => {
                    this.moveComponentTo(component, {left: left})
                })
                this.record()
            }
        },
        //水平居中，记录
        alignCenterBtnHandler(){
            if(this.menuItems.isAlignCenterAvailable){
                let items = [].concat(this.activeComponents, this.activeContainers)
                let top = Number.MAX_VALUE, topest = null
                items.forEach(component => {
                    let t = component.data.top
                    if(t < top){
                        top = t
                        topest = component
                    }
                })
                let center = topest.data.left + 0.5 * topest.data.width
                items.forEach(component => {
                    this.moveComponentTo(component, {left: center - 0.5 * component.data.width})
                })
                this.record()
            }
        },
        //右对齐，记录
        alignRightBtnHandler(){
            if(this.menuItems.isAlignRightAvailable){
                let items = [].concat(this.activeComponents, this.activeContainers)
                let right = Math.max.apply(this, items.map(component => component.data.left + component.data.width))
                items.forEach(component => {
                    this.moveComponentTo(component, {left: right - component.data.width})
                })
                this.record()
            }
        },
        //顶部对齐，记录
        alignTopBtnHandler(){
            if(this.menuItems.isAlignTopAvailable){
                let items = [].concat(this.activeComponents, this.activeContainers)
                let top = Math.min.apply(this, items.map(component => component.data.top))
                items.forEach(component => {
                    this.moveComponentTo(component, {top: top})
                })
                this.record()
            }
        },
        //垂直居中，记录
        alignMiddleBtnHandler(){
            if(this.menuItems.isAlignCenterAvailable){
                let items = [].concat(this.activeComponents, this.activeContainers)
                let left = Number.MAX_VALUE, leftest = null
                items.forEach(component => {
                    let l = component.data.left
                    if(l < left){
                        left = l
                        leftest = component
                    }
                })
                let middle = leftest.data.top + 0.5 * leftest.data.height
                items.forEach(component => {
                    this.moveComponentTo(component, {top: middle - 0.5 * component.data.height})
                })
                this.record()
            }
        },
        //底部对齐，记录
        alignBottomBtnHandler(){
            if(this.menuItems.isAlignBottomAvailable){
                let items = [].concat(this.activeComponents, this.activeContainers)
                let bottom = Math.max.apply(this, items.map(component => component.data.top + component.data.height))
                items.forEach(component => {
                    this.moveComponentTo(component, {top: bottom - component.data.height})
                })
                this.record()
            }
        },
        //垂直居中分布，记录
        alignVCenterBtnHandler(){
            if(this.menuItems.isAlignVCenterAvailable){
                let items = [].concat(this.activeComponents, this.activeContainers)
                let componentDataTemp = items.sort((item1, item2) => {
                    return item1.data.top - item2.data.top
                })
                let first = componentDataTemp[0]
                let firstMiddle = first.data.top + 0.5 * first.data.height
                let last = componentDataTemp[componentDataTemp.length - 1]
                let lastMiddle = last.data.top + 0.5 * last.data.height
                let gap = (lastMiddle - firstMiddle) / (componentDataTemp.length - 1)
                componentDataTemp.forEach((component, i) => {
                    this.moveComponentTo(component, {top: firstMiddle + i * gap - 0.5 * component.data.height})
                })
                this.record()
            }
        },
        //水平居中分布，记录
        alignHCenterBtnHandler(){
            if(this.menuItems.isAlignHCenterAvailable){
                let items = [].concat(this.activeComponents, this.activeContainers)
                let componentDataTemp = items.sort((item1, item2) => {
                    return item1.data.left - item2.data.left
                })
                let first = componentDataTemp[0]
                let firstCenter = first.data.left + 0.5 * first.data.width
                let last = componentDataTemp[componentDataTemp.length - 1]
                let lastCenter = last.data.left + 0.5 * last.data.width
                let gap = (lastCenter - firstCenter) / (componentDataTemp.length - 1)
                componentDataTemp.forEach((component, i) => {
                    this.moveComponentTo(component, {left: firstCenter + i * gap - 0.5 * component.data.width})
                })
                this.record()
            }
        },
        //组合组件，记录
        combineBtnHandler(){
            if(this.menuItems.isCombineAvailable){
                let tops = [],lefts = [],rights = [], bottoms = [], children = []
                this.activeComponents.forEach(component => {
                    tops.push(component.data.top)
                    lefts.push(component.data.left)
                    rights.push(component.data.left + component.data.width)
                    bottoms.push(component.data.top + component.data.height)
                    children.push(component)
                })
                this.activeContainers.forEach(component => {
                    component.data.children.forEach(child => {
                        tops.push(child.data.top)
                        lefts.push(child.data.left)
                        rights.push(child.data.left + child.data.width)
                        bottoms.push(child.data.top + child.data.height)
                        children.push(child)
                    })
                })
                let top = Math.min.apply(this, tops)
                let left = Math.min.apply(this, lefts)
                let right = Math.max.apply(this, rights)
                let bottom = Math.max.apply(this, bottoms)
                let container = {
                    type: 'ContainerComponent',
                    active: false,
                    data: {
                        id: Date.now(),
                        children: children,
                        top: top,
                        left: left,
                        width: right - left,
                        height: bottom - top,
                        zIndex: -1
                    }
                }
                this.canvas.containers = this.canvas.containers.filter(container => !container.active)
                this.canvas.containers.push(container)
                this.activeContainer(container, true)
                this.record()
            }
        },
        //拆分组件，记录
        splitBtnHandler(){
            if(this.menuItems.isSplitAvailable){
                let activeContainer = this.activeContainers[0]
                let index = this.canvas.containers.indexOf(activeContainer)
                this.canvas.containers.splice(index, 1)
                activeContainer.data.children.forEach(child => {
                    this.activeComponent(child, false)
                })
                this.record()
            }
        },
        //左旋转，记录
        rotateLeftBtnHandler(){
            if(this.menuItems.isRotateLeftAvailable){
                let component = this.activeComponents[0]
                component.data.rotateDeg = (component.data.rotateDeg - 90)%360
                this.record()
            }
        },
        //右旋转，记录
        rotateRightBtnHandler(){
            if(this.menuItems.isRotateRightAvailable){
                let component = this.activeComponents[0]
                component.data.rotateDeg = (component.data.rotateDeg + 90)%360
                this.record()
            }
        },
        //旋转画布，记录
        rotateCanvasLeftBtnHandler(){
            if(this.menuItems.isRotateCanvasLeftAvailable){
                this.canvas.rotateDeg = (this.canvas.rotateDeg - 90) % 360
                this.record()  
            }
        },
        //增加比例，记录
        plusPercentageBtnHandler(){
            if(this.menuItems.isPercentageAvailable){
                this.canvas.percentage += 10
                this.record()
            }
        },
        //减少比例
        minusPercentageBtnHandler(){
            if(this.menuItems.isPercentageAvailable){
                this.canvas.percentage -= 10  
                this.record()  
            }
        },
        //预览
        previewBtnHandler(){
            if(this.menuItems.isPreviewAvailable){
                this.$emit('preview', this.canvas)
            }
        },
        //加载数据
        loadDataBtnHandler(){
            if(this.menuItems.isLoadDataAvailable){
                if(this.template.type == 1){
                    this.$emit('loadQualityTemplateData')
                } else {
                    this.$emit('openLoadLabelTemplateDataDialog')
                }
            }
        },
        //把组件移动到某个坐标
        moveComponentTo(component, pos){
            if(component.type == 'ContainerComponent'){
                let offsetTop = pos.top == null ? 0 : pos.top - component.data.top
                let offsetLeft = pos.left == null ? 0: pos.left - component.data.left
                component.data.children.forEach(child => {
                    this.moveComponent(child, {top: offsetTop, left: offsetLeft})
                })
            } else {
                extend(component.data, pos)
            }
        },
        //把组件偏移某个坐标
        moveComponent(component, pos){
            if(component.type == 'ContainerComponent'){
                component.data.children.forEach(child => {
                    this.moveComponent(child, pos)
                })
            } else {
                component.data.left += (pos.left || 0)
                component.data.top += (pos.top || 0)
            }
        },
        //点击背景图片时，如果已经有背景图片
        toggleBackgroundImageActive(e){
            if(this.canvas.backgroundImage){
                //这时候菜单已经弹出，延迟关闭菜单即可
                if(this.isBackgroundImageActive){
                    Vue.nextTick(() => {
                        this.isBackgroundImageActive = !this.isBackgroundImageActive
                    })
                } else {
                    //这时候菜单还未弹出，那么弹出菜单，同时阻止弹出图片选择框
                    this.isBackgroundImageActive = !this.isBackgroundImageActive
                    e.preventDefault()
                }
            }
        },
        //改变背景图片时，预览图片文件的base64编码为canvas的背景图片，记录
        changeBackgroundImage(e){
            let file = e.target.files[0]
            if(file){
                readImageAsDataURL(file, (error, base64URL) => {
                    if(error){
                        alert(error)
                    } else {
                        this.canvas.backgroundImage = base64URL
                        this.isBackgroundImageActive = false
                        this.record()
                    }
                })
            }
        },
        //删除背景图片
        removeBackgroundImage(e){
            this.canvas.backgroundImage = ''
            this.$refs.backgroundImageInput.value = ''
            this.isBackgroundImageActive = false
            this.record()
        },
        //改变组件的数据
        changeComponentData(component, data, shouldUpdate){
            extend(component.data, data)
            if(shouldUpdate){
                this.showItemSetting(component)
            }
        },
        //重置组件为未选中状态
        resetComponentsActiveState(){
            this.canvas.components.forEach(component => {
                component.active = false
            })
            this.canvas.containers.forEach(container => {
                container.active = false
            })
        },
        //选中组件，是否reset代表是否把其他组件设置为未选中状态
        activeComponent(component, isReset){
            for(let i = 0,l = this.canvas.containers.length; i < l; i++){
                let container = this.canvas.containers[i]
                if(~container.data.children.indexOf(component)){
                    if(!container.active){
                        return this.activeContainer(container, isReset)
                    }
                }
            }
            if(isReset){
                this.resetComponentsActiveState()
                component.active = true
            } else {
                component.active = true
            }
        },
        //选中容器，是否reset代表是否把其他组件设置为未选中状态
        activeContainer(container, isReset){
            if(isReset){
                this.resetComponentsActiveState()
                container.active = true
            } else {
                container.active = true
            }
        },
        removeComponent(component){
            let index = this.canvas.components.indexOf(component)
            this.canvas.components.splice(index, 1)
        },
        removeContainer(container){
            let index = this.canvas.containers.indexOf(container)
            this.canvas.containers.splice(index, 1)
            container.data.children.forEach(child => {
                this.removeComponent(child)
            })
        },
        //显示某个组件的设置信息
        showItemSetting(component){
            switch(component.type){
                case 'TextComponent':
                    this.$refs.textSettingComponent.$emit('set_data', component.data)
                    break
                case 'ImageComponent':
                    this.$refs.imageSettingComponent.$emit('set_data', component.data)
                    break
                case 'ContainerComponent':
                    this.$refs.containerSettingComponent.$emit('set_data', component.data)
                    break
                case 'PropertyComponent':
                    this.$refs.propertySettingComponent.$emit('set_data', component.data)
                    break
                case 'ItemListComponent':
                    this.$refs.itemListSettingComponent.$emit('set_data', component.data)
            }
        },
        //拖动组件时，带上拖动时的偏移位置
        componentDragStartHandler(e, action, data){
            e.dataTransfer.setData('text/plain', JSON.stringify({action: action, offsetX: Math.round(e.offsetX/this.ppi*2.54*10), offsetY: Math.round(e.offsetY/this.ppi*2.54*10), data: data}))
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.setDragImage(e.target, e.offsetX, e.offsetY)
        },
        //经过画布上时显示移动效果
        canvasDragoverHandler(e){
            e.dataTransfer.dropEffect = 'move'
        },
        //画布上落下时，根据要添加的元素和位置添加组件
        canvasDropHandler(e){
            let data = e.dataTransfer.getData('text/plain') 
            if(data){
                data = JSON.parse(data)
                let {offsetX, offsetY} = this._getPointerOffset(e)
                let left = offsetX - data.offsetX
                let top = offsetY - data.offsetY
                switch(data.action){
                    case 'addText':
                        this.addText(left, top)
                        break;
                    case 'addItemList':
                        this.addItemList(left, top)
                        break
                    case 'addProp':
                        this.handlePropClick(data.data, left, top)
                }
            }
        },
        //添加文本时，添加到画布left，top位置，并选中，记录
        addText(left = 0, top = 0){
            let component = {
                type: 'TextComponent',
                active: false,
                data: {
                    id: Date.now(),
                    content: '文本',
                    rotateDeg: 0,
                    isBold: false,
                    isItalic: false,
                    isUnderline: false,
                    fontFamily: 'Microsoft Yahei',
                    fontSize: 14,
                    color: '#333',
                    width: 0,
                    height: 0,
                    top: top,
                    left: left,
                    zIndex: this.canvas.components.length,
                }
            }
            this.canvas.components.push(component)
            this.activeComponent(component, true)
            this.record()
        },
        //添加图片，默认添加到画布中央右下角，并选中，记录
        addImage(e){
            let file = e.target.files[0]
            if(file){
                readImageAsDataURL(file, (error, base64URL, imageInfo) => {
                    if(error){
                        alert(error)
                    } else {
                        let top = this.canvas.height/2
                        let left = this.canvas.width/2
                        let component = {
                            type: 'ImageComponent',
                            active: false,
                            data: {
                                id: Date.now(),
                                src: base64URL,
                                rotateDeg: 0,
                                width: Math.round(imageInfo.width/this.ppi*2.54*10),
                                height: Math.round(imageInfo.height/this.ppi*2.54*10),
                                top: top,
                                left: left,
                                zIndex: this.canvas.components.length,
                            }
                        }
                        this.canvas.components.push(component)
                        this.activeComponent(component, true)
                        this.record()
                    }
                })
            }
        },
        //选中属性时，添加属性组件，默认添加到画布中央右下角，并选中，记录
        handlePropClick(data, left = this.canvas.width/2, top = this.canvas.height/2){
            let component = {
                type: 'PropertyComponent',
                active: false,
                data: {
                    id: Date.now(),
                    propertyCode: data.code,
                    propertyName: data.name,
                    propertyType: Number(data.codeType),
                    toFixed: data.codeType == 1? 2: (data.codeType == 3? 3: 0),
                    dateFormat: 'YYYY-MM-DD HH:mm:ss',
                    prefix: '',
                    prefixStyle: {
                        isBold: false,
                        isItalic: false,
                        isUnderline: false,
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 14,
                        color: '#333',
                    },
                    sample: '',
                    valueStyle: {
                        isBold: false,
                        isItalic: false,
                        isUnderline: false,
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 14,
                        color: '#333',
                    },
                    suffix: '',
                    suffixStyle: {
                        isBold: false,
                        isItalic: false,
                        isUnderline: false,
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 14,
                        color: '#333',
                    },
                    rotateDeg: 0,
                    width: Math.round(160/this.ppi*2.54*10),
                    height: Math.round(40/this.ppi*2.54*10),
                    top: top,
                    left: left,
                    textAlign: 'left',
                    alignNumber: 0,
                    itemListId: null,
                    zIndex: this.canvas.components.length,
                }
            }
            this.canvas.components.push(component)
            this.updateItemListId()
            this.activeComponent(component, true)
            this.record()
        },
        //添加动态数据域，添加到画布left，top位置，并选中，记录
        addItemList(left, top){
            let component = {
                type: 'ItemListComponent',
                active: false,
                data: {
                    id: Date.now(),
                    rotateDeg: 0,
                    width: Math.round(120/this.ppi*2.54*10),
                    height: Math.round(60/this.ppi*2.54*10),
                    top: top,
                    left: left,
                    children: [],
                    zIndex: this.canvas.components.length,
                }
            }
            this.canvas.components.push(component)
            this.updateItemListId()
            this.activeComponent(component, true)
            this.record()
        },
        //拖动数据项时，更新数据项的所属数据域，默认放在数据域的顶部
        updateItemListId(){
            let itemListComponents = this.canvas.components.filter(component => {
                component.data.itemListId = null
                return component.type == 'ItemListComponent'
            })
            itemListComponents.forEach(itemListComponent => {
                let children = []
                this.canvas.components.forEach(component => {
                    if(component.type == 'PropertyComponent'){
                        let isContain = false
                        let componentL = component.data.left
                        let componentR = component.data.left + component.data.width
                        let componentT = component.data.top
                        let componentB = component.data.top + component.data.height
                        let thisL = itemListComponent.data.left
                        let thisR = itemListComponent.data.left + itemListComponent.data.width
                        let thisT = itemListComponent.data.top
                        let thisB = itemListComponent.data.top + itemListComponent.data.height
                        if((thisL < componentR) && (thisR > componentL) && (thisT < componentB) && (thisB > componentT)) {
                            children.push(component)
                            component.data.itemListId = itemListComponent.data.id
                            if((thisL < componentL) && (thisR > componentR) && (thisT < componentT) && (thisB > componentB)){
                                isContain = true
                            }
                        }
                        if(componentT != thisT && isContain){
                            this.moveComponentTo(component, {top: thisT})
                            this.record()  
                        }
                    }
                })
                itemListComponent.data.children = children
            })
        },
    }
}
</script>
<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/fonts.scss";
@import "../assets/scss/colors.scss";
.template-editor {
    color: #333;
    @include F(14);
    .menu-bar {
        overflow: hidden;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        .menu-item-group {
            overflow: hidden;
            float: left;
            border-right: 1px solid #d6d6d6;
            padding: 0 14px;
            margin: 10px 0; 
            &:last-child {
                border-right: none;
            }
            .menu-item {
                float: left;
                height: 30px;
                line-height: 30px;
                margin-right: 10px;
                &:last-child {
                    margin-right: 0;
                }
                &.disabled {
                    .icon {
                        opacity: .3;
                    }
                    .menu-item-text, .load-data-btn {
                        color: #999;
                    }
                }
                .menu-item-text {
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 10px;
                    color: #333;
                    user-select: none;
                    cursor: default;
                }
            }
            .percentage {
                height: 24px;
                line-height: 0;
                border: 1px solid #d6d6d6;
                border-radius: 4px;
                margin-right: 0;
                margin-top: 2px;
                .plus-icon {
                    border-right: 1px solid #d6d6d6;
                }
                .percentage-input {
                    text-align: center;
                    width: 46px;
                    height: 24px;
                    line-height: 24px;
                }
                .minus-icon {
                    border-left: 1px solid #d6d6d6;
                }
            }
            .width, .height {
                margin-right: 0;
                span {
                    margin: 0 10px 0 20px;
                }
                input {
                    color: #333;
                    width: 70px;
                    height: 24px;
                    line-height: 24px;
                    border: 1px solid #d6d6d6;
                    border-radius: 4px;
                    text-align: center;
                }
            }
            .load-data-btn {
                width: 90px;
                height: 30px;
                border-radius: 4px;
                border: 1px solid #d6d6d6;
                background: #fff;
                color: #333;
            }
        }
    }
    .main-panel {
        height: 100%;
        position: relative;
        background-color: #f1f4f8;
        .left-panel {
            width: 190px;
            @include left;
            overflow: scroll;
            background-color: #fff;
            border-right: 1px solid #d6d6d6;
            .title {
                padding-top: 20px;
                padding-bottom: 8px;
                margin: 0 10px;
                text-align: center;
                font-weight: normal;
                color: #999;
                border-bottom: 1px solid #d6d6d6;
            }
            .menu-component-list {
                letter-spacing: -3px;
                padding: 0 10px;
                margin-bottom: 20px;
                .menu-component {
                    position: relative;
                    letter-spacing: 0px;
                    display: inline-block;
                    box-sizing: border-box;
                    margin-top: 20px;
                    margin-left: 10px;
                    width: 70px;
                    height: 30px;
                    @include BD1;
                    border-radius: 4px;
                    background: #fff;
                    color: #333;
                }
                .text-preview {
                    position: fixed;
                    display: none;
                    text-align: center;
                    line-height: 30px;
                    border: 1px dashed #4ec0ff;
                    background-color: rgba(78, 192, 255, .15);
                    span {
                        padding: 5px;
                        font-family: Microsoft Yahei;
                        @include F(14);
                    }
                }
                .background-image-btn {
                    position: relative;
                    box-sizing: border-box;
                    line-height: 30px;
                    text-align: center;
                    user-select: none;
                    @include F(12);
                    .background-image-menu-list {
                        background-color: $C2;
                        opacity: 0;
                        @include top;
                        .change-background-image, .remove-background-image {
                            list-style: none;
                            text-align: center;
                            line-height: 30px;
                            cursor: default;
                        }
                        .change-background-image {
                            @include TC1;
                            position: relative;
                            .background-image-input {
                                opacity: 0;
                                @include full;
                            }
                            &:hover {
                                @include TC4;
                            }
                        }
                        .remove-background-image {
                            display: none;
                            @include TC1;
                            &:hover {
                                @include TC5;
                            }
                        }
                    }
                    &.active {
                        .background-image-menu-list {
                            @include BD1;
                            opacity: 1;
                            top: 30px;
                            .remove-background-image {
                                display: block;
                            }
                        }
                    }
                }
                .image-btn {
                    position: relative;
                    .image-input {
                        opacity: 0;
                        @include full;
                    }
                } 
            }
            .prop-text {
                text-align: center;
                margin: 0 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid $C3;
            }
            .el-tree {
                margin: 0 10px;
                border: none;
                .el-tree-node__label {
                    user-select: none;
                }
            }
        }
        .canvas-container {
            margin-left: 191px;
            margin-right: 230px;
            padding: 30px;
            height: 100%;
            overflow: scroll;
            box-sizing: border-box;
            background-image: url(~assets/images/ruler.png);
            background-repeat: no-repeat;
            overflow: scroll;
            .canvas {
                background-color: #fff;
                box-shadow: 0 0 6px #d6d6d6;
                position: relative;
                overflow: hidden;
                .component {
                    position: absolute;
                    cursor: default;
                    user-select: none;
                }
            }
        }
        .right-panel {
            width: 230px;
            @include right;
            overflow: scroll;
            box-shadow: 0 0 6px #d6d6d6;
            background-color: #fff;
        }
    }
}
</style>