<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
	
</template>

<script>
	import BScorll from 'better-scroll'
	export default{
		name:'scroll',
		props:{
			probetype:{
				type:Number,
				default:0
			},
				
			pullupload:{
				type:Boolean,
				default:false
			},
			click:{
				type:Boolean,
				default:true
			},
			data:{
				type:Array,
				default:null
			},
			pullup:{
				type:Boolean,
				default:false
			},
			beforeScroll:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				bscroll:null
			}
		},
		created(){
			this.$bus.$on("recImageLode",()=>{
				this.bscroll.refresh()
			})
		},
		mounted(){
			this.bscroll= new BScorll(this.$refs.wrapper,{
				probeType:this.probetype,
				click:true,  
				pullUpLoad:this.pullupload
			})
			this.bscroll.on('scroll',(p)=>{
				this.$emit('scroll',p)
			})
			this.bscroll.on('pullingUp',()=>{
				this.$emit('pullingUp')
			})
			if(this.pullup){
				this.bscroll.on('scrollEnd',()=>{
					if(this.bscroll.y<=(this.bscroll.maxScrollY + 50)){
						this.$emit('scrollToEnd')
					}
				})
			}
			if(this.beforeScroll){
				this.bscroll.on('beforeScrollStart',()=>{
					this.$emit("beforeScroll")
				})
			}
		},
		methods:{
			enable(){
				this.bscroll&&this.bscroll.enable()
			},
			disable(){
				this.bscroll&&this.bscroll.disable()
			},
			refresh(){
				this.bscroll&&this.bscroll.refresh()
			},
			scrollTo(){
				this.bscroll&&this.bscroll.scrollTo.apply(this.bscroll, arguments);
			},
			scrollToElement(){
				this.bscroll&&this.bscroll.scrollToElement.apply(this.bscroll, arguments);
			}
		},
		watch:{
			data(){
				setTimeout(()=>{
					this.refresh()
				},20)
			}
		}
		
	}
</script>

<style scoped="scoped">
</style>
