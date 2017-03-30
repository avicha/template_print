<template>
    <div class="template-editor">
        <div class="menu-bar" ref="menuBar">
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
                    <el-tooltip effect="dark" content="撤销">
                        <i class="icon undo-icon"></i>
                    </el-tooltip>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isRedoAvailable}" @click="redoBtnHandler">
                    <el-tooltip effect="dark" content="重做">
                        <i class="icon redo-icon"></i>
                    </el-tooltip>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isAlignLeftAvailable}" @click="alignLeftBtnHandler">
                    <el-tooltip effect="dark" content="左对齐">
                        <i class="icon align-left-icon"></i>
                    </el-tooltip>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignCenterAvailable}" @click="alignCenterBtnHandler">
                    <el-tooltip effect="dark" content="水平对齐">
                        <i class="icon align-center-icon"></i>
                    </el-tooltip>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignRightAvailable}" @click="alignRightBtnHandler">
                    <el-tooltip effect="dark" content="右对齐">
                        <i class="icon align-right-icon"></i>
                    </el-tooltip>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignTopAvailable}" @click="alignTopBtnHandler">
                    <el-tooltip effect="dark" content="顶部对齐">
                        <i class="icon align-top-icon"></i>
                    </el-tooltip>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignMiddleAvailable}" @click="alignMiddleBtnHandler">
                    <el-tooltip effect="dark" content="垂直居中">
                        <i class="icon align-middle-icon"></i>
                    </el-tooltip>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignBottomAvailable}" @click="alignBottomBtnHandler">
                    <el-tooltip effect="dark" content="底部对齐">
                        <i class="icon align-bottom-icon"></i>
                    </el-tooltip>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignVCenterAvailable}" @click="alignVCenterBtnHandler">
                    <el-tooltip effect="dark" content="垂直居中分布">
                        <i class="icon align-v-center-icon"></i>
                    </el-tooltip>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isAlignHCenterAvailable}" @click="alignHCenterBtnHandler">
                    <el-tooltip effect="dark" content="水平居中分布">
                        <i class="icon align-h-center-icon"></i>
                    </el-tooltip>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isCombineAvailable}" @click="combineBtnHandler">
                    <el-tooltip effect="dark" content="组合">
                        <i class="icon combine-icon"></i>
                    </el-tooltip>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isSplitAvailable}" @click="splitBtnHandler">
                    <el-tooltip effect="dark" content="拆分">
                        <i class="icon split-icon"></i>
                    </el-tooltip>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isRotateLeftAvailable}" @click="rotateLeftBtnHandler">
                    <el-tooltip effect="dark" content="向左旋转">
                        <i class="icon rotate-left-icon"></i>
                    </el-tooltip>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isRotateRightAvailable}" @click="rotateRightBtnHandler">
                    <el-tooltip effect="dark" content="向右旋转">
                        <i class="icon rotate-right-icon"></i>
                    </el-tooltip>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isRotateCanvasLeftAvailable}" @click="rotateCanvasLeftBtnHandler">
                    <el-tooltip effect="dark" content="旋转画布">
                        <i class="icon rotate-canvas-left-icon"></i>
                    </el-tooltip>
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item percentage" :class="{disabled: !menuItems.isPercentageAvailable}">
                    <i class="icon minus-icon" title="缩小" @click="minusPercentageBtnHandler"></i><input type="text" class="percentage-input" v-model="canvas.percentage" @input="percentageInputHandler" @blur="percentageBlurHandler" /><i class="icon plus-icon" title="放大" @click="plusPercentageBtnHandler"></i><span class="percentage-text">%</span>
                </div>
                <div class="menu-item width" :class="{disabled: !menuItems.isWidthAvailable}">
                    <span>宽</span><input type="text" class="width-input" @input="widthInputHandler" @blur="validateComponentRange" v-model="canvas.width">
                </div>
                <div class="menu-item height" :class="{disabled: !menuItems.isHeightAvailable}">
                    <span>高</span><input type="text" class="height-input" @input="heightInputHandler" @blur="validateComponentRange" v-model="canvas.height">
                </div>
            </div>
            <div class="menu-item-group">
                <div class="menu-item" :class="{disabled: !menuItems.isPreviewAvailable}" @click="previewBtnHandler">
                    <el-tooltip effect="dark" content="预览"><i class="icon preview-icon"></i></el-tooltip><span class="menu-item-text">预览/打印</span>
                </div>
                <div class="menu-item" :class="{disabled: !menuItems.isLoadDataAvailable}" @click="loadDataBtnHandler">
                    <button class="load-data-btn">数据载入</button>
                </div>
            </div>
        </div>
        <div class="main-panel" :style="{top: this.menuBarHeight + 'px'}">
            <div class="right-panel">
                <TextSettingComponent ref="textSettingComponent" v-show="setting.isTextComponent" @changeComponentSetting="changeComponentSetting"></TextSettingComponent>
                <ImageSettingComponent ref="imageSettingComponent" v-show="setting.isImageComponent" @changeComponentSetting="changeComponentSetting"></ImageSettingComponent>
                <ContainerSettingComponent ref="containerSettingComponent" v-show="setting.isContainerComponent" @changeComponentSetting="changeComponentSetting"></ContainerSettingComponent>
                <PropertySettingComponent ref="propertySettingComponent" v-show="setting.isPropertyComponent" @changeComponentSetting="changeComponentSetting"></PropertySettingComponent>
                <ItemListSettingComponent ref="itemListSettingComponent" v-show="setting.isItemListComponent" @changeComponentSetting="changeComponentSetting"></ItemListSettingComponent>
            </div>
            <div class="left-panel">
                <h4 class="title">基本元件</h4>
                <div class="menu-component-list">
                    <div class="menu-component-block">
                        <div class="menu-component" @dblclick="()=>{this.addText(this.canvas.width/2, this.canvas.height/2)}" draggable="true" @dragstart="componentDragStartHandler($event, 'addText')">文本</div>    
                    </div>
                    <div class="menu-component-block">
                        <div class="menu-component" @dblclick="()=>{this.addImage(this.canvas.width/2, this.canvas.height/2)}" draggable="true" @dragstart="componentDragStartHandler($event, 'addImage')">图片</div>
                    </div>
                    <div class="menu-component-block">
                        <div class="menu-component background-image-btn" :class="{active: isBackgroundImageActive}" @click="toggleBackgroundImageActive">背景图片
                            <ul class="background-image-menu-list">
                                <li class="change-background-image">替换<input ref="backgroundImageInput" class="background-image-input" type="file" accept="image/jpeg,image/jpg,image/png,image/gif;" @change="changeBackgroundImage"/></li>
                                <li class="remove-background-image" @click="removeBackgroundImage">删除</li>
                            </ul>
                        </div>
                    </div>
                    <div class="menu-component-block">
                        <div v-if="this.template.type == '1'" class="menu-component" @dblclick="()=>{this.addItemList(this.canvas.width/2, this.canvas.height/2)}" draggable="true" @dragstart="componentDragStartHandler($event, 'addItemList')">动态数据域</div>
                    </div>
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
            <div class="canvas-panel">
                <div class="canvas-container" :style="canvasContainerStyle">
                    <div class="zero">0</div>
                    <div class="top-ruler" :style="{backgroundSize: 0.2 * this.canvas.percentage + 'cm 100%'}"></div>
                    <div class="left-ruler" :style="{backgroundSize: '100% ' + 0.2 * this.canvas.percentage + 'cm'}"></div>
                    <div class="canvas" ref="canvas" :style="canvasStyle" @mousedown.stop.prevent="canvasMousedownHandler" @mousemove.stop.prevent="canvasMousemoveHandler" @mouseup.stop.prevent="canvasMouseupHandler" @dragover.prevent="canvasDragoverHandler" @drop.prevent="canvasDropHandler">
                        <component v-for="component in canvas.components" :is="component.type" :isPreview="false" :parent="null" class="component" :class="{active: component.active}" :data="component.data" :templateData="templateData" @changeComponentData="changeComponentData(component, $event)" :changeComponentData="changeComponentData">
                        </component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {Tree, Tooltip} from 'element-ui'
Vue.use(Tree)
Vue.use(Tooltip)

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

import {readImageAsDataURL, getPPI, getOuterHeight, isInteractWithComponent} from '../services/utils'
import extend from 'lodash/extend'
import find from 'lodash/find'

export default {
    data(){
        return {
            ppi: getPPI(),
            menuBarHeight: 51,
            ready: false,
            _isDraging: false,
            _isResizing: false,
            _resizingComponent: null,
            _dragingComponent: null,
            _startX: null,
            _startY: null,
            _endX: null,
            _endY: null,
            stack: [],
            stackIndex: -1,
            isBackgroundImageActive: false,
            _copyComponents: [],
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
        canvasContainerStyle(){
            return {
                width: this.canvas.width*this.canvas.percentage/100/25.4*this.ppi + 60 + 'px',
                height: this.canvas.height*this.canvas.percentage/100/25.4*this.ppi + 60 + 'px',
            }
        },
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
            let items = []
            this.canvas.components.forEach(component => {
                if(component.active){
                    items.push(component)
                }
                if(component.type == 'ContainerComponent'){
                    component.data.children.forEach(child => {
                        if(child.active){
                            items.push(child)
                        }
                    })
                }
            })
            return items
        },
        allComponents() {
            let items = []
            this.canvas.components.forEach(component => {
                if(component.type == 'ContainerComponent'){
                    component.data.children.forEach(child => {
                        items.push(child)
                    })
                } else {
                    items.push(component)
                }
            })
            return items
        },
        setting() {
            return {
                isTextComponent: this.activeComponents.length == 1 && this.activeComponents[0].type == 'TextComponent',
                isImageComponent: this.activeComponents.length == 1 && this.activeComponents[0].type == 'ImageComponent',
                isContainerComponent: this.activeComponents.length == 1 && this.activeComponents[0].type == 'ContainerComponent',
                isPropertyComponent: this.activeComponents.length == 1 && this.activeComponents[0].type == 'PropertyComponent',
                isItemListComponent: this.activeComponents.length == 1 && this.activeComponents[0].type == 'ItemListComponent',
            }
        },
    },
    props: ['propList', 'template', 'templateData'],
    watch:{
        //改变菜单的显示
        activeComponents(){
            this.showMenu()
        },
        //根据操作记录显示撤回和重做菜单
        stackIndex(i){
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
        window.addEventListener('resize', this.setMenuBarHeight)
        this.setMenuBarHeight()
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
            if(this.activeComponents.length){
                this.$emit('openDeleteConfirmDialog')
            }
        })
        this.$on('delete_confirm', () => {
            this.activeComponents.forEach(component => {
                this.removeComponent(component)
            })
            this.record()
        })
        //复制选中的组件和容器
        this.$on('copy_keyup', () => {
            let components = []
            this.activeComponents.forEach(component => {
                let component_str = JSON.stringify(component)
                components.push(component_str)
            })
            this._copyComponents = components
        })
        //粘贴之前复制的组件和容器
        this.$on('paste_keyup', () => {
            if(this._copyComponents.length){
                let components = []
                this._copyComponents = this._copyComponents.map(component_str => {
                    let component = JSON.parse(component_str)
                    component.data.id = Math.round(Date.now() + Math.random() * 100)
                    if(component.type == 'ContainerComponent'){
                        //改变容器下的组件children
                        component.data.children = component.data.children.map(child => {
                            //容器下的组件也进行复制，并改变组件的id
                            child.data.id = Math.round(Date.now() + Math.random() * 100)
                            return child
                        })
                    }
                    //把组件移到右下方5mm
                    this.moveComponent(component, {left: 5, top: 5})
                    components.push(component)
                    return JSON.stringify(component)
                })
                //把复制的组件和容器添加到canvas
                this.canvas.components = this.canvas.components.concat(components)
                this.record()
            }
        })
        this.$on('undo_keyup', () => {
            this.undoBtnHandler()
        })
        this.$on('redo_keyup', () => {
            this.redoBtnHandler()
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
            if(this.setting.isTextComponent || this.setting.isImageComponent || this.setting.isPropertyComponent || this.setting.isItemListComponent){
                this.showItemSetting(this.activeComponents[0])
            }
            this.record()
        })
        this.$on('mouseup', e => {
            if(this._isDraging){
                this._isDraging = false
                this._dragingComponent = null
            }
        })
    },
    destroyed(){
        window.removeEventListener('resize', this.setMenuBarHeight)
    },
    methods:{
        setMenuBarHeight(){
            this.menuBarHeight = getOuterHeight(this.$refs.menuBar)
        },
        //重置数据
        reset(){
            this.ready = false
            this.stack = []
            this.stackIndex = -1
            this._copyComponents = []
            this.menuItems.isSaveAvailable = false
        },
         //记录canvas数据，因为canvas是深度克隆出来的，所以容器的children需要改变指针
        record(){
            this.updateItemListId()
            let canvas = JSON.stringify(this.canvas)
            this.stack[++this.stackIndex] = canvas
            if(this.stack[this.stackIndex + 1]){
                this.stack.splice(this.stackIndex + 1, this.stack.length)
            }
            if(this.ready){
                this.menuItems.isSaveAvailable = true  
            }
        },
        restoreCanvas(canvas_str){
            let canvas = JSON.parse(canvas_str)
            return canvas
        },
        //拖动组件时，带上拖动时的偏移位置
        componentDragStartHandler(e, action, data){
            e.dataTransfer.setData('data', JSON.stringify({action: action, offsetX: Math.round(e.offsetX/this.ppi*2.54*10), offsetY: Math.round(e.offsetY/this.ppi*2.54*10), data: data}))
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.setDragImage(e.target, e.offsetX, e.offsetY)
        },
        //经过画布上时显示移动效果
        canvasDragoverHandler(e){
            e.dataTransfer.dropEffect = 'move'
        },
        //画布上落下时，根据要添加的元素和位置添加组件
        canvasDropHandler(e){
            let data = e.dataTransfer.getData('data') 
            if(data){
                data = JSON.parse(data)
                let {offsetX, offsetY} = this._getPointerOffset(e)
                let left = offsetX - data.offsetX
                let top = offsetY - data.offsetY
                switch(data.action){
                    case 'addText':
                        this.addText(left, top)
                        break
                    case 'addImage':
                        this.addImage(left, top)
                        break
                    case 'addItemList':
                        this.addItemList(left, top)
                        break
                    case 'addProp':
                        this.handlePropClick(data.data, left, top)
                }
            }
        },
        //记录鼠标按下时的位置和选中的组件
        canvasMousedownHandler(e){
            if(e.which == 1){
                let {offsetX, offsetY} = this._getPointerOffset(e)
                this._startX = offsetX
                this._startY = offsetY
                if(e.target.className == 'resize'){
                    this._resizingComponent = this._getComponentByPos({offsetX: offsetX - e.offsetX, offsetY: offsetY - e.offsetY}, true)
                } else {
                    this._dragingComponent = this._getComponentByPos({offsetX, offsetY}, true)
                }
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
            if(this._resizingComponent && e.which ==1){
                this._isResizing = true
                let {offsetX, offsetY} = this._getPointerOffset(e)
                this._endX = offsetX
                this._endY = offsetY
                this._resizingComponent.data.width += this._endX - this._startX
                this._resizingComponent.data.height += this._endY - this._startY
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
                    if(this._isResizing){
                        this._endX = offsetX
                        this._endY = offsetY
                        this._resizingComponent.data.width += this._endX - this._startX
                        this._resizingComponent.data.height += this._endY - this._startY
                        this.showItemSetting(this._resizingComponent)
                        this.record()
                    } else {
                        let clickingComponent = this._getComponentByPos({offsetX, offsetY}, false)
                        if(clickingComponent){
                            this.activeComponent(clickingComponent, !(e.ctrlKey || e.metaKey))
                        } else {
                            this.resetComponentsActiveState()
                        }
                    }
                }
                this._isDraging = false
                this._isResizing = false
                this._dragingComponent = null
                this._resizingComponent = null
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
            components.forEach(component => {
                if(offsetX > component.data.left && offsetX < component.data.left + component.data.width && offsetY > component.data.top && offsetY < component.data.top + component.data.height){
                    items.push(component)
                    if(component.type == 'ContainerComponent' && !isActive && component.active){
                        component.data.children.forEach(child => {
                            if(offsetX > child.data.left && offsetX < child.data.left + child.data.width && offsetY > child.data.top && offsetY < child.data.top + child.data.height){
                                items.push(child)
                            }
                        })   
                    }
                }
            })
            items = items.sort((a, b) => b.data.zIndex - a.data.zIndex)
            return items[0]
        },
        //根据不同的组合情况，显示适当的菜单项
        showMenu(){
            let l = this.activeComponents.length
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
            if(l >= 3){
                extend(this.menuItems, g0, g1, g2, g3)
            } else {
                if(l == 2){
                    extend(this.menuItems, g0, g1, g3)
                } else {
                    if(l == 1){
                        if(this.setting.isPropertyComponent || this.setting.isItemListComponent){
                            extend(this.menuItems, g0, g5, g6)
                        } else {
                            if(this.setting.isContainerComponent){
                                extend(this.menuItems, g0, g4, g5)
                            } else {
                                extend(this.menuItems, g0, g5)    
                            } 
                        }
                        Vue.nextTick(() => {
                            this.showItemSetting(this.activeComponents[0])
                        })
                    } else {
                        extend(this.menuItems, g0)
                    }
                }
            }
        },
        //返回
        backBtnHandler(){
            if(this.menuItems.isBackAvailable){
                if(this.menuItems.isSaveAvailable){
                    this.$emit('openBackConfirmDialog')
                } else {
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
                            this.menuItems.isSaveAvailable = false
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
                let left = Math.min.apply(this, this.activeComponents.map(component => component.data.left))
                this.activeComponents.forEach(component => {
                    this.moveComponentTo(component, {left: left})
                })
                this.record()
            }
        },
        //水平居中，记录
        alignCenterBtnHandler(){
            if(this.menuItems.isAlignCenterAvailable){
                let top = Number.MAX_VALUE, topest = null
                this.activeComponents.forEach(component => {
                    let t = component.data.top
                    if(t < top){
                        top = t
                        topest = component
                    }
                })
                let center = topest.data.left + 0.5 * topest.data.width
                this.activeComponents.forEach(component => {
                    this.moveComponentTo(component, {left: center - 0.5 * component.data.width})
                })
                this.record()
            }
        },
        //右对齐，记录
        alignRightBtnHandler(){
            if(this.menuItems.isAlignRightAvailable){
                let right = Math.max.apply(this, this.activeComponents.map(component => component.data.left + component.data.width))
                this.activeComponents.forEach(component => {
                    this.moveComponentTo(component, {left: right - component.data.width})
                })
                this.record()
            }
        },
        //顶部对齐，记录
        alignTopBtnHandler(){
            if(this.menuItems.isAlignTopAvailable){
                let top = Math.min.apply(this, this.activeComponents.map(component => component.data.top))
                this.activeComponents.forEach(component => {
                    this.moveComponentTo(component, {top: top})
                })
                this.record()
            }
        },
        //垂直居中，记录
        alignMiddleBtnHandler(){
            if(this.menuItems.isAlignCenterAvailable){
                let left = Number.MAX_VALUE, leftest = null
                this.activeComponents.forEach(component => {
                    let l = component.data.left
                    if(l < left){
                        left = l
                        leftest = component
                    }
                })
                let middle = leftest.data.top + 0.5 * leftest.data.height
                this.activeComponents.forEach(component => {
                    this.moveComponentTo(component, {top: middle - 0.5 * component.data.height})
                })
                this.record()
            }
        },
        //底部对齐，记录
        alignBottomBtnHandler(){
            if(this.menuItems.isAlignBottomAvailable){
                let bottom = Math.max.apply(this, this.activeComponents.map(component => component.data.top + component.data.height))
                this.activeComponents.forEach(component => {
                    this.moveComponentTo(component, {top: bottom - component.data.height})
                })
                this.record()
            }
        },
        //垂直居中分布，记录
        alignVCenterBtnHandler(){
            if(this.menuItems.isAlignVCenterAvailable){
                let componentDataTemp = this.activeComponents.sort((item1, item2) => {
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
                let componentDataTemp = this.activeComponents.sort((item1, item2) => {
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
                    if(component.type == 'ContainerComponent'){
                        component.data.children.forEach(child => {
                            tops.push(child.data.top)
                            lefts.push(child.data.left)
                            rights.push(child.data.left + child.data.width)
                            bottoms.push(child.data.top + child.data.height)
                        })
                        children = children.concat(component.data.children)
                    } else {
                        tops.push(component.data.top)
                        lefts.push(component.data.left)
                        rights.push(component.data.left + component.data.width)
                        bottoms.push(component.data.top + component.data.height)
                        children.push(component)
                    }
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
                        rotateDeg: 0,
                        zIndex: 0
                    }
                }
                this.canvas.components = this.canvas.components.filter(component => !component.active)
                this.canvas.components.push(container)
                this.activeComponent(container, true)
                this.record()
            }
        },
        //拆分组件，记录
        splitBtnHandler(){
            if(this.menuItems.isSplitAvailable){
                let activeContainer = this.activeComponents[0]
                let index = this.canvas.components.indexOf(activeContainer)
                this.canvas.components.splice(index, 1)
                activeContainer.data.children.forEach(child => {
                    this.canvas.components.push(child)
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
        //减少比例
        minusPercentageBtnHandler(){
            if(this.menuItems.isPercentageAvailable){
                if(this.canvas.percentage >= 20){
                    this.canvas.percentage -= 10  
                    this.record()    
                } else {
                    this.canvas.percentage = 10  
                    this.record()
                }
            }
        },
        percentageInputHandler(e){
            let value = e.target.value
            if(value && !/^\d+$/.test(value)){
                this.canvas.percentage = /\d+/.test(value)? value.match(/\d+/)[0] : ''
            } else {
                if(value){
                    value = Number(value)
                    if(value > 300){
                        this.canvas.percentage = 300
                    }
                }
            }
        },
        percentageBlurHandler(e){
            let value = e.target.value
            if(value){
                value = Number(value)
                if(value > 300){
                    this.canvas.percentage = 300
                } else {
                    if(value < 10){
                        this.canvas.percentage = 10
                    } else {
                        this.canvas.percentage = value
                    }
                }   
            } else {
                this.canvas.percentage = 100
            }
            this.record()
        },
        //增加比例，记录
        plusPercentageBtnHandler(){
            if(this.menuItems.isPercentageAvailable){
                if(this.canvas.percentage <= 290){
                    this.canvas.percentage += 10
                    this.record()    
                } else {
                    this.canvas.percentage = 300 
                    this.record()
                }
            }
        },
        widthInputHandler(e){
            let value = e.target.value
            if(value && !/^\d+$/.test(value)){
                this.canvas.width = /\d+/.test(value)? value.match(/\d+/)[0] : ''
            } else {
                if(value){
                    if(Number(value) > 9999){
                        this.canvas.width = 9999
                    } else {
                        this.canvas.width = Number(value)
                    }
                    this.record()
                }
            }
        },
        heightInputHandler(e){
            let value = e.target.value
            if(value && !/^\d+$/.test(value)){
                this.canvas.height = /\d+/.test(value)? value.match(/\d+/)[0] : ''
            } else {
                if(value){
                    if(Number(value) > 9999){
                        this.canvas.height = 9999
                    } else {
                        this.canvas.height = Number(value)
                    }
                    this.record()
                }
            }
        },
        validateComponentRange(){
            let w = this.canvas.width
            let h = this.canvas.height
            let isOutside = false
            this.allComponents.forEach(component => {
                let right = component.data.left + component.data.width
                let bottom = component.data.top + component.data.height
                if(w < right || h < bottom) {
                    isOutside = true
                }
            })
            if(isOutside){
                this.$emit('openComponentRangeOutsideAlertDialog')
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
                    zIndex: 2,
                }
            }
            this.canvas.components.push(component)
            this.activeComponent(component, true)
            this.record()
        },
        //添加图片，默认添加到画布中央右下角，并选中，记录
        addImage(left = 0, top = 0){
            let component = {
                type: 'ImageComponent',
                active: false,
                data: {
                    id: Date.now(),
                    src: '',
                    rotateDeg: 0,
                    width: Math.round(85/this.ppi*2.54*10),
                    height: Math.round(68/this.ppi*2.54*10),
                    top: top,
                    left: left,
                    zIndex: 1,
                }
            }
            this.canvas.components.push(component)
            this.activeComponent(component, true)
            this.record()
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
                    alignNumber: left,
                    verticalAlign: 'middle',
                    itemListId: null,
                    zIndex: 2,
                }
            }
            this.canvas.components.push(component)
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
                    zIndex: -1,
                }
            }
            this.canvas.components.push(component)
            this.activeComponent(component, true)
            this.record()
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
        //把组件移动到某个坐标
        moveComponentTo(component, pos){
            if(component.type == 'ContainerComponent'){
                let offsetTop = pos.top == null ? 0 : pos.top - component.data.top
                let offsetLeft = pos.left == null ? 0: pos.left - component.data.left
                component.data.children.forEach(child => {
                    this.moveComponent(child, {top: offsetTop, left: offsetLeft})
                })
            }
            extend(component.data, pos)
        },
        //把组件偏移某个坐标
        moveComponent(component, pos){
            if(component.type == 'ContainerComponent'){
                component.data.children.forEach(child => {
                    this.moveComponent(child, pos)
                })
            } 
            component.data.left += (pos.left || 0)
            component.data.top += (pos.top || 0)
        },
        changeComponentSetting(data){
            this.changeComponentData(this.activeComponents[0], {data, shouldUpdate: false})
            this.record()
        },
        //改变组件的数据
        changeComponentData(component, {data, shouldUpdate}){
            extend(component.data, data)
            if(shouldUpdate){
                this.showItemSetting(component)
            }
        },
        //重置组件为未选中状态
        resetComponentsActiveState(){
            this.activeComponents.forEach(component => {
                component.active = false
            })
        },
        //选中组件，是否reset代表是否把其他组件设置为未选中状态
        activeComponent(component, isReset){
            if(isReset){
                this.resetComponentsActiveState()
                component.active = true
            } else {
                component.active = true
            }
        },
        removeComponent(component){
            let index = this.canvas.components.indexOf(component)
            this.canvas.components.splice(index, 1)
        },
        //拖动数据项时，更新数据项的所属数据域，默认放在数据域的顶部
        updateItemListId(){
            let itemListComponents = this.allComponents.filter(component => {
                return component.type == 'ItemListComponent'
            })
            itemListComponents.forEach(itemListComponent => {
                let children = []
                this.canvas.components.forEach(component => {
                    if(component.type == 'PropertyComponent'){
                        component.data.itemListId = null
                        if(isInteractWithComponent(itemListComponent, component)) {
                            children.push(component)
                            component.data.itemListId = itemListComponent.data.id
                            if(component.data.top != itemListComponent.data.top){
                                this.moveComponentTo(component, {top: itemListComponent.data.top})
                            }
                        }
                    } else {
                        if(component.type == 'ContainerComponent'){
                            component.data.children.forEach(child => {
                                if(child.type == 'PropertyComponent'){
                                    child.data.itemListId = null
                                    if(isInteractWithComponent(itemListComponent, child)) {
                                        children.push(child)
                                        child.data.itemListId = itemListComponent.data.id
                                        let middle = itemListComponent.data.top + 0.5 * itemListComponent.data.height
                                        if(child.data.top != middle - 0.5 * child.data.height){
                                            this.moveComponentTo(child, {top: middle - 0.5 * child.data.height})
                                        }
                                    }
                                }
                            })
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
                position: relative;
                .plus-icon {
                    border-left: 1px solid #d6d6d6;
                }
                .percentage-input {
                    text-align: center;
                    width: 40px;
                    height: 24px;
                    padding-right: 6px;
                    line-height: 24px;
                    @include F(12);
                    @include TC1;
                }
                .minus-icon {
                    border-right: 1px solid #d6d6d6;
                }
                .percentage-text {
                    position: absolute;
                    height: 24px;
                    line-height: 24px;
                    @include F(12);
                    @include TC1;
                    right: 28px;
                }
            }
            .width, .height {
                margin-right: 0;
                span {
                    margin: 0 10px 0 20px;
                    vertical-align: middle;
                }
                input {
                    display: inline-block;
                    @include F(12);
                    @include TC1;
                    @include BD1;
                    width: 40px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 4px;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    border-right: 0;
                    text-align: center;
                    vertical-align: middle;
                }
                &:after {
                    @include F(12);
                    @include TC1;
                    @include BD1;
                    display: inline-block;
                    content: 'mm';
                    border-left: 0;
                    border-radius: 4px;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    line-height: 24px;
                    padding-right: .5rem;
                    vertical-align: middle;
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
        @include bottom;
        background-color: #f1f4f8;
        .left-panel {
            width: 190px;
            @include left;
            overflow-y: scroll;
            background-color: #fff;
            border-right: 1px solid #d6d6d6;
            .title {
                padding-top: 20px;
                padding-bottom: 8px;
                margin: 0 10px;
                text-align: center;
                font-weight: normal;
                @include F(14);
                @include TC7;
                border-bottom: 1px solid #d6d6d6;
            }
            .menu-component-list {
                font-size: 0;
                padding: 0 10px;
                margin-bottom: 20px;
                &:after {
                    content: '';
                    display: block;
                    clear: both;
                }
                .menu-component-block {
                    float: left;
                    width: 50%;
                    .menu-component {
                        display: block;
                        box-sizing: border-box;
                        margin-top: 20px;
                        width: 70px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        @include F(12);
                        @include BD1;
                        border-radius: 4px;
                        background: #fff;
                        color: #333;
                        cursor: pointer;
                    }
                    &:nth-child(odd){
                        .menu-component {
                            float: right;
                            margin-right: 5px;    
                        }
                    }
                    &:nth-child(even){
                        .menu-component {
                            float: left;
                            margin-left: 5px;
                        }
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
            }
            .prop-text {
                text-align: center;
                @include F(14);
                @include TC7;
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
        .canvas-panel {
            margin-left: 191px;
            margin-right: 230px;
            height: 100%;
            box-sizing: border-box;
            overflow: scroll;
            .canvas-container {
                position: relative;
                padding: 30px;
                min-width: 100%;
                min-height: 100%;
                box-sizing: border-box;
                .zero {
                    @include top-left;
                    @include F(14);
                    @include TC1;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                }
                .left-ruler {
                    position: absolute;
                    top: 30px;
                    left: 0;
                    bottom: 0;
                    width: 30px;
                    background-image: url(~assets/images/ruler-left.png);
                    background-repeat: no-repeat;
                }
                .top-ruler {
                    position: absolute;
                    top: 0;
                    left: 30px;
                    right: 0;
                    height: 30px;
                    background-image: url(~assets/images/ruler-top.png);
                    background-repeat: no-repeat;
                }
                .canvas {
                    background-color: #fff;
                    box-shadow: 0 0 6px #d6d6d6;
                    position: relative;
                    .component {
                        position: absolute;
                        cursor: default;
                        user-select: none;
                    }
                }
            }
        }
        .right-panel {
            width: 230px;
            @include right;
            overflow-x: hidden; 
            overflow-y: scroll;
            box-shadow: 0 0 6px #d6d6d6;
            background-color: #fff;
        }
    }
}
</style>