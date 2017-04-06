<template>
<div ref="swiper" class="swiper-container">
    <div class="swiper-wrapper" :style="swiperWrapperStyle">
        <slot></slot>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets">
        <span v-for="index in pageNumber" class="swiper-pagination-bullet swiper-pagination-bullet-custom" :class="{'swiper-pagination-bullet-active': currentPage == index}" @click="currentPage = index">{{index}}</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'Swiper',
    props: ['carouselWidth', 'carouselHeight', 'pageNumber'],
    data(){
        return {
            currentPage: 1
        }
    },
    computed:{
        swiperWrapperStyle(){
            return {
                width: this.carouselWidth * this.pageNumber + 'px',
                transform: 'translateX(' + (this.currentPage - 1) * -this.carouselWidth + 'px)',
                transitionProperty: 'transform',
                transitionDuration: '300ms',
            }
        }
    },
    mounted(){
        
    }
}
</script>

<style lang="scss" scoped>
.swiper-container {
    overflow: hidden;
    position: relative;
    .swiper-wrapper {
        overflow: hidden;
        .swiper-slide {
            float: left;
        }
    }
    .swiper-pagination-bullets {
        position: absolute;
        bottom: 10px;
        width: 100%;
        left: 0;
        text-align: center;
        transition: 300ms;
        transform: translate3d(0, 0, 0);
        .swiper-pagination-bullet-custom {
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            color: #000;
            opacity: 1;
            background: rgba(0,0,0,0.2);
            margin: 0 5px;
            cursor: pointer;
            border-radius: 100%;
            display: inline-block;
        }
        .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
            color:#fff;
            background: #007aff;
        }
    }
}
</style>